<?php
/**
 * RecurringTransactionTrait.php
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

namespace FireflyIII\Services\Internal\Support;

use Exception;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Factory\AccountFactory;
use FireflyIII\Factory\BudgetFactory;
use FireflyIII\Factory\CategoryFactory;
use FireflyIII\Factory\PiggyBankFactory;
use FireflyIII\Factory\TransactionCurrencyFactory;
use FireflyIII\Models\Account;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\Note;
use FireflyIII\Models\Recurrence;
use FireflyIII\Models\RecurrenceMeta;
use FireflyIII\Models\RecurrenceRepetition;
use FireflyIII\Models\RecurrenceTransaction;
use FireflyIII\Models\RecurrenceTransactionMeta;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Validation\AccountValidator;
use Log;

/**
 * Trait RecurringTransactionTrait
 *
 */
trait RecurringTransactionTrait
{
    /**
     * @param Recurrence $recurrence
     * @param string     $note
     *
     * @return bool
     */
    public function updateNote(Recurrence $recurrence, string $note): bool
    {
        if ('' === $note) {
            $dbNote = $recurrence->notes()->first();
            if (null !== $dbNote) {
                try {
                    $dbNote->delete();
                } catch (Exception $e) { // @phpstan-ignore-line
                    // @ignoreException
                }
            }

            return true;
        }
        $dbNote = $recurrence->notes()->first();
        if (null === $dbNote) {
            $dbNote = new Note();
            $dbNote->noteable()->associate($recurrence);
        }
        $dbNote->text = trim($note);
        $dbNote->save();

        return true;
    }

    /**
     * @param Recurrence $recurrence
     * @param array      $repetitions
     */
    protected function createRepetitions(Recurrence $recurrence, array $repetitions): void
    {
        /** @var array $array */
        foreach ($repetitions as $array) {
            RecurrenceRepetition::create(
                [
                    'recurrence_id'     => $recurrence->id,
                    'repetition_type'   => $array['type'],
                    'repetition_moment' => $array['moment'] ?? '',
                    'repetition_skip'   => $array['skip'] ?? 0,
                    'weekend'           => $array['weekend'] ?? 1,
                ]
            );

        }
    }

    /**
     * Store transactions of a recurring transactions. It's complex but readable.
     *
     * @param Recurrence $recurrence
     * @param array      $transactions
     *
     * @throws FireflyException
     */
    protected function createTransactions(Recurrence $recurrence, array $transactions): void
    {
        Log::debug('Now in createTransactions()');
        foreach ($transactions as $index => $array) {
            Log::debug(sprintf('Now at transaction #%d', $index));
            $sourceTypes = config(sprintf('firefly.expected_source_types.source.%s', $recurrence->transactionType->type));
            $destTypes   = config(sprintf('firefly.expected_source_types.destination.%s', $recurrence->transactionType->type));
            $source      = $this->findAccount($sourceTypes, $array['source_id'], null);
            $destination = $this->findAccount($destTypes, $array['destination_id'], null);

            /** @var TransactionCurrencyFactory $factory */
            $factory         = app(TransactionCurrencyFactory::class);
            $currency        = $factory->find($array['currency_id'] ?? null, $array['currency_code'] ?? null);
            $foreignCurrency = $factory->find($array['foreign_currency_id'] ?? null, $array['foreign_currency_code'] ?? null);
            if (null === $currency) {
                $currency = app('amount')->getDefaultCurrencyByUser($recurrence->user);
            }

            Log::debug(
                sprintf('Will set the validator type to %s based on the type of the recurrence (#%d).', $recurrence->transactionType->type, $recurrence->id)
            );

            // once the accounts have been determined, we still verify their validity:
            /** @var AccountValidator $validator */
            $validator = app(AccountValidator::class);
            $validator->setUser($recurrence->user);
            $validator->setTransactionType($recurrence->transactionType->type);
            if (!$validator->validateSource($source->id, null, null)) {
                throw new FireflyException(sprintf('Source invalid: %s', $validator->sourceError)); 
            }

            if (!$validator->validateDestination($destination->id, null, null)) {
                throw new FireflyException(sprintf('Destination invalid: %s', $validator->destError)); 
            }
            if (array_key_exists('foreign_amount', $array) && '' === (string)$array['foreign_amount']) {
                unset($array['foreign_amount']);
            }
            // TODO typeOverrule: the account validator may have another opinion on the transaction type.
            $transaction = new RecurrenceTransaction(
                [
                    'recurrence_id'           => $recurrence->id,
                    'transaction_currency_id' => $currency->id,
                    'foreign_currency_id'     => null === $foreignCurrency ? null : $foreignCurrency->id,
                    'source_id'               => $source->id,
                    'destination_id'          => $destination->id,
                    'amount'                  => $array['amount'],
                    'foreign_amount'          => array_key_exists('foreign_amount', $array) ? (string)$array['foreign_amount'] : null,
                    'description'             => $array['description'],
                ]
            );
            $transaction->save();

            if (array_key_exists('budget_id', $array)) {
                $this->setBudget($transaction, (int)$array['budget_id']);
            }
            if (array_key_exists('category_id', $array)) {
                $this->setCategory($transaction, (int)$array['category_id']);
            }

            // same for piggy bank
            if (array_key_exists('piggy_bank_id', $array)) {
                $this->updatePiggyBank($transaction, (int)$array['piggy_bank_id']);
            }

            if (array_key_exists('tags', $array)) {
                $this->updateTags($transaction, $array['tags']);
            }

        }
    }

    /**
     * @param array       $expectedTypes
     * @param int|null    $accountId
     * @param string|null $accountName
     *
     * @return Account
     */
    protected function findAccount(array $expectedTypes, ?int $accountId, ?string $accountName): Account
    {
        $result      = null;
        $accountId   = (int)$accountId;
        $accountName = (string)$accountName;
        /** @var AccountRepositoryInterface $repository */
        $repository = app(AccountRepositoryInterface::class);
        $repository->setUser($this->user);

        // if user has submitted an account ID, search for it.
        $result = $repository->findNull((int)$accountId);
        if (null !== $result) {
            return $result;
        }

        // if user has submitted a name, search for it:
        $result = $repository->findByName($accountName, $expectedTypes);
        if (null !== $result) {
            return $result;
        }

        // maybe we can create it? Try to avoid LOAN and other asset types.
        $cannotCreate = [AccountType::ASSET, AccountType::DEBT, AccountType::LOAN, AccountType::MORTGAGE, AccountType::CREDITCARD];
        /** @var AccountFactory $factory */
        $factory = app(AccountFactory::class);
        $factory->setUser($this->user);
        /** @var string $expectedType */
        foreach ($expectedTypes as $expectedType) {
            if (in_array($expectedType, $cannotCreate, true)) {
                continue;
            }
            if (!in_array($expectedType, $cannotCreate, true)) {
                try {
                    $result = $factory->findOrCreate($accountName, $expectedType);

                } catch (FireflyException $e) {
                    Log::error($e->getMessage());
                }

            }
        }

        return $result ?? $repository->getCashAccount();
    }

    /**
     * @param RecurrenceTransaction $transaction
     * @param int                   $budgetId
     */
    private function setBudget(RecurrenceTransaction $transaction, int $budgetId): void
    {
        $budgetFactory = app(BudgetFactory::class);
        $budgetFactory->setUser($transaction->recurrence->user);
        $budget = $budgetFactory->find($budgetId, null);
        if (null === $budget) {
            return;
        }

        $meta = $transaction->recurrenceTransactionMeta()->where('name', 'budget_id')->first();
        if (null === $meta) {
            $meta        = new RecurrenceTransactionMeta;
            $meta->rt_id = $transaction->id;
            $meta->name  = 'budget_id';
        }
        $meta->value = $budget->id;
        $meta->save();
    }

    /**
     * @param RecurrenceTransaction $transaction
     * @param int                   $categoryId
     */
    private function setCategory(RecurrenceTransaction $transaction, int $categoryId): void
    {
        $categoryFactory = app(CategoryFactory::class);
        $categoryFactory->setUser($transaction->recurrence->user);
        $category = $categoryFactory->findOrCreate($categoryId, null);
        if (null === $category) {
            return;
        }

        $meta = $transaction->recurrenceTransactionMeta()->where('name', 'category_id')->first();
        if (null === $meta) {
            $meta        = new RecurrenceTransactionMeta;
            $meta->rt_id = $transaction->id;
            $meta->name  = 'category_id';
        }
        $meta->value = $category->id;
        $meta->save();
    }

    /**
     * @param RecurrenceTransaction $transaction
     * @param int                   $piggyId
     */
    protected function updatePiggyBank(RecurrenceTransaction $transaction, int $piggyId): void
    {
        /** @var PiggyBankFactory $factory */
        $factory = app(PiggyBankFactory::class);
        $factory->setUser($transaction->recurrence->user);
        $piggyBank = $factory->find($piggyId, null);
        if (null !== $piggyBank) {
            /** @var RecurrenceMeta|null $entry */
            $entry = $transaction->recurrenceTransactionMeta()->where('name', 'piggy_bank_id')->first();
            if (null === $entry) {
                $entry = RecurrenceTransactionMeta::create(['rt_id' => $transaction->id, 'name' => 'piggy_bank_id', 'value' => $piggyBank->id]);
            }
            $entry->value = $piggyBank->id;
            $entry->save();
        }
        if (null === $piggyBank) {
            // delete if present
            $transaction->recurrenceTransactionMeta()->where('name', 'piggy_bank_id')->delete();
        }
    }

    /**
     * @param RecurrenceTransaction $transaction
     * @param array                 $tags
     */
    protected function updateTags(RecurrenceTransaction $transaction, array $tags): void
    {
        if (count($tags) > 0) {
            /** @var RecurrenceMeta|null $entry */
            $entry = $transaction->recurrenceTransactionMeta()->where('name', 'tags')->first();
            if (null === $entry) {
                $entry = RecurrenceTransactionMeta::create(['rt_id' => $transaction->id, 'name' => 'tags', 'value' => json_encode($tags)]);
            }
            $entry->value = json_encode($tags);
            $entry->save();
        }
        if (0 === count($tags)) {
            // delete if present
            $transaction->recurrenceTransactionMeta()->where('name', 'tags')->delete();
        }
    }

    /**
     * @param Recurrence $recurrence
     *
     * @codeCoverageIgnore
     */
    protected function deleteRepetitions(Recurrence $recurrence): void
    {
        $recurrence->recurrenceRepetitions()->delete();
    }

    /**
     * @param Recurrence $recurrence
     *
     * @codeCoverageIgnore
     */
    protected function deleteTransactions(Recurrence $recurrence): void
    {
        Log::debug('deleteTransactions()');
        /** @var RecurrenceTransaction $transaction */
        foreach ($recurrence->recurrenceTransactions as $transaction) {
            $transaction->recurrenceTransactionMeta()->delete();
            try {
                $transaction->delete();
            } catch (Exception $e) { // @phpstan-ignore-line
                // @ignoreException
            }
        }
    }
}
