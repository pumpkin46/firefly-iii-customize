<?php
/**
 * IndexController.php
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
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Models\AvailableBudget;
use FireflyIII\Models\Budget;
use FireflyIII\Models\BudgetLimit;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Repositories\Budget\AvailableBudgetRepositoryInterface;
use FireflyIII\Repositories\Budget\BudgetLimitRepositoryInterface;
use FireflyIII\Repositories\Budget\BudgetRepositoryInterface;
use FireflyIII\Repositories\Budget\OperationsRepositoryInterface;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Support\Http\Controllers\DateCalculation;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\View\View;
use Log;

/**
 *
 * Class IndexController
 */
class IndexController extends Controller
{
    use DateCalculation;

    private AvailableBudgetRepositoryInterface $abRepository;
    private BudgetLimitRepositoryInterface     $blRepository;
    private CurrencyRepositoryInterface        $currencyRepository;
    private OperationsRepositoryInterface      $opsRepository;
    private BudgetRepositoryInterface          $repository;

    /**
     * IndexController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.budgets'));
                app('view')->share('mainTitleIcon', 'fa-pie-chart');
                $this->repository         = app(BudgetRepositoryInterface::class);
                $this->opsRepository      = app(OperationsRepositoryInterface::class);
                $this->abRepository       = app(AvailableBudgetRepositoryInterface::class);
                $this->currencyRepository = app(CurrencyRepositoryInterface::class);
                $this->blRepository       = app(BudgetLimitRepositoryInterface::class);
                $this->repository->cleanupBudgets();

                return $next($request);
            }
        );
    }

    /**
     * Show all budgets.
     *
     * @param Request     $request
     *
     * @param Carbon|null $start
     * @param Carbon|null $end
     *
     * @return Factory|View
     */
    public function index(Request $request, Carbon $start = null, Carbon $end = null)
    {
        Log::debug('Start of IndexController::index()');

        // collect some basic vars:
        $range           = (string)app('preferences')->get('viewRange', '1M')->data;
        $start           = $start ?? session('start', Carbon::now()->startOfMonth());
        $end             = $end ?? app('navigation')->endOfPeriod($start, $range);
        $defaultCurrency = app('amount')->getDefaultCurrency();
        $currencies      = $this->currencyRepository->get();
        $budgeted        = '0';
        $spent           = '0';

        // new period stuff:
        $periodTitle = app('navigation')->periodShow($start, $range);
        $prevLoop    = $this->getPreviousPeriods($start, $range);
        $nextLoop    = $this->getNextPeriods($start, $range);

        // get all available budgets:
        $availableBudgets = $this->getAllAvailableBudgets($start, $end);

        // get all active budgets:
        $budgets = $this->getAllBudgets($start, $end, $currencies, $defaultCurrency);
        $sums    = $this->getSums($budgets);

        // get budgeted for default currency:
        if (0 === count($availableBudgets)) {
            $budgeted = $this->blRepository->budgeted($start, $end, $defaultCurrency,);
            $spentArr = $this->opsRepository->sumExpenses($start, $end, null, null, $defaultCurrency);
            $spent    = $spentArr[$defaultCurrency->id]['sum'] ?? '0';
            unset($spentArr);
        }

        // count the number of enabled currencies. This determines if we display a "+" button.
        $enableAddButton = $currencies->count() > count($availableBudgets);

        // number of days for consistent budgeting.
        $activeDaysPassed = $this->activeDaysPassed($start, $end); // see method description.
        $activeDaysLeft   = $this->activeDaysLeft($start, $end); // see method description.

        // get all inactive budgets, and simply list them:
        $inactive = $this->repository->getInactiveBudgets();

        return prefixView(
            'budgets.index', compact(
                               'availableBudgets', 'budgeted', 'spent', 'prevLoop', 'nextLoop', 'budgets', 'currencies', 'enableAddButton', 'periodTitle',
                               'defaultCurrency', 'activeDaysPassed', 'activeDaysLeft', 'inactive', 'budgets', 'start', 'end', 'sums'
                           )
        );
    }

    /**
     * @param Carbon $start
     * @param Carbon $end
     *
     * @return array
     */
    private function getAllAvailableBudgets(Carbon $start, Carbon $end): array
    {
        // get all available budgets.
        $ab               = $this->abRepository->get($start, $end);
        $availableBudgets = [];
        // for each, complement with spent amount:
        /** @var AvailableBudget $entry */
        foreach ($ab as $entry) {
            $array               = $entry->toArray();
            $array['start_date'] = $entry->start_date;
            $array['end_date']   = $entry->end_date;

            // spent in period:
            $spentArr       = $this->opsRepository->sumExpenses($entry->start_date, $entry->end_date, null, null, $entry->transactionCurrency);
            $array['spent'] = $spentArr[$entry->transaction_currency_id]['sum'] ?? '0';

            // budgeted in period:
            $budgeted           = $this->blRepository->budgeted($entry->start_date, $entry->end_date, $entry->transactionCurrency,);
            $array['budgeted']  = $budgeted;
            $availableBudgets[] = $array;
            unset($spentArr);
        }

        return $availableBudgets;
    }

    /**
     * @param Carbon              $start
     * @param Carbon              $end
     * @param Collection          $currencies
     * @param TransactionCurrency $defaultCurrency
     *
     * @return array
     */
    private function getAllBudgets(Carbon $start, Carbon $end, Collection $currencies, TransactionCurrency $defaultCurrency): array
    {
        // get all budgets, and paginate them into $budgets.
        $collection = $this->repository->getActiveBudgets();
        $budgets    = [];
        Log::debug(sprintf('7) Start is "%s", end is "%s"', $start->format('Y-m-d H:i:s'), $end->format('Y-m-d H:i:s')));

        // complement budget with budget limits in range, and expenses in currency X in range.
        /** @var Budget $current */
        foreach ($collection as $current) {
            Log::debug(sprintf('Working on budget #%d ("%s")', $current->id, $current->name));
            $array                = $current->toArray();
            $array['spent']       = [];
            $array['budgeted']    = [];
            $array['attachments'] = $this->repository->getAttachments($current);
            $array['auto_budget'] = $this->repository->getAutoBudget($current);
            $budgetLimits         = $this->blRepository->getBudgetLimits($current, $start, $end);
            /** @var BudgetLimit $limit */
            foreach ($budgetLimits as $limit) {
                Log::debug(sprintf('Working on budget limit #%d', $limit->id));
                $currency            = $limit->transactionCurrency ?? $defaultCurrency;
                $array['budgeted'][] = [
                    'id'                      => $limit->id,
                    'amount'                  => number_format((float)$limit->amount, $currency->decimal_places, '.', ''),
                    'start_date'              => $limit->start_date->formatLocalized($this->monthAndDayFormat),
                    'end_date'                => $limit->end_date->formatLocalized($this->monthAndDayFormat),
                    'in_range'                => $limit->start_date->isSameDay($start) && $limit->end_date->isSameDay($end),
                    'currency_id'             => $currency->id,
                    'currency_symbol'         => $currency->symbol,
                    'currency_name'           => $currency->name,
                    'currency_decimal_places' => $currency->decimal_places,
                ];
            }

            /** @var TransactionCurrency $currency */
            foreach ($currencies as $currency) {
                $spentArr = $this->opsRepository->sumExpenses($start, $end, null, new Collection([$current]), $currency);
                if (array_key_exists($currency->id, $spentArr) && array_key_exists('sum', $spentArr[$currency->id])) {
                    $array['spent'][$currency->id]['spent']                   = $spentArr[$currency->id]['sum'];
                    $array['spent'][$currency->id]['currency_id']             = $currency->id;
                    $array['spent'][$currency->id]['currency_symbol']         = $currency->symbol;
                    $array['spent'][$currency->id]['currency_decimal_places'] = $currency->decimal_places;
                }
            }
            $budgets[] = $array;
        }

        return $budgets;
    }

    /**
     * @param array $budgets
     *
     * @return array
     */
    private function getSums(array $budgets): array
    {
        $sums = [
            'budgeted' => [],
            'spent'    => [],
            'left'     => [],
        ];

        /** @var array $budget */
        foreach ($budgets as $budget) {
            /** @var array $spent */
            foreach ($budget['spent'] as $spent) {
                $currencyId                           = $spent['currency_id'];
                $sums['spent'][$currencyId]
                                                      = $sums['spent'][$currencyId]
                                                        ?? [
                                                            'amount'                  => '0',
                                                            'currency_id'             => $spent['currency_id'],
                                                            'currency_symbol'         => $spent['currency_symbol'],
                                                            'currency_decimal_places' => $spent['currency_decimal_places'],
                                                        ];
                $sums['spent'][$currencyId]['amount'] = bcadd($sums['spent'][$currencyId]['amount'], $spent['spent']);
            }

            /** @var array $budgeted */
            foreach ($budget['budgeted'] as $budgeted) {
                $currencyId                              = $budgeted['currency_id'];
                $sums['budgeted'][$currencyId]
                                                         = $sums['budgeted'][$currencyId]
                                                           ?? [
                                                               'amount'                  => '0',
                                                               'currency_id'             => $budgeted['currency_id'],
                                                               'currency_symbol'         => $budgeted['currency_symbol'],
                                                               'currency_decimal_places' => $budgeted['currency_decimal_places'],
                                                           ];
                $sums['budgeted'][$currencyId]['amount'] = bcadd($sums['budgeted'][$currencyId]['amount'], $budgeted['amount']);

                // also calculate how much left from budgeted:
                $sums['left'][$currencyId] = $sums['left'][$currencyId]
                                             ?? [
                                                 'amount'                  => '0',
                                                 'currency_id'             => $budgeted['currency_id'],
                                                 'currency_symbol'         => $budgeted['currency_symbol'],
                                                 'currency_decimal_places' => $budgeted['currency_decimal_places'],
                                             ];
            }
        }
        // final calculation for 'left':
        foreach ($sums['budgeted'] as $currencyId => $info) {
            $spent                               = $sums['spent'][$currencyId]['amount'] ?? '0';
            $budgeted                            = $sums['budgeted'][$currencyId]['amount'] ?? '0';
            $sums['left'][$currencyId]['amount'] = bcadd($spent, $budgeted);
        }

        return $sums;
    }

    /**
     * @param Request                   $request
     * @param BudgetRepositoryInterface $repository
     *
     * @return JsonResponse
     */
    public function reorder(Request $request, BudgetRepositoryInterface $repository): JsonResponse
    {
        $budgetIds = $request->get('budgetIds');

        foreach ($budgetIds as $index => $budgetId) {
            $budgetId = (int)$budgetId;
            $budget   = $repository->findNull($budgetId);
            if (null !== $budget) {
                Log::debug(sprintf('Set budget #%d ("%s") to position %d', $budget->id, $budget->name, $index + 1));
                $repository->setBudgetOrder($budget, $index + 1);
            }
        }
        app('preferences')->mark();

        return response()->json(['OK']);
    }
}
