<?php
/**
 * DeleteEmptyJournals.php
 * Copyright (c) 2020 james@firefly-iii.org
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

namespace FireflyIII\Console\Commands\Correction;

use DB;
use Exception;
use FireflyIII\Models\Transaction;
use FireflyIII\Models\TransactionJournal;
use Illuminate\Console\Command;
use Log;

/**
 * Class DeleteEmptyJournals
 */
class DeleteEmptyJournals extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete empty and uneven transaction journals.';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firefly-iii:delete-empty-journals';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $this->deleteUnevenJournals();
        $this->deleteEmptyJournals();

        return 0;
    }

    /**
     * Delete transactions and their journals if they have an uneven number of transactions.
     */
    private function deleteUnevenJournals(): void
    {
        $set   = Transaction
            ::whereNull('deleted_at')
            ->groupBy('transactions.transaction_journal_id')
            ->get([DB::raw('COUNT(transactions.transaction_journal_id) as the_count'), 'transaction_journal_id']);
        $total = 0;
        /** @var Transaction $row */
        foreach ($set as $row) {
            $count = (int)$row->the_count;
            if (1 === $count % 2) {
                // uneven number, delete journal and transactions:
                try {
                    TransactionJournal::find((int)$row->transaction_journal_id)->delete();

                } catch (Exception $e) { // @phpstan-ignore-line
                    Log::info(sprintf('Could not delete journal: %s', $e->getMessage()));
                }


                Transaction::where('transaction_journal_id', (int)$row->transaction_journal_id)->delete();
                $this->info(sprintf('Deleted transaction journal #%d because it had an uneven number of transactions.', $row->transaction_journal_id));
                $total++;
            }
        }
        if (0 === $total) {
            $this->info('No uneven transaction journals.');
        }
    }

    private function deleteEmptyJournals(): void
    {
        $start = microtime(true);
        $count = 0;
        $set   = TransactionJournal::leftJoin('transactions', 'transactions.transaction_journal_id', '=', 'transaction_journals.id')
                                   ->groupBy('transaction_journals.id')
                                   ->whereNull('transactions.transaction_journal_id')
                                   ->get(['transaction_journals.id']);

        foreach ($set as $entry) {
            try {
                TransactionJournal::find($entry->id)->delete();

            } catch (Exception $e) { // @phpstan-ignore-line
                Log::info(sprintf('Could not delete entry: %s', $e->getMessage()));
            }


            $this->info(sprintf('Deleted empty transaction journal #%d', $entry->id));
            ++$count;
        }
        if (0 === $count) {
            $this->info('No empty transaction journals.');
        }
        $end = round(microtime(true) - $start, 2);
        $this->info(sprintf('Verified empty journals in %s seconds', $end));
    }

}
