<?php
/**
 * MassController.php
 * Copyright (c) 2019 james@firefly-iii.org
 *
 * This file is part of Firefly III (https://github.com/firefly-iii).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
declare(strict_types=1);

namespace FireflyIII\Http\Controllers\Transaction;

use Carbon\Carbon;
use FireflyIII\Events\UpdatedTransactionGroup;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Http\Requests\MassDeleteJournalRequest;
use FireflyIII\Http\Requests\MassEditJournalRequest;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Models\TransactionType;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Budget\BudgetRepositoryInterface;
use FireflyIII\Repositories\Journal\JournalRepositoryInterface;
use FireflyIII\Services\Internal\Update\JournalUpdateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\View\View as IlluminateView;
use InvalidArgumentException;
use Log;

/**
 * Class MassController.
 *
 */
class MassController extends Controller
{
    private JournalRepositoryInterface $repository;

    /**
     * MassController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.transactions'));
                app('view')->share('mainTitleIcon', 'fa-exchange');
                $this->repository = app(JournalRepositoryInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Mass delete transactions.
     *
     * @param array $journals
     *
     * @return IlluminateView
     */
    public function delete(array $journals): IlluminateView
    {
        $subTitle = (string)trans('firefly.mass_delete_journals');

        // put previous url in session
        $this->rememberPreviousUri('transactions.mass-delete.uri');

        return prefixView('transactions.mass.delete', compact('journals', 'subTitle'));
    }

    /**
     * Do the mass delete.
     *
     * @param MassDeleteJournalRequest $request
     *
     * @return mixed
     *
     */
    public function destroy(MassDeleteJournalRequest $request)
    {
        $ids   = $request->get('confirm_mass_delete');
        $count = 0;
        if (is_array($ids)) {
            /** @var string $journalId */
            foreach ($ids as $journalId) {

                /** @var TransactionJournal $journal */
                $journal = $this->repository->findNull((int)$journalId);
                if (null !== $journal && (int)$journalId === $journal->id) {
                    $this->repository->destroyJournal($journal);
                    ++$count;
                }
            }
        }
        app('preferences')->mark();
        session()->flash('success', (string)trans_choice('firefly.mass_deleted_transactions_success', $count));

        // redirect to previous URL:
        return redirect($this->getPreviousUri('transactions.mass-delete.uri'));
    }

    /**
     * Mass edit of journals.
     *
     * @param array $journals
     *
     * @return IlluminateView
     */
    public function edit(array $journals): IlluminateView
    {
        $subTitle = (string)trans('firefly.mass_edit_journals');

        /** @var AccountRepositoryInterface $accountRepository */
        $accountRepository = app(AccountRepositoryInterface::class);

        // valid withdrawal sources:
        $array             = array_keys(config(sprintf('firefly.source_dests.%s', TransactionType::WITHDRAWAL)));
        $withdrawalSources = $accountRepository->getAccountsByType($array);

        // valid deposit destinations:
        $array               = config(sprintf('firefly.source_dests.%s.%s', TransactionType::DEPOSIT, AccountType::REVENUE));
        $depositDestinations = $accountRepository->getAccountsByType($array);

        /** @var BudgetRepositoryInterface $budgetRepository */
        $budgetRepository = app(BudgetRepositoryInterface::class);
        $budgets          = $budgetRepository->getBudgets();

        // reverse amounts
        foreach ($journals as $index => $journal) {
            $journals[$index]['amount']         = app('steam')->positive($journal['amount']);
            $journals[$index]['foreign_amount'] = null === $journal['foreign_amount'] ?
                null : app('steam')->positive($journal['foreign_amount']);
        }

        $this->rememberPreviousUri('transactions.mass-edit.uri');

        return prefixView('transactions.mass.edit', compact('journals', 'subTitle', 'withdrawalSources', 'depositDestinations', 'budgets'));
    }

    /**
     * Mass update of journals.
     *
     * @param MassEditJournalRequest $request
     *
     * @return RedirectResponse|Redirector
     * @throws FireflyException
     */
    public function update(MassEditJournalRequest $request)
    {
        $journalIds = $request->get('journals');
        if (!is_array($journalIds)) {
            // TODO something error.
            throw new FireflyException('This is not an array.'); 
        }
        $count = 0;
        /** @var string $journalId */
        foreach ($journalIds as $journalId) {
            $integer = (int)$journalId;
            try {
                $this->updateJournal($integer, $request);
                $count++;
            } catch (FireflyException $e) {  
                // @ignoreException
            }
        }

        app('preferences')->mark();
        session()->flash('success', (string)trans_choice('firefly.mass_edited_transactions_success', $count));

        // redirect to previous URL:
        return redirect($this->getPreviousUri('transactions.mass-edit.uri'));
    }

    /**
     * @param int                    $journalId
     * @param MassEditJournalRequest $request
     *
     * @throws FireflyException
     */
    private function updateJournal(int $journalId, MassEditJournalRequest $request): void
    {
        $journal = $this->repository->findNull($journalId);
        if (null === $journal) {
            throw new FireflyException(sprintf('Trying to edit non-existent or deleted journal #%d', $journalId)); 
        }
        $service = app(JournalUpdateService::class);
        // for each field, call the update service.
        $service->setTransactionJournal($journal);

        $data = [
            'date'             => $this->getDateFromRequest($request, $journal->id, 'date'),
            'description'      => $this->getStringFromRequest($request, $journal->id, 'description'),
            'source_id'        => $this->getIntFromRequest($request, $journal->id, 'source_id'),
            'source_name'      => $this->getStringFromRequest($request, $journal->id, 'source_name'),
            'destination_id'   => $this->getIntFromRequest($request, $journal->id, 'destination_id'),
            'destination_name' => $this->getStringFromRequest($request, $journal->id, 'destination_name'),
            'budget_id'        => $this->getIntFromRequest($request, $journal->id, 'budget_id'),
            'category_name'    => $this->getStringFromRequest($request, $journal->id, 'category'),
            'amount'           => $this->getStringFromRequest($request, $journal->id, 'amount'),
            'foreign_amount'   => $this->getStringFromRequest($request, $journal->id, 'foreign_amount'),
        ];
        Log::debug(sprintf('Will update journal #%d with data.', $journal->id), $data);

        // call service to update.
        $service->setData($data);
        $service->update();
        // trigger rules
        event(new UpdatedTransactionGroup($journal->transactionGroup));
    }

    /**
     * @param MassEditJournalRequest $request
     * @param int                    $journalId
     * @param string                 $string
     *
     * @return Carbon|null
     * @codeCoverageIgnore
     */
    private function getDateFromRequest(MassEditJournalRequest $request, int $journalId, string $string): ?Carbon
    {
        $value = $request->get($string);
        if (!is_array($value)) {
            return null;
        }
        if (!array_key_exists($journalId, $value)) {
            return null;
        }
        try {
            $carbon = Carbon::parse($value[$journalId]);
        } catch (InvalidArgumentException $e) {
            $e->getMessage();

            return null;
        }

        return $carbon;
    }

    /**
     * @param MassEditJournalRequest $request
     * @param int                    $journalId
     * @param string                 $string
     *
     * @return string|null
     * @codeCoverageIgnore
     */
    private function getStringFromRequest(MassEditJournalRequest $request, int $journalId, string $string): ?string
    {
        $value = $request->get($string);
        if (!is_array($value)) {
            return null;
        }
        if (!array_key_exists($journalId, $value)) {
            return null;
        }

        return (string)$value[$journalId];
    }

    /**
     * @param MassEditJournalRequest $request
     * @param int                    $journalId
     * @param string                 $string
     *
     * @return int|null
     * @codeCoverageIgnore
     */
    private function getIntFromRequest(MassEditJournalRequest $request, int $journalId, string $string): ?int
    {
        $value = $request->get($string);
        if (!is_array($value)) {
            return null;
        }
        if (!array_key_exists($journalId, $value)) {
            return null;
        }

        return (int)$value[$journalId];
    }
}
