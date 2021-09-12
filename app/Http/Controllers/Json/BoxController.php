<?php
/**
 * BoxController.php
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

namespace FireflyIII\Http\Controllers\Json;

use Carbon\Carbon;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Helpers\Report\NetWorthInterface;
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Models\Account;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\AvailableBudget;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Models\TransactionType;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Budget\AvailableBudgetRepositoryInterface;
use FireflyIII\Repositories\Budget\OperationsRepositoryInterface;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Support\CacheProperties;
use Illuminate\Http\JsonResponse;
use Log;

/**
 * Class BoxController.
 */
class BoxController extends Controller
{
    /**
     * This box has three types of info to display:
     * 0) If the user has available amount this period and has overspent: overspent box.
     * 1) If the user has available amount this period and has NOT overspent: left to spend box.
     * 2) if the user has no available amount set this period: spent per day
     *
     * @return JsonResponse
     */
    public function available(): JsonResponse
    {
        /** @var OperationsRepositoryInterface $opsRepository */
        $opsRepository = app(OperationsRepositoryInterface::class);
        /** @var AvailableBudgetRepositoryInterface $abRepository */
        $abRepository = app(AvailableBudgetRepositoryInterface::class);
        /** @var Carbon $start */
        $start = session('start', Carbon::now()->startOfMonth());
        /** @var Carbon $end */
        $end      = session('end', Carbon::now()->endOfMonth());
        $today    = today(config('app.timezone'));
        $display  = 2; // see method docs.
        $boxTitle = (string)trans('firefly.spent');

        $cache = new CacheProperties;
        $cache->addProperty($start);
        $cache->addProperty($end);
        $cache->addProperty($today);
        $cache->addProperty('box-available');
        if ($cache->has()) {
            return response()->json($cache->get()); 
        }
        $leftPerDayAmount  = '0';
        $leftToSpendAmount = '0';

        $currency         = app('amount')->getDefaultCurrency();
        $availableBudgets = $abRepository->getAvailableBudgetsByDate($start, $end);
        $availableBudgets = $availableBudgets->filter(
            static function (AvailableBudget $availableBudget) use ($currency) {
                if ($availableBudget->transaction_currency_id === $currency->id) {
                    return $availableBudget;
                }

                return null;
            }
        );
        // spent in this period, in budgets, for default currency.
        // also calculate spent per day.
        $spent       = $opsRepository->sumExpenses($start, $end, null, null, $currency);
        $spentAmount = $spent[(int)$currency->id]['sum'] ?? '0';

        $days        = $today->between($start, $end) ? $today->diffInDays($start) + 1 : $end->diffInDays($start) + 1;
        $spentPerDay = bcdiv($spentAmount, (string)$days);
        if ($availableBudgets->count() > 0) {
            $display           = 0; // assume user overspent
            $boxTitle          = (string)trans('firefly.overspent');
            $totalAvailableSum = (string)$availableBudgets->sum('amount');
            // calculate with available budget.
            $leftToSpendAmount = bcadd($totalAvailableSum, $spentAmount);
            if (1 === bccomp($leftToSpendAmount, '0')) {
                $boxTitle         = (string)trans('firefly.left_to_spend');
                $days             = $today->diffInDays($end) + 1;
                $display          = 1; // not overspent
                $leftPerDayAmount = bcdiv($leftToSpendAmount, (string)$days);
            }
        }

        $return = [
            'display'       => $display,
            'spent_total'   => app('amount')->formatAnything($currency, $spentAmount, false),
            'spent_per_day' => app('amount')->formatAnything($currency, $spentPerDay, false),
            'left_to_spend' => app('amount')->formatAnything($currency, $leftToSpendAmount, false),
            'left_per_day'  => app('amount')->formatAnything($currency, $leftPerDayAmount, false),
            'title'         => $boxTitle,
        ];

        $cache->store($return);

        return response()->json($return);
    }

    /**
     * Current total balance.
     *
     * @param CurrencyRepositoryInterface $repository
     *
     * @return JsonResponse
     */
    public function balance(CurrencyRepositoryInterface $repository): JsonResponse
    {
        // Cache result, return cache if present.
        /** @var Carbon $start */
        $start = session('start', Carbon::now()->startOfMonth());
        /** @var Carbon $end */
        $end   = session('end', Carbon::now()->endOfMonth());
        $cache = new CacheProperties;
        $cache->addProperty($start);
        $cache->addProperty($end);
        $cache->addProperty('box-balance');
        if ($cache->has()) {
            return response()->json($cache->get()); 
        }
        // prep some arrays:
        $incomes  = [];
        $expenses = [];
        $sums     = [];
        $currency = app('amount')->getDefaultCurrency();

        // collect income of user:
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setRange($start, $end)
                  ->setTypes([TransactionType::DEPOSIT]);
        $set = $collector->getExtractedJournals();
        /** @var array $journal */
        foreach ($set as $journal) {
            $currencyId           = (int)$journal['currency_id'];
            $amount               = $journal['amount'] ?? '0';
            $incomes[$currencyId] = $incomes[$currencyId] ?? '0';
            $incomes[$currencyId] = bcadd($incomes[$currencyId], app('steam')->positive($amount));
            $sums[$currencyId]    = $sums[$currencyId] ?? '0';
            $sums[$currencyId]    = bcadd($sums[$currencyId], app('steam')->positive($amount));
        }

        // collect expenses
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setRange($start, $end)
                  ->setTypes([TransactionType::WITHDRAWAL]);
        $set = $collector->getExtractedJournals();
        /** @var array $journal */
        foreach ($set as $journal) {
            $currencyId            = (int)$journal['currency_id'];
            $expenses[$currencyId] = $expenses[$currencyId] ?? '0';
            $expenses[$currencyId] = bcadd($expenses[$currencyId], $journal['amount'] ?? '0');
            $sums[$currencyId]     = $sums[$currencyId] ?? '0';
            $sums[$currencyId]     = bcadd($sums[$currencyId], $journal['amount']);
        }

        // format amounts:
        $keys = array_keys($sums);
        foreach ($keys as $currencyId) {
            $currency              = $repository->findNull($currencyId);
            $sums[$currencyId]     = app('amount')->formatAnything($currency, $sums[$currencyId], false);
            $incomes[$currencyId]  = app('amount')->formatAnything($currency, $incomes[$currencyId] ?? '0', false);
            $expenses[$currencyId] = app('amount')->formatAnything($currency, $expenses[$currencyId] ?? '0', false);
        }
        if (0===count($sums)) {
            $currency                = app('amount')->getDefaultCurrency();
            $sums[$currency->id]     = app('amount')->formatAnything($currency, '0', false);
            $incomes[$currency->id]  = app('amount')->formatAnything($currency, '0', false);
            $expenses[$currency->id] = app('amount')->formatAnything($currency, '0', false);
        }

        $response = [
            'incomes'   => $incomes,
            'expenses'  => $expenses,
            'sums'      => $sums,
            'size'      => count($sums),
            'preferred' => $currency->id,
        ];
        $cache->store($response);

        return response()->json($response);
    }

    /**
     * Total user net worth.
     *
     * @return JsonResponse
     */
    public function netWorth(): JsonResponse
    {
        $date = Carbon::now()->endOfDay();

        // start and end in the future? use $end
        if ($this->notInSessionRange($date)) {
            /** @var Carbon $date */
            $date = session('end', Carbon::now()->endOfMonth());
        }

        /** @var NetWorthInterface $netWorthHelper */
        $netWorthHelper = app(NetWorthInterface::class);
        $netWorthHelper->setUser(auth()->user());

        /** @var AccountRepositoryInterface $accountRepository */
        $accountRepository = app(AccountRepositoryInterface::class);
        $allAccounts       = $accountRepository->getActiveAccountsByType(
            [AccountType::DEFAULT, AccountType::ASSET, AccountType::DEBT, AccountType::LOAN, AccountType::MORTGAGE, AccountType::CREDITCARD]
        );
        Log::debug(sprintf('Found %d accounts.', $allAccounts->count()));

        // filter list on preference of being included.
        $filtered = $allAccounts->filter(
            function (Account $account) use ($accountRepository) {
                $includeNetWorth = $accountRepository->getMetaValue($account, 'include_net_worth');
                $result          = null === $includeNetWorth ? true : '1' === $includeNetWorth;
                if (false === $result) {
                    Log::debug(sprintf('Will not include "%s" in net worth charts.', $account->name));
                }

                return $result;
            }
        );

        $netWorthSet = $netWorthHelper->getNetWorthByCurrency($filtered, $date);
        $return      = [];
        foreach ($netWorthSet as $data) {
            /** @var TransactionCurrency $currency */
            $currency              = $data['currency'];
            $return[$currency->id] = app('amount')->formatAnything($currency, $data['balance'], false);
        }
        $return = [
            'net_worths' => array_values($return),
        ];

        return response()->json($return);
    }

}
