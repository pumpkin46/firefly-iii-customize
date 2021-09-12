<?php
/**
 * JournalAPIRepository.php
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

namespace FireflyIII\Repositories\Journal;

use FireflyIII\Models\Attachment;
use FireflyIII\Models\PiggyBankEvent;
use FireflyIII\Models\Transaction;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\User;
use Illuminate\Support\Collection;
use Storage;

/**
 * Class JournalAPIRepository
 */
class JournalAPIRepository implements JournalAPIRepositoryInterface
{
    private User $user;

    /**
     * Returns transaction by ID. Used to validate attachments.
     *
     * @param int $transactionId
     *
     * @return Transaction|null
     */
    public function findTransaction(int $transactionId): ?Transaction
    {
        return Transaction::leftJoin('transaction_journals', 'transaction_journals.id', '=', 'transactions.transaction_journal_id')
                          ->where('transaction_journals.user_id', $this->user->id)
                          ->where('transactions.id', $transactionId)
                          ->first(['transactions.*']);
    }

    /**
     * Return all attachments for journal.
     *
     * @param TransactionJournal $journal
     *
     * @return Collection
     */
    public function getAttachments(TransactionJournal $journal): Collection
    {
        $set = $journal->attachments;

        /** @var Storage $disk */
        $disk = Storage::disk('upload');

        return $set->each(
            static function (Attachment $attachment) use ($disk) {
                $notes                   = $attachment->notes()->first();
                $attachment->file_exists = $disk->exists($attachment->fileName());
                $attachment->notes       = $notes ? $notes->text : '';

                return $attachment;
            }
        );
    }

    /**
     * @inheritDoc
     */
    public function getJournalLinks(TransactionJournal $journal): Collection
    {
        $collection = $journal->destJournalLinks()->get();

        return $journal->sourceJournalLinks()->get()->merge($collection);
    }

    /**
     * Get all piggy bank events for a journal.
     *
     * @param TransactionJournal $journal
     *
     * @return Collection
     */
    public function getPiggyBankEvents(TransactionJournal $journal): Collection
    {
        /** @var Collection $events */
        $events = $journal->piggyBankEvents()->get();
        $events->each(
            function (PiggyBankEvent $event) {
                $event->piggyBank = $event->piggyBank()->withTrashed()->first();
            }
        );

        return $events;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }
}
