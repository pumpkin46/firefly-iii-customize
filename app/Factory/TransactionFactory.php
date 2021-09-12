<?php

/**
 * TransactionFactory.php
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

namespace FireflyIII\Factory;

use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\Account;
use FireflyIII\Models\Transaction;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\User;
use Illuminate\Database\QueryException;
use Log;

/**
 * Class TransactionFactory
 */
class TransactionFactory
{
    private Account              $account;
    private TransactionCurrency  $currency;
    private ?TransactionCurrency $foreignCurrency;
    private TransactionJournal   $journal;
    private bool                 $reconciled;
    private User                 $user;

    /**
     * Constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        $this->reconciled = false;
    }

    /**
     * Create transaction with negative amount (for source accounts).
     *
     * @param string      $amount
     * @param string|null $foreignAmount
     *
     * @return Transaction
     * @throws FireflyException
     */
    public function createNegative(string $amount, ?string $foreignAmount): Transaction
    {
        if ('' === $foreignAmount) {
            $foreignAmount = null;
        }
        if (null !== $foreignAmount) {
            $foreignAmount = app('steam')->negative($foreignAmount);
        }

        return $this->create(app('steam')->negative($amount), $foreignAmount);
    }

    /**
     * @param string      $amount
     * @param string|null $foreignAmount
     *
     * @return Transaction
     * @throws FireflyException
     */
    private function create(string $amount, ?string $foreignAmount): Transaction
    {
        $result = null;
        if ('' === $foreignAmount) {
            $foreignAmount = null;
        }
        $data = [
            'reconciled'              => $this->reconciled,
            'account_id'              => $this->account->id,
            'transaction_journal_id'  => $this->journal->id,
            'description'             => null,
            'transaction_currency_id' => $this->currency->id,
            'amount'                  => $amount,
            'foreign_amount'          => null,
            'foreign_currency_id'     => null,
            'identifier'              => 0,
        ];
        try {
            $result = Transaction::create($data);

        } catch (QueryException $e) {
            Log::error(sprintf('Could not create transaction: %s', $e->getMessage()), $data);
            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());
            throw new FireflyException('Query exception when creating transaction.', 0, $e);
        }
        if (null === $result) {
            throw new FireflyException('Transaction is NULL.');
        }

        if (null !== $result) {
            Log::debug(
                sprintf(
                    'Created transaction #%d (%s %s, account %s), part of journal #%d',
                    $result->id,
                    $this->currency->code,
                    $amount,
                    $this->account->name,
                    $this->journal->id
                )
            );

            // do foreign currency thing: add foreign currency info to $one and $two if necessary.
            if (null !== $this->foreignCurrency && null !== $foreignAmount && $this->foreignCurrency->id !== $this->currency->id && '' !== $foreignAmount) {
                $result->foreign_currency_id = $this->foreignCurrency->id;
                $result->foreign_amount      = $foreignAmount;
            }
            $result->save();
        }

        return $result;
    }

    /**
     * Create transaction with positive amount (for destination accounts).
     *
     * @param string      $amount
     * @param string|null $foreignAmount
     *
     * @return Transaction
     * @throws FireflyException
     */
    public function createPositive(string $amount, ?string $foreignAmount): Transaction
    {
        if ('' === $foreignAmount) {
            $foreignAmount = null;
        }
        if (null !== $foreignAmount) {
            $foreignAmount = app('steam')->positive($foreignAmount);
        }

        return $this->create(app('steam')->positive($amount), $foreignAmount);
    }

    /**
     * @param Account $account
     *
     * @codeCoverageIgnore
     */
    public function setAccount(Account $account): void
    {
        $this->account = $account;
    }

    /**
     * @param TransactionCurrency $currency
     *
     * @codeCoverageIgnore
     */
    public function setCurrency(TransactionCurrency $currency): void
    {
        $this->currency = $currency;
    }

    /**
     * @param TransactionCurrency $foreignCurrency |null
     *
     * @codeCoverageIgnore
     */
    public function setForeignCurrency(?TransactionCurrency $foreignCurrency): void
    {
        $this->foreignCurrency = $foreignCurrency;
    }

    /**
     * @param TransactionJournal $journal
     *
     * @codeCoverageIgnore
     */
    public function setJournal(TransactionJournal $journal): void
    {
        $this->journal = $journal;
    }

    /**
     * @param bool $reconciled
     *
     * @codeCoverageIgnore
     */
    public function setReconciled(bool $reconciled): void
    {
        $this->reconciled = $reconciled;
    }

    /**
     * @param User $user
     *
     * @codeCoverageIgnore
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }
}
