<?php
/**
 * NetWorth.php
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

namespace FireflyIII\Helpers\Report;

use Carbon\Carbon;
use FireflyIII\Models\Account;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Support\CacheProperties;
use FireflyIII\User;
use Illuminate\Support\Collection;
use Log;

/**
 *
 * Class NetWorth
 */
class NetWorth implements NetWorthInterface
{

    /** @var AccountRepositoryInterface */
    private $accountRepository;

    /** @var CurrencyRepositoryInterface */
    private $currencyRepos;
    /** @var User */
    private $user;

    /**
     * Returns the user's net worth in an array with the following layout:
     *
     * -
     *  - currency: TransactionCurrency object
     *  - date: the current date
     *  - amount: the user's net worth in that currency.
     *
     * This repeats for each currency the user has transactions in.
     * Result of this method is cached.
     *
     * @param Collection $accounts
     * @param Carbon     $date
     *
     * @return array
     */
    public function getNetWorthByCurrency(Collection $accounts, Carbon $date): array
    {

        // start in the past, end in the future? use $date
        $cache = new CacheProperties;
        $cache->addProperty($date);
        $cache->addProperty('net-worth-by-currency');
        $cache->addProperty(implode(',', $accounts->pluck('id')->toArray()));
        if ($cache->has()) {
            return $cache->get(); 
        }

        $netWorth = [];
        $result   = [];
        Log::debug(sprintf('Now in getNetWorthByCurrency(%s)', $date->format('Y-m-d')));

        // get default currency
        $default = app('amount')->getDefaultCurrencyByUser($this->user);

        // get all balances:
        $balances = app('steam')->balancesByAccounts($accounts, $date);

        // get the preferred currency for this account
        /** @var Account $account */
        foreach ($accounts as $account) {
            Log::debug(sprintf('Now at account #%d: "%s"', $account->id, $account->name));
            $currencyId = (int)$this->accountRepository->getMetaValue($account, 'currency_id');
            $currencyId = 0 === $currencyId ? $default->id : $currencyId;

            Log::debug(sprintf('Currency ID is #%d', $currencyId));

            // balance in array:
            $balance = $balances[$account->id] ?? '0';

            Log::debug(sprintf('Balance is %s', $balance));

            // always subtract virtual balance.
            $virtualBalance = (string)$account->virtual_balance;
            if ('' !== $virtualBalance) {
                $balance = bcsub($balance, $virtualBalance);
            }

            Log::debug(sprintf('Balance corrected to %s because of virtual balance (%s)', $balance, $virtualBalance));

            if (!array_key_exists($currencyId, $netWorth)) {
                $netWorth[$currencyId] = '0';
            }
            $netWorth[$currencyId] = bcadd($balance, $netWorth[$currencyId]);

            Log::debug(sprintf('Total net worth for currency #%d is %s', $currencyId, $netWorth[$currencyId]));
        }
        ksort($netWorth);

        // loop results and add currency information:
        foreach ($netWorth as $currencyId => $balance) {
            $result[] = [
                'currency' => $this->currencyRepos->findNull($currencyId),
                'balance'  => $balance,
            ];
        }
        $cache->store($result);

        return $result;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;

        // make repository:
        $this->accountRepository = app(AccountRepositoryInterface::class);
        $this->accountRepository->setUser($this->user);

        $this->currencyRepos = app(CurrencyRepositoryInterface::class);
        $this->currencyRepos->setUser($this->user);
    }
}
