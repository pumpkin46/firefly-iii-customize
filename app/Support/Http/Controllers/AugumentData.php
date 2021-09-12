<?php
/**
 * AugumentData.php
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

namespace FireflyIII\Support\Http\Controllers;

use Carbon\Carbon;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Models\Account;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\Budget;
use FireflyIII\Models\BudgetLimit;
use FireflyIII\Models\TransactionType;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Budget\BudgetLimitRepositoryInterface;
use FireflyIII\Repositories\Budget\BudgetRepositoryInterface;
use FireflyIII\Repositories\Budget\OperationsRepositoryInterface;
use FireflyIII\Repositories\Category\CategoryRepositoryInterface;
use FireflyIII\Support\CacheProperties;
use Illuminate\Support\Collection;

/**
 * Trait AugumentData
 *
 */
trait AugumentData
{
    /**
     * Searches for the opposing account.
     *
     * @param Collection $accounts
     *
     * @return array
     */
    protected function combineAccounts(Collection $accounts): array // filter + group data
    {
        /** @var AccountRepositoryInterface $repository */
        $repository = app(AccountRepositoryInterface::class);
        $combined   = [];
        /** @var Account $expenseAccount */
        foreach ($accounts as $expenseAccount) {
            $collection = new Collection;
            $collection->push($expenseAccount);

            $revenue = $repository->findByName($expenseAccount->name, [AccountType::REVENUE]);
            if (null !== $revenue) {
                $collection->push($revenue);
            }
            $combined[$expenseAccount->name] = $collection;
        }

        return $combined;
    }

    /**
     * Small helper function for the revenue and expense account charts.
     *
     * @param array $names
     *
     * @return array
     */
    protected function expandNames(array $names): array
    {
        $result = [];
        foreach ($names as $entry) {
            $result[$entry['name']] = 0;
        }

        return $result;
    }

    /**
     * Small helper function for the revenue and expense account charts.
     *
     * @param Collection $accounts
     *
     * @return array
     */
    protected function extractNames(Collection $accounts): array
    {
        $return = [];
        /** @var Account $account */
        foreach ($accounts as $account) {
            $return[$account->id] = $account->name;
        }

        return $return;
    }

    /**
     * Get the account names belonging to a bunch of account ID's.
     *
     * @param array $accountIds
     *
     * @return array
     */
    protected function getAccountNames(array $accountIds): array // extract info from array.
    {
        /** @var AccountRepositoryInterface $repository */
        $repository = app(AccountRepositoryInterface::class);
        $accounts   = $repository->getAccountsByType([AccountType::ASSET, AccountType::DEFAULT, AccountType::EXPENSE, AccountType::CASH]);
        $grouped    = $accounts->groupBy('id')->toArray();
        $return     = [];
        foreach ($accountIds as $combinedId) {
            $parts     = explode('-', $combinedId);
            $accountId = (int)$parts[0];
            if (array_key_exists($accountId, $grouped)) {
                $return[$accountId] = $grouped[$accountId][0]['name'];
            }
        }
        $return[0] = '(no name)';

        return $return;
    }

    /**
     * Get the budget names from a set of budget ID's.
     *
     * @param array $budgetIds
     *
     * @return array
     */
    protected function getBudgetNames(array $budgetIds): array // extract info from array.
    {
        /** @var BudgetRepositoryInterface $repository */
        $repository = app(BudgetRepositoryInterface::class);
        $budgets    = $repository->getBudgets();
        $grouped    = $budgets->groupBy('id')->toArray();
        $return     = [];
        foreach ($budgetIds as $budgetId) {
            if (array_key_exists($budgetId, $grouped)) {
                $return[$budgetId] = $grouped[$budgetId][0]['name'];
            }
        }
        $return[0] = (string)trans('firefly.no_budget');

        return $return;
    }

    /**
     * Get the category names from a set of category ID's. Small helper function for some of the charts.
     *
     * @param array $categoryIds
     *
     * @return array
     */
    protected function getCategoryNames(array $categoryIds): array // extract info from array.
    {
        /** @var CategoryRepositoryInterface $repository */
        $repository = app(CategoryRepositoryInterface::class);
        $categories = $repository->getCategories();
        $grouped    = $categories->groupBy('id')->toArray();
        $return     = [];
        foreach ($categoryIds as $combinedId) {
            $parts      = explode('-', $combinedId);
            $categoryId = (int)$parts[0];
            if (array_key_exists($categoryId, $grouped)) {
                $return[$categoryId] = $grouped[$categoryId][0]['name'];
            }
        }
        $return[0] = (string)trans('firefly.no_category');

        return $return;
    }

    /**
     * Gets all budget limits for a budget.
     *
     * @param Budget $budget
     * @param Carbon $start
     * @param Carbon $end
     *
     * @return Collection
     */
    protected function getLimits(Budget $budget, Carbon $start, Carbon $end): Collection // get data + augment with info
    {
        /** @var OperationsRepositoryInterface $opsRepository */
        $opsRepository = app(OperationsRepositoryInterface::class);

        /** @var BudgetLimitRepositoryInterface $blRepository */
        $blRepository = app(BudgetLimitRepositoryInterface::class);
        // properties for cache
        $cache = new CacheProperties;
        $cache->addProperty($start);
        $cache->addProperty($end);
        $cache->addProperty($budget->id);
        $cache->addProperty('get-limits');

        if ($cache->has()) {
            return $cache->get(); 
        }

        $set              = $blRepository->getBudgetLimits($budget, $start, $end);
        $limits           = new Collection();
        $budgetCollection = new Collection([$budget]);

        /** @var BudgetLimit $entry */
        foreach ($set as $entry) {
            $currency = $entry->transactionCurrency;
            // clone because these objects change each other.
            $currentStart = clone $entry->start_date;
            $currentEnd   = clone $entry->end_date;
            $expenses     = $opsRepository->sumExpenses($currentStart, $currentEnd, null, $budgetCollection, $currency);
            $spent        = $expenses[(int)$currency->id]['sum'] ?? '0';
            $entry->spent = $spent;

            $limits->push($entry);
        }
        $cache->store($limits);

        return $set;
    }

    /**
     * Group set of transactions by name of opposing account.
     *
     * @param array $array
     *
     * @return array
     */
    protected function groupByName(array $array): array // filter + group data
    {

        // group by opposing account name.
        $grouped = [];
        /** @var array $journal */
        foreach ($array as $journal) {
            $name = '(no name)';
            if (TransactionType::WITHDRAWAL === $journal['transaction_type_type']) {
                $name = $journal['destination_account_name'];
            }
            if (TransactionType::WITHDRAWAL !== $journal['transaction_type_type']) {
                $name = $journal['source_account_name'];
            }

            $grouped[$name] = $grouped[$name] ?? '0';
            $grouped[$name] = bcadd($journal['amount'], $grouped[$name]);
        }

        return $grouped;
    }

    /**
     * Spent in a period.
     *
     * @param Collection $assets
     * @param Collection $opposing
     * @param Carbon     $start
     * @param Carbon     $end
     *
     * @return array
     */
    protected function spentInPeriod(Collection $assets, Collection $opposing, Carbon $start, Carbon $end): array // get data + augment with info
    {
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);

        $total = $assets->merge($opposing);
        $collector->setRange($start, $end)->setTypes([TransactionType::WITHDRAWAL])->setAccounts($total);
        $journals = $collector->getExtractedJournals();
        $sum      = [
            'grand_sum'    => '0',
            'per_currency' => [],
        ];
        // loop to support multi currency
        foreach ($journals as $journal) {
            $currencyId = (int)$journal['currency_id'];

            // if not set, set to zero:
            if (!array_key_exists($currencyId, $sum['per_currency'])) {
                $sum['per_currency'][$currencyId] = [
                    'sum'      => '0',
                    'currency' => [
                        'name'           => $journal['currency_name'],
                        'symbol'         => $journal['currency_symbol'],
                        'decimal_places' => $journal['currency_decimal_places'],
                    ],
                ];
            }

            // add amount
            $sum['per_currency'][$currencyId]['sum'] = bcadd($sum['per_currency'][$currencyId]['sum'], $journal['amount']);
            $sum['grand_sum']                        = bcadd($sum['grand_sum'], $journal['amount']);
        }

        return $sum;
    }
}
