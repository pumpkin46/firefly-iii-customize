<?php

/**
 * GroupValidation.php
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

namespace FireflyIII\Validation;

use FireflyIII\Models\TransactionGroup;
use Illuminate\Validation\Validator;
use Log;

/**
 * Trait GroupValidation.
 *
 * This trait combines some of the validation methods used to validate if journal and group data is submitted correctly.
 */
trait GroupValidation
{

    /**
     * Adds an error to the "description" field when the user has submitted no descriptions and no
     * journal description.
     *
     * @param Validator $validator
     */
    protected function validateDescriptions(Validator $validator): void
    {
        Log::debug('Now in GroupValidation::validateDescriptions()');
        $transactions      = $this->getTransactionsArray($validator);
        $validDescriptions = 0;
        foreach ($transactions as $transaction) {
            if ('' !== (string)($transaction['description'] ?? null)) {
                $validDescriptions++;
            }
        }

        // no valid descriptions?
        if (0 === $validDescriptions) {
            $validator->errors()->add(
                'transactions.0.description', (string)trans('validation.filled', ['attribute' => (string)trans('validation.attributes.description')])
            );
        }
    }

    /**
     * @param Validator $validator
     */
    protected function validateGroupDescription(Validator $validator): void
    {
        Log::debug('Now in validateGroupDescription()');
        $data         = $validator->getData();
        $transactions = $this->getTransactionsArray($validator);

        $groupTitle = $data['group_title'] ?? '';
        if ('' === $groupTitle && count($transactions) > 1) {
            $validator->errors()->add('group_title', (string)trans('validation.group_title_mandatory'));
        }
    }

    /**
     * This method validates if the user has submitted transaction journal ID's for each array they submit, if they've submitted more than 1 transaction
     * journal. This check is necessary because Firefly III isn't able to distinguish between journals without the ID.
     *
     * @param Validator        $validator
     * @param TransactionGroup $transactionGroup
     */
    protected function validateJournalIds(Validator $validator, TransactionGroup $transactionGroup): void
    {
        Log::debug(sprintf('Now in GroupValidation::validateJournalIds(%d)', $transactionGroup->id));
        $transactions = $this->getTransactionsArray($validator);

        if (count($transactions) < 2) {
            // no need for validation.
            Log::debug(sprintf('%d transaction(s) in submission, can skip this check.', count($transactions)));

            return;
        }
        // check each array:
        /**
         * @var int   $index
         * @var array $transaction
         */
        foreach ($transactions as $index => $transaction) {
            $this->validateJournalId($validator, $index, $transaction, $transactionGroup);
        }
    }

    /**
     * @param Validator $validator
     *
     * @return array
     */
    abstract protected function getTransactionsArray(Validator $validator): array;

    /**
     * Do the validation required by validateJournalIds.
     *
     * @param Validator        $validator
     * @param int              $index
     * @param array            $transaction
     * @param TransactionGroup $transactionGroup
     *
     * @SuppressWarnings(PHPMD.CyclomaticComplexity)
     */
    private function validateJournalId(Validator $validator, int $index, array $transaction, TransactionGroup $transactionGroup): void
    {
        $journalId = 0;
        if (array_key_exists('transaction_journal_id', $transaction)) {
            $journalId = $transaction['transaction_journal_id'];
        }
        Log::debug(sprintf('Now in validateJournalId(%d, %d)', $index, $journalId));
        if (0 === $journalId) {
            Log::debug('Submitted 0, will accept to be used in a new transaction.');

            return;
        }
        $count = $transactionGroup->transactionJournals()->where('transaction_journals.id', $journalId)->count();
        if (null === $journalId || 0 === $count) {
            Log::warning(sprintf('Transaction group #%d has %d journals with ID %d', $transactionGroup->id, $count, $journalId));
            Log::warning('Invalid submission: Each split must have transaction_journal_id (either valid ID or 0).');
            $validator->errors()->add(sprintf('transactions.%d.source_name', $index), (string)trans('validation.need_id_in_edit'));
        }
    }
}
