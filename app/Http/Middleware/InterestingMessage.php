<?php
/**
 * InterestingMessage.php
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

namespace FireflyIII\Http\Middleware;

use Closure;
use FireflyIII\Models\Account;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Models\TransactionJournal;
use Illuminate\Http\Request;
use Preferences;

/**
 * Class InterestingMessage
 */
class InterestingMessage
{
    /**
     * Flashes the user an interesting message if the URL parameters warrant it.
     *
     * @param Request $request
     * @param Closure $next
     *
     * @return mixed
     *
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->testing()) {
            return $next($request);
        }

        if ($this->groupMessage($request)) {
            Preferences::mark();
            $this->handleGroupMessage($request);
        }
        if ($this->accountMessage($request)) {
            Preferences::mark();
            $this->handleAccountMessage($request);
        }

        return $next($request);
    }

    /**
     * @return bool
     */
    private function testing(): bool
    {
        // ignore middleware in test environment.
        return 'testing' === config('app.env') || !auth()->check();
    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    private function groupMessage(Request $request): bool
    {
        // get parameters from request.
        $transactionGroupId = $request->get('transaction_group_id');
        $message            = $request->get('message');

        return null !== $transactionGroupId && null !== $message;
    }

    /**
     * @param Request $request
     */
    private function handleAccountMessage(Request $request): void {

        // get parameters from request.
        $accountId = $request->get('account_id');
        $message            = $request->get('message');

        /** @var Account $account */
        $account = auth()->user()->accounts()->withTrashed()->find($accountId);

        if (null === $account) {
            return;
        }
        if ('deleted' === $message) {
            session()->flash('success', (string)trans('firefly.account_deleted', ['name' => $account->name]));
        }
        if('created' === $message) {
            session()->flash('success', (string)trans('firefly.stored_new_account', ['name' => $account->name]));
        }
    }
    /**
     * @param Request $request
     */
    private function handleGroupMessage(Request $request): void
    {

        // get parameters from request.
        $transactionGroupId = $request->get('transaction_group_id');
        $message            = $request->get('message');

        // send message about newly created transaction group.
        /** @var TransactionGroup $group */
        $group = auth()->user()->transactionGroups()->with(['transactionJournals', 'transactionJournals.transactionType'])->find((int)$transactionGroupId);

        if (null === $group) {
            return;
        }

        $count = $group->transactionJournals->count();

        /** @var TransactionJournal $journal */
        $journal = $group->transactionJournals->first();
        if (null === $journal) {
            return;
        }
        $title = $count > 1 ? $group->title : $journal->description;
        if ('created' === $message) {
            session()->flash('success_url', route('transactions.show', [$transactionGroupId]));
            session()->flash('success', (string)trans('firefly.stored_journal', ['description' => $title]));
        }
        if ('updated' === $message) {
            $type = strtolower($journal->transactionType->type);
            session()->flash('success_url', route('transactions.show', [$transactionGroupId]));
            session()->flash('success', (string)trans(sprintf('firefly.updated_%s', $type), ['description' => $title]));
        }
        if ('no_change' === $message) {
            $type = strtolower($journal->transactionType->type);
            session()->flash('warning_url', route('transactions.show', [$transactionGroupId]));
            session()->flash('warning', (string)trans(sprintf('firefly.no_changes_%s', $type), ['description' => $title]));
        }
    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    private function accountMessage(Request $request): bool
    {
        // get parameters from request.
        $accountId = $request->get('account_id');
        $message   = $request->get('message');

        return null !== $accountId && null !== $message;
    }
}
