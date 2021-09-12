<?php
/**
 * BudgetLimitRepositoryInterface.php
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

namespace FireflyIII\Repositories\Budget;

use Carbon\Carbon;
use FireflyIII\Models\Budget;
use FireflyIII\Models\BudgetLimit;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\User;
use Illuminate\Support\Collection;

/**
 * Interface BudgetLimitRepositoryInterface
 */
interface BudgetLimitRepositoryInterface
{

    /**
     * Tells you which amount has been budgeted (for the given budgets)
     * in the selected query. Returns a positive amount as a string.
     *
     * @param Carbon              $start
     * @param Carbon              $end
     * @param TransactionCurrency $currency
     * @param Collection|null     $budgets
     *
     * @return string
     */
    public function budgeted(Carbon $start, Carbon $end, TransactionCurrency $currency, ?Collection $budgets = null): string;

    /**
     * Destroy all budget limits.
     */
    public function destroyAll(): void;

    /**
     * Destroy a budget limit.
     *
     * @param BudgetLimit $budgetLimit
     */
    public function destroyBudgetLimit(BudgetLimit $budgetLimit): void;

    /**
     * @param Budget              $budget
     * @param TransactionCurrency $currency
     * @param Carbon              $start
     * @param Carbon              $end
     *
     * @return BudgetLimit|null
     */
    public function find(Budget $budget, TransactionCurrency $currency, Carbon $start, Carbon $end): ?BudgetLimit;

    /**
     * TODO this method is not multi-currency aware.
     *
     * @param Carbon $start
     * @param Carbon $end
     *
     * @return Collection
     */
    public function getAllBudgetLimits(Carbon $start = null, Carbon $end = null): Collection;

    /**
     * @param TransactionCurrency $currency
     * @param Carbon              $start
     * @param Carbon              $end
     *
     * @return Collection
     */
    public function getAllBudgetLimitsByCurrency(TransactionCurrency $currency, Carbon $start = null, Carbon $end = null): Collection;

    /**
     * @param Budget $budget
     * @param Carbon $start
     * @param Carbon $end
     *
     * @return Collection
     */
    public function getBudgetLimits(Budget $budget, Carbon $start = null, Carbon $end = null): Collection;

    /**
     * @param User $user
     */
    public function setUser(User $user): void;

    /**
     * @param array $data
     *
     * @return BudgetLimit
     */
    public function store(array $data): BudgetLimit;

    /**
     * @param BudgetLimit $budgetLimit
     * @param array       $data
     *
     * @return BudgetLimit
     */
    public function update(BudgetLimit $budgetLimit, array $data): BudgetLimit;

    /**
     * @param Budget $budget
     * @param Carbon $start
     * @param Carbon $end
     * @param string $amount
     *
     * @return BudgetLimit|null
     */
    public function updateLimitAmount(Budget $budget, Carbon $start, Carbon $end, string $amount): ?BudgetLimit;

}
