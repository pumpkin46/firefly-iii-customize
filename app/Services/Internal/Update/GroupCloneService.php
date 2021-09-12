<?php
/**
 * GroupCloneService.php
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

namespace FireflyIII\Services\Internal\Update;

use Carbon\Carbon;
use FireflyIII\Models\Budget;
use FireflyIII\Models\Category;
use FireflyIII\Models\Note;
use FireflyIII\Models\Tag;
use FireflyIII\Models\Transaction;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Models\TransactionJournalMeta;

/**
 * Class GroupCloneService
 * TODO test.
 */
class GroupCloneService
{
    /**
     * @param TransactionGroup $group
     *
     * @return TransactionGroup
     */
    public function cloneGroup(TransactionGroup $group): TransactionGroup
    {
        $newGroup = $group->replicate();
        $newGroup->save();
        foreach ($group->transactionJournals as $journal) {
            $this->cloneJournal($journal, $newGroup, (int)$group->id);
        }
        return $newGroup;
    }

    /**
     * @param TransactionJournal $journal
     * @param TransactionGroup   $newGroup
     * @param int                $originalGroup
     */
    private function cloneJournal(TransactionJournal $journal, TransactionGroup $newGroup, int $originalGroup): void
    {
        $newJournal                       = $journal->replicate();
        $newJournal->transaction_group_id = $newGroup->id;
        $newJournal->date                 = Carbon::now();
        $newJournal->save();

        foreach ($journal->transactions as $transaction) {
            $this->cloneTransaction($transaction, $newJournal);
        }

        // clone notes
        /** @var Note $note */
        foreach ($journal->notes as $note) {
            $this->cloneNote($note, $newJournal, $originalGroup);
        }
        // clone location (not yet available)

        // clone meta
        /** @var TransactionJournalMeta $meta */
        foreach ($journal->transactionJournalMeta as $meta) {
            $this->cloneMeta($meta, $newJournal);
        }
        // clone category
        /** @var Category $category */
        foreach ($journal->categories as $category) {
            $newJournal->categories()->save($category);
        }

        // clone budget
        /** @var Budget $budget */
        foreach ($journal->budgets as $budget) {
            $newJournal->budgets()->save($budget);
        }
        // clone links (ongoing).

        // clone tags
        /** @var Tag $tag */
        foreach ($journal->tags as $tag) {
            $newJournal->tags()->save($tag);
        }
        // add note saying "cloned".

        // add relation.
    }

    /**
     * @param Transaction        $transaction
     * @param TransactionJournal $newJournal
     */
    private function cloneTransaction(Transaction $transaction, TransactionJournal $newJournal): void
    {
        $newTransaction                         = $transaction->replicate();
        $newTransaction->transaction_journal_id = $newJournal->id;
        $newTransaction->reconciled             = false;
        $newTransaction->save();
    }

    /**
     * @param Note               $note
     * @param TransactionJournal $newJournal
     * @param int                $oldGroupId
     */
    private function cloneNote(Note $note, TransactionJournal $newJournal, int $oldGroupId): void
    {
        $newNote              = $note->replicate();
        $newNote->text        .= sprintf(
            "\n\n%s", trans('firefly.clones_journal_x', ['description' => $newJournal->description, 'id' => $oldGroupId])
        );
        $newNote->noteable_id = $newJournal->id;
        $newNote->save();

    }

    /**
     * @param TransactionJournalMeta $meta
     * @param TransactionJournal     $newJournal
     */
    private function cloneMeta(TransactionJournalMeta $meta, TransactionJournal $newJournal): void
    {
        $newMeta                         = $meta->replicate();
        $newMeta->transaction_journal_id = $newJournal->id;
        if ('recurrence_id' !== $newMeta->name) {
            $newMeta->save();
        }
    }
}
