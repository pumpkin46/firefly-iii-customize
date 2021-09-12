<?php
/**
 * ReconcileController.php
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

namespace FireflyIII\Http\Controllers\Json;

use Carbon\Carbon;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Models\Account;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Models\TransactionType;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Repositories\Journal\JournalRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Log;
use Throwable;

/**
 *
 * Class ReconcileController
 */
class ReconcileController extends Controller
{
    private AccountRepositoryInterface  $accountRepos;
    private CurrencyRepositoryInterface $currencyRepos;
    private JournalRepositoryInterface  $repository;

    /**
     * ReconcileController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        // translations:
        $this->middleware(
            function ($request, $next) {
                app('view')->share('mainTitleIcon', 'fa-credit-card');
                app('view')->share('title', (string)trans('firefly.accounts'));
                $this->repository    = app(JournalRepositoryInterface::class);
                $this->accountRepos  = app(AccountRepositoryInterface::class);
                $this->currencyRepos = app(CurrencyRepositoryInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Overview of reconciliation.
     *
     * @param Request $request
     * @param Account $account
     * @param Carbon  $start
     * @param Carbon  $end
     *
     * @return JsonResponse
     */
    public function overview(Request $request, Account $account, Carbon $start, Carbon $end): JsonResponse
    {
        $startBalance    = $request->get('startBalance');
        $endBalance      = $request->get('endBalance');
        $accountCurrency = $this->accountRepos->getAccountCurrency($account) ?? app('amount')->getDefaultCurrency();
        $amount          = '0';
        $clearedAmount   = '0';

        if ($end->lt($start)) {
            [$start, $end] = [$end, $start];
        }

        $route           = route('accounts.reconcile.submit', [$account->id, $start->format('Ymd'), $end->format('Ymd')]);
        $selectedIds     = $request->get('journals') ?? [];
        $clearedJournals = [];
        $clearedIds      = $request->get('cleared') ?? [];
        $journals        = [];
        /* Collect all submitted journals */
        if (count($selectedIds) > 0) {
            /** @var GroupCollectorInterface $collector */
            $collector = app(GroupCollectorInterface::class);
            $collector->setJournalIds($selectedIds);
            $journals = $collector->getExtractedJournals();
        }

        /* Collect all journals already reconciled */
        if (count($clearedIds) > 0) {
            /** @var GroupCollectorInterface $collector */
            $collector = app(GroupCollectorInterface::class);
            $collector->setJournalIds($clearedIds);
            $clearedJournals = $collector->getExtractedJournals();
        }

        Log::debug('Start transaction loop');
        /** @var array $journal */
        foreach ($journals as $journal) {
            $amount = $this->processJournal($account, $accountCurrency, $journal, $amount);
        }
        Log::debug(sprintf('Final amount is %s', $amount));
        Log::debug('End transaction loop');

        /** @var array $journal */
        foreach ($clearedJournals as $journal) {
            if ($journal['date'] <= $end) {
                $clearedAmount = $this->processJournal($account, $accountCurrency, $journal, $clearedAmount);
            }
        }
        $difference   = bcadd(bcadd(bcsub($startBalance, $endBalance), $clearedAmount), $amount);
        $diffCompare  = bccomp($difference, '0');
        $countCleared = count($clearedJournals);

        $reconSum = bcadd(bcadd($startBalance, $amount), $clearedAmount);

        try {
            $view = prefixView(
                'accounts.reconcile.overview',
                compact(
                    'account',
                    'start',
                    'diffCompare',
                    'difference',
                    'end',
                    'clearedAmount',
                    'startBalance',
                    'endBalance',
                    'amount',
                    'route',
                    'countCleared',
                    'reconSum',
                    'selectedIds'
                )
            )->render();

        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('View error: %s', $e->getMessage()));
            $view = sprintf('Could not render accounts.reconcile.overview: %s', $e->getMessage());
        }

        $return = [
            'post_uri' => $route,
            'html'     => $view,
        ];

        return response()->json($return);
    }

    /**
     * @param Account             $account
     * @param TransactionCurrency $currency
     * @param array               $journal
     * @param string              $amount
     *
     * @return string
     */
    private function processJournal(Account $account, TransactionCurrency $currency, array $journal, string $amount): string
    {
        $toAdd = '0';
        Log::debug(sprintf('User submitted %s #%d: "%s"', $journal['transaction_type_type'], $journal['transaction_journal_id'], $journal['description']));

        // not much magic below we need to cover using tests.

        if ($account->id === $journal['source_account_id']) {
            if ($currency->id === $journal['currency_id']) {
                $toAdd = $journal['amount'];
            }
            if (null !== $journal['foreign_currency_id'] && $journal['foreign_currency_id'] === $currency->id) {
                $toAdd = $journal['foreign_amount'];
            }
        }
        if ($account->id === $journal['destination_account_id']) {
            if ($currency->id === $journal['currency_id']) {
                $toAdd = bcmul($journal['amount'], '-1');
            }
            if (null !== $journal['foreign_currency_id'] && $journal['foreign_currency_id'] === $currency->id) {
                $toAdd = bcmul($journal['foreign_amount'], '-1');
            }
        }


        Log::debug(sprintf('Going to add %s to %s', $toAdd, $amount));
        $amount = bcadd($amount, $toAdd);
        Log::debug(sprintf('Result is %s', $amount));

        return $amount;
    }

    /**
     * Returns a list of transactions in a modal.
     *
     * @param Account $account
     * @param Carbon  $start
     * @param Carbon  $end
     *
     * @return mixed
     *
     */
    public function transactions(Account $account, Carbon $start, Carbon $end)
    {
        if ($end->lt($start)) {
            [$end, $start] = [$start, $end];
        }
        $startDate = clone $start;
        $startDate->subDay();

        $currency     = $this->accountRepos->getAccountCurrency($account) ?? app('amount')->getDefaultCurrency();
        $startBalance = round((float)app('steam')->balance($account, $startDate), $currency->decimal_places);
        $endBalance   = round((float)app('steam')->balance($account, $end), $currency->decimal_places);

        // get the transactions
        $selectionStart = clone $start;
        $selectionStart->subDays(3);
        $selectionEnd = clone $end;
        $selectionEnd->addDays(3);

        // grab transactions:
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);

        $collector->setAccounts(new Collection([$account]))
                  ->setRange($selectionStart, $selectionEnd)
                  ->withBudgetInformation()->withCategoryInformation()->withAccountInformation();
        $array    = $collector->getExtractedJournals();
        $journals = $this->processTransactions($account, $array);

        try {
            $html = prefixView(
                'accounts.reconcile.transactions',
                compact('account', 'journals', 'currency', 'start', 'end', 'selectionStart', 'selectionEnd')
            )->render();

        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render: %s', $e->getMessage()));
            $html = sprintf('Could not render accounts.reconcile.transactions: %s', $e->getMessage());
        }
        return response()->json(['html' => $html, 'startBalance' => $startBalance, 'endBalance' => $endBalance]);
    }

    /**
     * "fix" amounts to make it easier on the reconciliation overview:
     *
     * @param Account $account
     * @param array   $array
     *
     * @return array
     */
    private function processTransactions(Account $account, array $array): array
    {
        $journals = [];
        /** @var array $journal */
        foreach ($array as $journal) {
            $inverse = false;

            if (TransactionType::DEPOSIT === $journal['transaction_type_type']) {
                $inverse = true;
            }
            // transfer to this account? then positive amount:
            if (TransactionType::TRANSFER === $journal['transaction_type_type'] && $account->id === $journal['destination_account_id']) {
                $inverse = true;
            }

            // opening balance into account? then positive amount:
            if (TransactionType::OPENING_BALANCE === $journal['transaction_type_type']
                && $account->id === $journal['destination_account_id']) {
                $inverse = true;
            }

            if (true === $inverse) {
                $journal['amount'] = app('steam')->positive($journal['amount']);
                if (null !== $journal['foreign_amount']) {
                    $journal['foreign_amount'] = app('steam')->positive($journal['foreign_amount']);
                }
            }


            $journals[] = $journal;
        }

        return $journals;
    }
}
