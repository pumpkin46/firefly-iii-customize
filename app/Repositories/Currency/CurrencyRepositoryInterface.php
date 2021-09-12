<?php
/**
 * CurrencyRepositoryInterface.php
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

namespace FireflyIII\Repositories\Currency;

use Carbon\Carbon;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\CurrencyExchangeRate;
use FireflyIII\Models\Preference;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\User;
use Illuminate\Support\Collection;

/**
 * Interface CurrencyRepositoryInterface.
 */
interface CurrencyRepositoryInterface
{

    /**
     * @param TransactionCurrency $currency
     *
     * @return int
     */
    public function countJournals(TransactionCurrency $currency): int;

    /**
     * @param TransactionCurrency $currency
     *
     * @return bool
     */
    public function currencyInUse(TransactionCurrency $currency): bool;

    /**
     * Currency is in use where exactly.
     *
     * @param TransactionCurrency $currency
     *
     * @return string|null
     */
    public function currencyInUseAt(TransactionCurrency $currency): ?string;

    /**
     * @param TransactionCurrency $currency
     *
     * @return bool
     */
    public function destroy(TransactionCurrency $currency): bool;

    /**
     * Disables a currency
     *
     * @param TransactionCurrency $currency
     */
    public function disable(TransactionCurrency $currency): void;

    /**
     * Enables a currency
     *
     * @param TransactionCurrency $currency
     */
    public function enable(TransactionCurrency $currency): void;

    /**
     * Find by ID, return NULL if not found.
     *
     * @param int $currencyId
     *
     * @return TransactionCurrency|null
     */
    public function find(int $currencyId): ?TransactionCurrency;

    /**
     * Find by currency code, return NULL if unfound.
     *
     * @param string $currencyCode
     *
     * @return TransactionCurrency|null
     */
    public function findByCode(string $currencyCode): ?TransactionCurrency;

    /**
     * Find by currency code, return NULL if unfound.
     *
     * @param string $currencyCode
     *
     * @return TransactionCurrency|null
     */
    public function findByCodeNull(string $currencyCode): ?TransactionCurrency;

    /**
     * Find by currency name.
     *
     * @param string $currencyName
     *
     * @return TransactionCurrency
     */
    public function findByName(string $currencyName): ?TransactionCurrency;

    /**
     * Find by currency name.
     *
     * @param string $currencyName
     *
     * @return TransactionCurrency
     */
    public function findByNameNull(string $currencyName): ?TransactionCurrency;

    /**
     * Find by currency symbol.
     *
     * @param string $currencySymbol
     *
     * @return TransactionCurrency
     */
    public function findBySymbol(string $currencySymbol): ?TransactionCurrency;

    /**
     * Find by currency symbol.
     *
     * @param string $currencySymbol
     *
     * @return TransactionCurrency
     */
    public function findBySymbolNull(string $currencySymbol): ?TransactionCurrency;

    /**
     * Find by object, ID or code. Returns user default or system default.
     *
     * @param int|null    $currencyId
     * @param string|null $currencyCode
     *
     * @return TransactionCurrency
     */
    public function findCurrency(?int $currencyId, ?string $currencyCode): TransactionCurrency;

    /**
     * Find by object, ID or code. Returns NULL if nothing found.
     *
     * @param int|null    $currencyId
     * @param string|null $currencyCode
     *
     * @return TransactionCurrency|null
     */
    public function findCurrencyNull(?int $currencyId, ?string $currencyCode): ?TransactionCurrency;

    /**
     * Find by ID, return NULL if not found.
     *
     * @param int $currencyId
     *
     * @return TransactionCurrency|null
     */
    public function findNull(int $currencyId): ?TransactionCurrency;

    /**
     * @return Collection
     */
    public function get(): Collection;

    /**
     * @return Collection
     */
    public function getAll(): Collection;

    /**
     * @param array $ids
     *
     * @return Collection
     */
    public function getByIds(array $ids): Collection;

    /**
     * @param Preference $preference
     *
     * @return TransactionCurrency
     */
    public function getCurrencyByPreference(Preference $preference): TransactionCurrency;

    /**
     * Get currency exchange rate.
     *
     * @param TransactionCurrency $fromCurrency
     * @param TransactionCurrency $toCurrency
     * @param Carbon              $date
     *
     * @return CurrencyExchangeRate|null
     */
    public function getExchangeRate(TransactionCurrency $fromCurrency, TransactionCurrency $toCurrency, Carbon $date): ?CurrencyExchangeRate;

    /**
     * @param TransactionCurrency $currency
     *
     * @return bool
     */
    public function isFallbackCurrency(TransactionCurrency $currency): bool;

    /**
     * @param string $search
     * @param int    $limit
     *
     * @return Collection
     */
    public function searchCurrency(string $search, int $limit): Collection;

    /**
     * @param User $user
     */
    public function setUser(User $user);

    /**
     * @param array $data
     *
     * @return TransactionCurrency
     * @throws FireflyException
     */
    public function store(array $data): TransactionCurrency;

    /**
     * @param TransactionCurrency $currency
     * @param array               $data
     *
     * @return TransactionCurrency
     */
    public function update(TransactionCurrency $currency, array $data): TransactionCurrency;
}
