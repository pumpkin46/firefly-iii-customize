<?php
/**
 * TransactionCurrencyFactory.php
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

/** @noinspection PhpDynamicAsStaticMethodCallInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection MultipleReturnStatementsInspection */

declare(strict_types=1);

namespace FireflyIII\Factory;

use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\TransactionCurrency;
use Illuminate\Database\QueryException;
use Log;

/**
 * Class TransactionCurrencyFactory
 */
class TransactionCurrencyFactory
{
    /**
     * @param array $data
     *
     * @return TransactionCurrency
     * @throws FireflyException
     */
    public function create(array $data): TransactionCurrency
    {
        try {
            /** @var TransactionCurrency $result */
            $result = TransactionCurrency::create(
                [
                    'name'           => $data['name'],
                    'code'           => $data['code'],
                    'symbol'         => $data['symbol'],
                    'decimal_places' => $data['decimal_places'],
                    'enabled'        => $data['enabled'],
                ]
            );
        } catch (QueryException $e) {
            $result = null;
            Log::error(sprintf('Could not create new currency: %s', $e->getMessage()));
            throw new FireflyException('400004: Could not store new currency.', 0, $e);
        }

        return $result;
    }

    /**
     * @param int|null    $currencyId
     * @param null|string $currencyCode
     *
     * @return TransactionCurrency|null
     */
    public function find(?int $currencyId, ?string $currencyCode): ?TransactionCurrency
    {
        $currencyCode = (string)$currencyCode;
        $currencyId   = (int)$currencyId;

        if ('' === $currencyCode && 0 === $currencyId) {
            Log::debug('Cannot find anything on empty currency code and empty currency ID!');

            return null;
        }

        // first by ID:
        if ($currencyId > 0) {
            $currency = TransactionCurrency::find($currencyId);
            if (null !== $currency) {
                return $currency;
            }
            Log::warning(sprintf('Currency ID is %d but found nothing!', $currencyId));
        }
        // then by code:
        if ('' !== $currencyCode) {
            $currency = TransactionCurrency::whereCode($currencyCode)->first();
            if (null !== $currency) {
                return $currency;
            }
            Log::warning(sprintf('Currency code is %d but found nothing!', $currencyCode));
        }
        Log::warning('Found nothing for currency.');

        return null;
    }
}
