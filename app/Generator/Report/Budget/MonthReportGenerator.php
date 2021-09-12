<?php
/**
 * MonthReportGenerator.php
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
/** @noinspection MultipleReturnStatementsInspection */
/** @noinspection PhpUndefinedMethodInspection */
declare(strict_types=1);

namespace FireflyIII\Generator\Report\Budget;

use Carbon\Carbon;
use FireflyIII\Generator\Report\ReportGeneratorInterface;
use FireflyIII\Generator\Report\Support;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Models\TransactionType;
use Illuminate\Support\Collection;
use Log;
use Throwable;

/**
 * Class MonthReportGenerator.
 *  TODO include info about tags.
 *
 * @codeCoverageIgnore
 */
class MonthReportGenerator implements ReportGeneratorInterface
{
    private Collection $accounts;
    private Collection $budgets;
    private Carbon     $end;
    private array      $expenses;
    private Carbon     $start;

    /**
     * MonthReportGenerator constructor.
     */
    public function __construct()
    {
        $this->expenses = [];
    }

    /**
     * Generates the report.
     *
     * @return string
     */
    public function generate(): string
    {
        $accountIds = implode(',', $this->accounts->pluck('id')->toArray());
        $budgetIds  = implode(',', $this->budgets->pluck('id')->toArray());
        try {
            $result = prefixView(
                'reports.budget.month',
                compact('accountIds', 'budgetIds')
            )
                ->with('start', $this->start)->with('end', $this->end)
                ->with('budgets', $this->budgets)
                ->with('accounts', $this->accounts)
                ->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::error(sprintf('Cannot render reports.account.report: %s', $e->getMessage()));
            $result = sprintf('Could not render report view: %s', $e->getMessage());
        }

        return $result;
    }

    /**
     * Set the involved accounts.
     *
     * @param Collection $accounts
     *
     * @return ReportGeneratorInterface
     */
    public function setAccounts(Collection $accounts): ReportGeneratorInterface
    {
        $this->accounts = $accounts;

        return $this;
    }

    /**
     * Set the involved budgets.
     *
     * @param Collection $budgets
     *
     * @return ReportGeneratorInterface
     */
    public function setBudgets(Collection $budgets): ReportGeneratorInterface
    {
        $this->budgets = $budgets;

        return $this;
    }

    /**
     * Unused category setter.
     *
     * @param Collection $categories
     *
     * @return ReportGeneratorInterface
     */
    public function setCategories(Collection $categories): ReportGeneratorInterface
    {
        return $this;
    }

    /**
     * Set the end date of the report.
     *
     * @param Carbon $date
     *
     * @return ReportGeneratorInterface
     */
    public function setEndDate(Carbon $date): ReportGeneratorInterface
    {
        $this->end = $date;

        return $this;
    }

    /**
     * Unused expense setter.
     *
     * @param Collection $expense
     *
     * @return ReportGeneratorInterface
     */
    public function setExpense(Collection $expense): ReportGeneratorInterface
    {
        return $this;
    }

    /**
     * Set the start date of the report.
     *
     * @param Carbon $date
     *
     * @return ReportGeneratorInterface
     */
    public function setStartDate(Carbon $date): ReportGeneratorInterface
    {
        $this->start = $date;

        return $this;
    }

    /**
     * Unused tags setter.
     *
     * @param Collection $tags
     *
     * @return ReportGeneratorInterface
     */
    public function setTags(Collection $tags): ReportGeneratorInterface
    {
        return $this;
    }

    /**
     * Get the expenses.
     *
     * @return array
     */
    protected function getExpenses(): array
    {
        if (count($this->expenses) > 0) {
            Log::debug('Return previous set of expenses.');

            return $this->expenses;
        }

        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setAccounts($this->accounts)->setRange($this->start, $this->end)
                  ->setTypes([TransactionType::WITHDRAWAL])
                  ->withAccountInformation()
                  ->withBudgetInformation()
                  ->setBudgets($this->budgets);

        $journals       = $collector->getExtractedJournals();
        $this->expenses = $journals;

        return $journals;
    }
}
