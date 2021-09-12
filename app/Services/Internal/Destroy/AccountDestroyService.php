<?php
/**
 * AccountDestroyService.php
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

namespace FireflyIII\Services\Internal\Destroy;

use DB;
use Exception;
use FireflyIII\Models\Account;
use FireflyIII\Models\PiggyBank;
use FireflyIII\Models\RecurrenceTransaction;
use FireflyIII\Models\Transaction;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Models\TransactionType;
use Illuminate\Database\Eloquent\Builder;
use Log;

/**
 * Class AccountDestroyService
 */
class AccountDestroyService
{
    /**
     * @param Account      $account
     * @param Account|null $moveTo
     *
     * @return void
     */
    public function destroy(Account $account, ?Account $moveTo): void
    {
        // find and delete opening balance journal + opposing account
        $this->destroyOpeningBalance($account);

        if (null !== $moveTo) {
            $this->moveTransactions($account, $moveTo);
            $this->updateRecurrences($account, $moveTo);
        }
        $this->destroyJournals($account);

        // delete recurring transactions with this account:
        if (null === $moveTo) {
            $this->destroyRecurrences($account);
        }

        // delete piggy banks:
        PiggyBank::where('account_id', $account->id)->delete();

        // delete account meta:
        $account->accountMeta()->delete();
        // delete account.
        try {
            $account->delete();
        } catch (Exception $e) { // @phpstan-ignore-line
            // @ignoreException
        }
    }

    /**
     * @param Account $account
     */
    private function destroyOpeningBalance(Account $account): void
    {
        Log::debug(sprintf('Searching for opening balance for account #%d "%s"', $account->id, $account->name));
        $set = $account->transactions()
                       ->leftJoin('transaction_journals', 'transaction_journals.id', '=', 'transactions.transaction_journal_id')
                       ->leftJoin('transaction_types', 'transaction_types.id', '=', 'transaction_journals.transaction_type_id')
                       ->where('transaction_types.type', TransactionType::OPENING_BALANCE)
                       ->get(['transactions.transaction_journal_id']);
        if ($set->count() > 0) {
            $journalId = (int)$set->first()->transaction_journal_id;
            Log::debug(sprintf('Found opening balance journal with ID #%d', $journalId));

            // get transactions with this journal (should be just one):
            $transactions = Transaction
                ::where('transaction_journal_id', $journalId)
                ->where('account_id', '!=', $account->id)
                ->get();
            /** @var Transaction $transaction */
            foreach ($transactions as $transaction) {
                Log::debug(sprintf('Found transaction with ID #%d', $transaction->id));
                $ibAccount = $transaction->account;
                Log::debug(sprintf('Connected to account #%d "%s"', $ibAccount->id, $ibAccount->name));

                $ibAccount->accountMeta()->delete();
                $transaction->delete();
                $ibAccount->delete();
            }
            $journal = TransactionJournal::find($journalId);
            /** @var JournalDestroyService $service */
            $service = app(JournalDestroyService::class);
            $service->destroy($journal);
        }
    }

    /**
     * @param Account $account
     * @param Account $moveTo
     */
    public function moveTransactions(Account $account, Account $moveTo): void
    {
        Log::debug(sprintf('Move from account #%d to #%d', $account->id, $moveTo->id));
        DB::table('transactions')->where('account_id', $account->id)->update(['account_id' => $moveTo->id]);

        $collection = Transaction::groupBy('transaction_journal_id', 'account_id')
                                 ->where('account_id', $moveTo->id)
                                 ->get(['transaction_journal_id', 'account_id', DB::raw('count(*) as the_count')]); // @phpstan-ignore-line
        if (0 === $collection->count()) {
            return;
        }

        /** @var JournalDestroyService $service */
        $service = app(JournalDestroyService::class);
        $user    = $account->user;
        /** @var \stdClass $row */
        foreach ($collection as $row) {
            if ((int)$row->the_count > 1) {
                $journalId = (int)$row->transaction_journal_id;
                $journal   = $user->transactionJournals()->find($journalId);
                if (null !== $journal) {
                    Log::debug(sprintf('Deleted journal #%d because it has the same source as destination.', $journal->id));
                    $service->destroy($journal);
                }
            }
        }
    }

    /**
     * @param Account $account
     * @param Account $moveTo
     */
    private function updateRecurrences(Account $account, Account $moveTo): void
    {
        DB::table('recurrences_transactions')->where('source_id', $account->id)->update(['source_id' => $moveTo->id]);
        DB::table('recurrences_transactions')->where('destination_id', $account->id)->update(['destination_id' => $moveTo->id]);
    }

    /**
     * @param Account $account
     */
    private function destroyJournals(Account $account): void
    {

        /** @var JournalDestroyService $service */
        $service = app(JournalDestroyService::class);

        Log::debug('Now trigger account delete response #' . $account->id);
        /** @var Transaction $transaction */
        foreach ($account->transactions()->get() as $transaction) {
            Log::debug('Now at transaction #' . $transaction->id);
            /** @var TransactionJournal $journal */
            $journal = $transaction->transactionJournal()->first();
            if (null !== $journal) {
                Log::debug('Call for deletion of journal #' . $journal->id);
                $service->destroy($journal);
            }
        }
    }

    /**
     * @param Account $account
     */
    private function destroyRecurrences(Account $account): void
    {
        $recurrences = RecurrenceTransaction::
        where(
            static function (Builder $q) use ($account) {
                $q->where('source_id', $account->id);
                $q->orWhere('destination_id', $account->id);
            }
        )->get(['recurrence_id'])->pluck('recurrence_id')->toArray();

        /** @var RecurrenceDestroyService $destroyService */
        $destroyService = app(RecurrenceDestroyService::class);
        foreach ($recurrences as $recurrenceId) {
            $destroyService->destroyById((int)$recurrenceId);
        }
    }

}
