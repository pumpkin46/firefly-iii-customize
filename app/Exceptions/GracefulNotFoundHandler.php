<?php
/**
 * GracefulNotFoundHandler.php
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

namespace FireflyIII\Exceptions;

use Exception;
use FireflyIII\Models\Account;
use FireflyIII\Models\Attachment;
use FireflyIII\Models\Bill;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Models\TransactionType;
use FireflyIII\User;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Class GracefulNotFoundHandler
 */
class GracefulNotFoundHandler extends ExceptionHandler
{
    /**
     * Render an exception into an HTTP response.
     *
     * @param Request   $request
     * @param Throwable $e
     *
     * @return mixed
     * @throws Throwable
     */
    public function render($request, Throwable $e)
    {
        $route = $request->route();
        if (null === $route) {
            return parent::render($request, $e);
        }
        $name = $route->getName();
        if (!auth()->check()) {
            return parent::render($request, $e);
        }

        switch ($name) {
            default:
                Log::warning(sprintf('GracefulNotFoundHandler cannot handle route with name "%s"', $name));

                return parent::render($request, $e);
            case 'accounts.show':
            case 'accounts.show.all':
                return $this->handleAccount($request, $e);
            case 'transactions.show':
                return $this->handleGroup($request, $e);
            case 'attachments.show':
            case 'attachments.edit':
            case 'attachments.download':
            case 'attachments.view':
                // redirect to original attachment holder.
                return $this->handleAttachment($request, $e);
                break;
            case 'bills.show':
                $request->session()->reflash();

                return redirect(route('bills.index'));
                break;
            case 'currencies.show':
                $request->session()->reflash();

                return redirect(route('currencies.index'));
                break;
            case 'budgets.show':
            case 'budgets.edit':
                $request->session()->reflash();

                return redirect(route('budgets.index'));
                break;
            case 'piggy-banks.show':
                $request->session()->reflash();

                return redirect(route('piggy-banks.index'));
            case 'recurring.show':
            case 'recurring.edit':
                $request->session()->reflash();

                return redirect(route('recurring.index'));
            case 'tags.show.all':
            case 'tags.show':
            case 'tags.edit':
                $request->session()->reflash();

                return redirect(route('tags.index'));
            case 'categories.show':
            case 'categories.show.all':
                $request->session()->reflash();

                return redirect(route('categories.index'));
            case 'rules.edit':
                $request->session()->reflash();

                return redirect(route('rules.index'));
            case 'transactions.edit':
            case 'transactions.mass.edit':
            case 'transactions.mass.delete':
            case 'transactions.bulk.edit':
                if ('POST' === $request->method()) {
                    $request->session()->reflash();

                    return redirect(route('index'));
                }

                return parent::render($request, $e);
        }

    }

    /**
     * @param Request   $request
     * @param Throwable $exception
     *
     * @return Redirector|Response
     * @throws Throwable
     */
    private function handleAccount(Request $request, Throwable $exception)
    {
        Log::debug('404 page is probably a deleted account. Redirect to overview of account types.');
        /** @var User $user */
        $user      = auth()->user();
        $route     = $request->route();
        $accountId = (int)$route->parameter('account');
        /** @var Account $account */
        $account = $user->accounts()->with(['accountType'])->withTrashed()->find($accountId);
        if (null === $account) {
            Log::error(sprintf('Could not find account %d, so give big fat error.', $accountId));

            return parent::render($request, $exception);
        }
        $type      = $account->accountType;
        $shortType = config(sprintf('firefly.shortNamesByFullName.%s', $type->type));
        $request->session()->reflash();

        return redirect(route('accounts.index', [$shortType]));
    }

    /**
     * @param Request $request
     * @param Throwable $exception
     *
     * @return RedirectResponse|\Illuminate\Http\Response|Redirector|Response
     * @throws Throwable
     */
    private function handleGroup(Request $request, Throwable $exception)
    {
        Log::debug('404 page is probably a deleted group. Redirect to overview of group types.');
        /** @var User $user */
        $user    = auth()->user();
        $route   = $request->route();
        $groupId = (int)$route->parameter('transactionGroup');

        /** @var TransactionGroup $group */
        $group = $user->transactionGroups()->withTrashed()->find($groupId);
        if (null === $group) {
            Log::error(sprintf('Could not find group %d, so give big fat error.', $groupId));

            return parent::render($request, $exception);
        }
        /** @var TransactionJournal $journal */
        $journal = $group->transactionJournals()->withTrashed()->first();
        if (null === $journal) {
            Log::error(sprintf('Could not find journal for group %d, so give big fat error.', $groupId));

            return parent::render($request, $exception);
        }
        $type = $journal->transactionType->type;
        $request->session()->reflash();

        if (TransactionType::RECONCILIATION === $type) {
            return redirect(route('accounts.index', ['asset']));
        }

        return redirect(route('transactions.index', [strtolower($type)]));

    }

    /**
     * @param Request   $request
     * @param Throwable $exception
     *
     * @return RedirectResponse|Redirector|Response
     * @throws Throwable
     */
    private function handleAttachment(Request $request, Throwable $exception)
    {
        Log::debug('404 page is probably a deleted attachment. Redirect to parent object.');
        /** @var User $user */
        $user         = auth()->user();
        $route        = $request->route();
        $attachmentId = (int)$route->parameter('attachment');
        /** @var Attachment $attachment */
        $attachment = $user->attachments()->withTrashed()->find($attachmentId);
        if (null === $attachment) {
            Log::error(sprintf('Could not find attachment %d, so give big fat error.', $attachmentId));

            return parent::render($request, $exception);
        }
        // get bindable.
        if (TransactionJournal::class === $attachment->attachable_type) {
            // is linked to journal, get group of journal (if not also deleted)
            /** @var TransactionJournal $journal */
            $journal = $user->transactionJournals()->withTrashed()->find($attachment->attachable_id);
            if (null !== $journal) {
                return redirect(route('transactions.show', [$journal->transaction_group_id]));
            }

        }
        if (Bill::class === $attachment->attachable_type) {
            // is linked to bill.
            /** @var Bill $bill */
            $bill = $user->bills()->withTrashed()->find($attachment->attachable_id);
            if (null !== $bill) {
                return redirect(route('bills.show', [$bill->id]));
            }
        }

        Log::error(sprintf('Could not redirect attachment %d, its linked to a %s.', $attachmentId, $attachment->attachable_type));

        return parent::render($request, $exception);
    }

}
