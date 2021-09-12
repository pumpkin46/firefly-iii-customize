<?php
/**
 * ShowController.php
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

namespace FireflyIII\Http\Controllers\Budget;

use Carbon\Carbon;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Models\Budget;
use FireflyIII\Models\BudgetLimit;
use FireflyIII\Models\TransactionType;
use FireflyIII\Repositories\Budget\BudgetRepositoryInterface;
use FireflyIII\Repositories\Journal\JournalRepositoryInterface;
use FireflyIII\Support\Http\Controllers\AugumentData;
use FireflyIII\Support\Http\Controllers\PeriodOverview;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 *
 * Class ShowController
 */
class ShowController extends Controller
{
    use PeriodOverview, AugumentData;

    protected JournalRepositoryInterface $journalRepos;
    private BudgetRepositoryInterface  $repository;

    /**
     * ShowController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        app('view')->share('showCategory', true);
        parent::__construct();
        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.budgets'));
                app('view')->share('mainTitleIcon', 'fa-pie-chart');
                $this->journalRepos = app(JournalRepositoryInterface::class);
                $this->repository   = app(BudgetRepositoryInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Show transactions without a budget.
     *
     * @param Request     $request
     * @param Carbon|null $start
     * @param Carbon|null $end
     *
     * @return Factory|View
     */
    public function noBudget(Request $request, Carbon $start = null, Carbon $end = null)
    {
        /** @var Carbon $start */
        $start = $start ?? session('start');
        /** @var Carbon $end */
        $end      = $end ?? session('end');
        $subTitle = trans(
            'firefly.without_budget_between',
            ['start' => $start->formatLocalized($this->monthAndDayFormat), 'end' => $end->formatLocalized($this->monthAndDayFormat)]
        );

        // get first journal ever to set off the budget period overview.
        $first     = $this->journalRepos->firstNull();
        $firstDate = null !== $first ? $first->date : $start;
        $periods   = $this->getNoBudgetPeriodOverview($firstDate, $end);
        $page      = (int)$request->get('page');
        $pageSize  = (int)app('preferences')->get('listPageSize', 50)->data;

        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setRange($start, $end)->setTypes([TransactionType::WITHDRAWAL])->setLimit($pageSize)->setPage($page)
                  ->withoutBudget()->withAccountInformation()->withCategoryInformation();
        $groups = $collector->getPaginatedGroups();
        $groups->setPath(route('budgets.no-budget'));

        return prefixView('budgets.no-budget', compact('groups', 'subTitle', 'periods', 'start', 'end'));
    }

    /**
     * Shows ALL transactions without a budget.
     *
     * @param Request $request
     *
     * @return Factory|View
     */
    public function noBudgetAll(Request $request)
    {

        $subTitle = (string)trans('firefly.all_journals_without_budget');
        $first    = $this->journalRepos->firstNull();
        $start    = null === $first ? new Carbon : $first->date;
        $end      = today(config('app.timezone'));
        $page     = (int)$request->get('page');
        $pageSize = (int)app('preferences')->get('listPageSize', 50)->data;

        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setRange($start, $end)->setTypes([TransactionType::WITHDRAWAL])->setLimit($pageSize)->setPage($page)
                  ->withoutBudget()->withAccountInformation()->withCategoryInformation();
        $groups = $collector->getPaginatedGroups();
        $groups->setPath(route('budgets.no-budget'));

        return prefixView('budgets.no-budget', compact('groups', 'subTitle', 'start', 'end'));
    }

    /**
     * Show a single budget.
     *
     * @param Request $request
     * @param Budget  $budget
     *
     * @return Factory|View
     */
    public function show(Request $request, Budget $budget)
    {
        /** @var Carbon $allStart */
        $allStart    = session('first', Carbon::now()->startOfYear());
        $allEnd      = today();
        $page        = (int)$request->get('page');
        $pageSize    = (int)app('preferences')->get('listPageSize', 50)->data;
        $limits      = $this->getLimits($budget, $allStart, $allEnd);
        $repetition  = null;
        $attachments = $this->repository->getAttachments($budget);

        // collector:
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setRange($allStart, $allEnd)->setBudget($budget)
                  ->withAccountInformation()
                  ->setLimit($pageSize)->setPage($page)->withBudgetInformation()->withCategoryInformation();
        $groups = $collector->getPaginatedGroups();
        $groups->setPath(route('budgets.show', [$budget->id]));

        $subTitle = (string)trans('firefly.all_journals_for_budget', ['name' => $budget->name]);

        return prefixView('budgets.show', compact('limits', 'attachments', 'budget', 'repetition', 'groups', 'subTitle'));
    }

    /**
     * Show a single budget by a budget limit.
     *
     * @param Request     $request
     * @param Budget      $budget
     * @param BudgetLimit $budgetLimit
     *
     * @return Factory|View
     * @throws FireflyException
     */
    public function showByBudgetLimit(Request $request, Budget $budget, BudgetLimit $budgetLimit)
    {
        if ($budgetLimit->budget->id !== $budget->id) {
            throw new FireflyException('This budget limit is not part of this budget.'); 
        }

        $page     = (int)$request->get('page');
        $pageSize = (int)app('preferences')->get('listPageSize', 50)->data;
        $subTitle = trans(
            'firefly.budget_in_period',
            [
                'name'     => $budget->name,
                'start'    => $budgetLimit->start_date->formatLocalized($this->monthAndDayFormat),
                'end'      => $budgetLimit->end_date->formatLocalized($this->monthAndDayFormat),
                'currency' => $budgetLimit->transactionCurrency->name,
            ]
        );

        // collector:
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);

        $collector->setRange($budgetLimit->start_date, $budgetLimit->end_date)->withAccountInformation()
                  ->setBudget($budget)->setLimit($pageSize)->setPage($page)->withBudgetInformation()->withCategoryInformation();
        $groups = $collector->getPaginatedGroups();
        $groups->setPath(route('budgets.show', [$budget->id, $budgetLimit->id]));
        /** @var Carbon $start */
        $start       = session('first', Carbon::now()->startOfYear());
        $end         = today(config('app.timezone'));
        $attachments = $this->repository->getAttachments($budget);
        $limits      = $this->getLimits($budget, $start, $end);

        return prefixView('budgets.show', compact('limits', 'attachments', 'budget', 'budgetLimit', 'groups', 'subTitle'));
    }
}
