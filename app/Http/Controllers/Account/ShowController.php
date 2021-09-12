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

namespace FireflyIII\Http\Controllers\Account;

use Carbon\Carbon;
use Exception;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Models\Account;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Support\Http\Controllers\PeriodOverview;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Collection;
use Illuminate\View\View;

/**
 * Class ShowController
 *
 */
class ShowController extends Controller
{
    use PeriodOverview;

    private CurrencyRepositoryInterface $currencyRepos;
    private AccountRepositoryInterface  $repository;

    /**
     * ShowController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        app('view')->share('showCategory', true);

        // translations:
        $this->middleware(
            function ($request, $next) {
                app('view')->share('mainTitleIcon', 'fa-credit-card');
                app('view')->share('title', (string)trans('firefly.accounts'));

                $this->repository    = app(AccountRepositoryInterface::class);
                $this->currencyRepos = app(CurrencyRepositoryInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Show an account.
     *
     * @param Request     $request
     * @param Account     $account
     * @param Carbon|null $start
     * @param Carbon|null $end
     *
     * @return RedirectResponse|Redirector|Factory|View
     * @throws Exception
     *
     */
    public function show(Request $request, Account $account, Carbon $start = null, Carbon $end = null)
    {
        $objectType = config(sprintf('firefly.shortNamesByFullName.%s', $account->accountType->type));

        if (!$this->isEditableAccount($account)) {
            return $this->redirectAccountToAccount($account); 
        }

        /** @var Carbon $start */
        $start = $start ?? session('start');
        /** @var Carbon $end */
        $end = $end ?? session('end');

        if ($end < $start) {
            [$start, $end] = [$end, $start]; 
        }
        $location         = $this->repository->getLocation($account);
        $attachments      = $this->repository->getAttachments($account);
        $today            = today(config('app.timezone'));
        $subTitleIcon     = config(sprintf('firefly.subIconsByIdentifier.%s', $account->accountType->type));
        $page             = (int)$request->get('page');
        $pageSize         = (int)app('preferences')->get('listPageSize', 50)->data;
        $currency         = $this->repository->getAccountCurrency($account) ?? app('amount')->getDefaultCurrency();
        $fStart           = $start->formatLocalized($this->monthAndDayFormat);
        $fEnd             = $end->formatLocalized($this->monthAndDayFormat);
        $subTitle         = (string)trans('firefly.journals_in_period_for_account', ['name' => $account->name, 'start' => $fStart, 'end' => $fEnd]);
        $chartUri         = route('chart.account.period', [$account->id, $start->format('Y-m-d'), $end->format('Y-m-d')]);
        $firstTransaction = $this->repository->oldestJournalDate($account) ?? $start;
        $periods          = $this->getAccountPeriodOverview($account, $firstTransaction, $end);

        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector
            ->setAccounts(new Collection([$account]))
            ->setLimit($pageSize)
            ->setPage($page)->withAccountInformation()->withCategoryInformation()
            ->setRange($start, $end);
        $groups = $collector->getPaginatedGroups();

        $groups->setPath(route('accounts.show', [$account->id, $start->format('Y-m-d'), $end->format('Y-m-d')]));
        $showAll = false;
        $balance = app('steam')->balance($account, $end);

        return prefixView(
            'accounts.show',
            compact(
                'account',
                'showAll',
                'objectType',
                'currency',
                'today',
                'periods',
                'subTitleIcon',
                'groups',
                'attachments',
                'subTitle',
                'start',
                'end',
                'chartUri',
                'location',
                'balance'
            )
        );
    }

    /**
     * Show an account.
     *
     * @param Request $request
     * @param Account $account
     *
     * @return RedirectResponse|Redirector|Factory|View
     * @throws Exception
     *
     */
    public function showAll(Request $request, Account $account)
    {
        if (!$this->isEditableAccount($account)) {
            return $this->redirectAccountToAccount($account); 
        }
        $location     = $this->repository->getLocation($account);
        $isLiability  = $this->repository->isLiability($account);
        $attachments  = $this->repository->getAttachments($account);
        $objectType   = config(sprintf('firefly.shortNamesByFullName.%s', $account->accountType->type));
        $end          = today(config('app.timezone'));
        $today        = today(config('app.timezone'));
        $start        = $this->repository->oldestJournalDate($account) ?? Carbon::now()->startOfMonth();
        $subTitleIcon = config('firefly.subIconsByIdentifier.' . $account->accountType->type);
        $page         = (int)$request->get('page');
        $pageSize     = (int)app('preferences')->get('listPageSize', 50)->data;
        $currency     = $this->repository->getAccountCurrency($account) ?? app('amount')->getDefaultCurrency();
        $subTitle     = (string)trans('firefly.all_journals_for_account', ['name' => $account->name]);
        $periods      = new Collection;
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector->setAccounts(new Collection([$account]))->setLimit($pageSize)->setPage($page)->withAccountInformation()->withCategoryInformation();
        $groups = $collector->getPaginatedGroups();
        $groups->setPath(route('accounts.show.all', [$account->id]));
        $chartUri = route('chart.account.period', [$account->id, $start->format('Y-m-d'), $end->format('Y-m-d')]);
        $showAll  = true;
        $balance  = app('steam')->balance($account, $end);

        return prefixView(
            'accounts.show',
            compact(
                'account',
                'showAll',
                'location',
                'objectType',
                'isLiability',
                'attachments',
                'currency',
                'today',
                'chartUri',
                'periods',
                'subTitleIcon',
                'groups',
                'subTitle',
                'start',
                'end',
                'balance'
            )
        );
    }
}
