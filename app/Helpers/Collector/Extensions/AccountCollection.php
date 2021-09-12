<?php

/**
 * AccountCollection.php
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

namespace FireflyIII\Helpers\Collector\Extensions;

use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Support\Collection;

/**
 * Trait AccountCollection
 */
trait AccountCollection
{

    /**
     * These accounts must not be destination accounts.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function excludeDestinationAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->whereNotIn('destination.account_id', $accountIds);

            app('log')->debug(sprintf('GroupCollector: excludeDestinationAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * These accounts must not be source accounts.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function excludeSourceAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->whereNotIn('source.account_id', $accountIds);

            app('log')->debug(sprintf('GroupCollector: excludeSourceAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * Define which accounts can be part of the source and destination transactions.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function setAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->where(
                static function (EloquentBuilder $query) use ($accountIds) {
                    $query->whereIn('source.account_id', $accountIds);
                    $query->orWhereIn('destination.account_id', $accountIds);
                }
            );
            //app('log')->debug(sprintf('GroupCollector: setAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * Both source AND destination must be in this list of accounts.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function setBothAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->where(
                static function (EloquentBuilder $query) use ($accountIds) {
                    $query->whereIn('source.account_id', $accountIds);
                    $query->whereIn('destination.account_id', $accountIds);
                }
            );
            app('log')->debug(sprintf('GroupCollector: setBothAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * Define which accounts can be part of the source and destination transactions.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function setDestinationAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->whereIn('destination.account_id', $accountIds);

            app('log')->debug(sprintf('GroupCollector: setDestinationAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * Define which accounts can be part of the source and destination transactions.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function setSourceAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->whereIn('source.account_id', $accountIds);

            app('log')->debug(sprintf('GroupCollector: setSourceAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * Either account can be set, but NOT both. This effectively excludes internal transfers.
     *
     * @param Collection $accounts
     *
     * @return GroupCollectorInterface
     */
    public function setXorAccounts(Collection $accounts): GroupCollectorInterface
    {
        if ($accounts->count() > 0) {
            $accountIds = $accounts->pluck('id')->toArray();
            $this->query->where(
                static function (EloquentBuilder $q1) use ($accountIds) {
                    // sourceAccount is in the set, and destination is NOT.

                    $q1->where(
                        static function (EloquentBuilder $q2) use ($accountIds) {
                            $q2->whereIn('source.account_id', $accountIds);
                            $q2->whereNotIn('destination.account_id', $accountIds);
                        }
                    );
                    // destination is in the set, and source is NOT
                    $q1->orWhere(
                        static function (EloquentBuilder $q3) use ($accountIds) {
                            $q3->whereNotIn('source.account_id', $accountIds);
                            $q3->whereIn('destination.account_id', $accountIds);
                        }
                    );
                }
            );

            app('log')->debug(sprintf('GroupCollector: setXorAccounts: %s', implode(', ', $accountIds)));
        }

        return $this;
    }

    /**
     * Will include the source and destination account names and types.
     *
     * @return GroupCollectorInterface
     */
    public function withAccountInformation(): GroupCollectorInterface
    {
        if (false === $this->hasAccountInfo) {
            // join source account table
            $this->query->leftJoin('accounts as source_account', 'source_account.id', '=', 'source.account_id');
            // join source account type table
            $this->query->leftJoin('account_types as source_account_type', 'source_account_type.id', '=', 'source_account.account_type_id');

            // add source account fields:
            $this->fields[] = 'source_account.name as source_account_name';
            $this->fields[] = 'source_account.iban as source_account_iban';
            $this->fields[] = 'source_account_type.type as source_account_type';

            // same for dest
            $this->query->leftJoin('accounts as dest_account', 'dest_account.id', '=', 'destination.account_id');
            $this->query->leftJoin('account_types as dest_account_type', 'dest_account_type.id', '=', 'dest_account.account_type_id');

            // and add fields:
            $this->fields[]       = 'dest_account.name as destination_account_name';
            $this->fields[]       = 'dest_account.iban as destination_account_iban';
            $this->fields[]       = 'dest_account_type.type as destination_account_type';
            $this->hasAccountInfo = true;
        }

        return $this;
    }
}
