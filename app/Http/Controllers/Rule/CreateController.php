<?php
/**
 * CreateController.php
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

namespace FireflyIII\Http\Controllers\Rule;

use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Http\Requests\RuleFormRequest;
use FireflyIII\Models\Bill;
use FireflyIII\Models\Rule;
use FireflyIII\Models\RuleGroup;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Repositories\Rule\RuleRepositoryInterface;
use FireflyIII\Support\Http\Controllers\ModelInformation;
use FireflyIII\Support\Http\Controllers\RuleManagement;
use FireflyIII\Support\Search\SearchInterface;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

/**
 * Class CreateController
 */
class CreateController extends Controller
{
    use RuleManagement, ModelInformation;

    private RuleRepositoryInterface $ruleRepos;

    /**
     * RuleController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.rules'));
                app('view')->share('mainTitleIcon', 'fa-random');

                $this->ruleRepos = app(RuleRepositoryInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Create a new rule. It will be stored under the given $ruleGroup.
     *
     * @param Request        $request
     * @param RuleGroup|null $ruleGroup
     *
     * @return Factory|View
     */
    public function create(Request $request, RuleGroup $ruleGroup = null)
    {
        $this->createDefaultRuleGroup();
        $this->createDefaultRule();
        $preFilled   = [
            'strict' => true,
        ];
        $oldTriggers = [];
        $oldActions  = [];

        // build triggers from query, if present.
        $query = (string)$request->get('from_query');
        if ('' !== $query) {
            $search = app(SearchInterface::class);
            $search->parseQuery($query);
            $words     = $search->getWordsAsString();
            $operators = $search->getOperators()->toArray();
            if ('' !== $words) {
                session()->flash('warning', trans('firefly.rule_from_search_words', ['string' => $words]));
                array_push($operators, ['type' => 'description_contains', 'value' => $words]);
            }
            $oldTriggers = $this->parseFromOperators($operators);
        }

        // restore actions and triggers from old input:
        if ($request->old()) {
            $oldTriggers = $this->getPreviousTriggers($request);
            $oldActions  = $this->getPreviousActions($request);
        }

        $triggerCount = count($oldTriggers);
        $actionCount  = count($oldActions);
        $subTitleIcon = 'fa-clone';

        // title depends on whether or not there is a rule group:
        $subTitle = (string)trans('firefly.make_new_rule_no_group');
        if (null !== $ruleGroup) {
            $subTitle = (string)trans('firefly.make_new_rule', ['title' => $ruleGroup->title]);
        }

        // flash old data
        $request->session()->flash('preFilled', $preFilled);

        // put previous url in session if not redirect from store (not "create another").
        if (true !== session('rules.create.fromStore')) {
            $this->rememberPreviousUri('rules.create.uri');
        }
        session()->forget('rules.create.fromStore');

        return prefixView(
            'rules.rule.create',
            compact('subTitleIcon', 'oldTriggers', 'preFilled', 'oldActions', 'triggerCount', 'actionCount', 'ruleGroup', 'subTitle')
        );
    }

    /**
     * Create a new rule. It will be stored under the given $ruleGroup.
     *
     * @param Request $request
     * @param Bill    $bill
     *
     * @return Factory|View
     */
    public function createFromBill(Request $request, Bill $bill)
    {
        $request->session()->flash('info', (string)trans('firefly.instructions_rule_from_bill', ['name' => e($bill->name)]));

        $this->createDefaultRuleGroup();
        $this->createDefaultRule();
        $preFilled = [
            'strict'      => true,
            'title'       => (string)trans('firefly.new_rule_for_bill_title', ['name' => $bill->name]),
            'description' => (string)trans('firefly.new_rule_for_bill_description', ['name' => $bill->name]),
        ];

        // make triggers and actions from the bill itself.

        // get triggers and actions for bill:
        $oldTriggers = $this->getTriggersForBill($bill);
        $oldActions  = $this->getActionsForBill($bill);

        // restore actions and triggers from old input:
        if ($request->old()) {
            $oldTriggers = $this->getPreviousTriggers($request);
            $oldActions  = $this->getPreviousActions($request);
        }

        $triggerCount = count($oldTriggers);
        $actionCount  = count($oldActions);
        $subTitleIcon = 'fa-clone';

        // title depends on whether or not there is a rule group:
        $subTitle = (string)trans('firefly.make_new_rule_no_group');

        // flash old data
        $request->session()->flash('preFilled', $preFilled);

        // put previous url in session if not redirect from store (not "create another").
        if (true !== session('rules.create.fromStore')) {
            $this->rememberPreviousUri('rules.create.uri');
        }
        session()->forget('rules.create.fromStore');

        return prefixView(
            'rules.rule.create',
            compact('subTitleIcon', 'oldTriggers', 'preFilled', 'oldActions', 'triggerCount', 'actionCount', 'subTitle')
        );
    }

    /**
     * @param Request            $request
     * @param TransactionJournal $journal
     */
    public function createFromJournal(Request $request, TransactionJournal $journal)
    {
        $request->session()->flash('info', (string)trans('firefly.instructions_rule_from_journal', ['name' => e($journal->description)]));

        $subTitleIcon = 'fa-clone';
        $subTitle     = (string)trans('firefly.make_new_rule_no_group');

        // get triggers and actions for journal.
        $oldTriggers = $this->getTriggersForJournal($journal);
        $oldActions  = [];

        $this->createDefaultRuleGroup();
        $this->createDefaultRule();

        // collect pre-filled information:
        $preFilled = [
            'strict'      => true,
            'title'       => (string)trans('firefly.new_rule_for_journal_title', ['description' => $journal->description]),
            'description' => (string)trans('firefly.new_rule_for_journal_description', ['description' => $journal->description]),
        ];

        // restore actions and triggers from old input:
        if ($request->old()) {
            $oldTriggers = $this->getPreviousTriggers($request);
            $oldActions  = $this->getPreviousActions($request);
        }

        $triggerCount = count($oldTriggers);
        $actionCount  = count($oldActions);

        // flash old data
        $request->session()->flash('preFilled', $preFilled);

        // put previous url in session if not redirect from store (not "create another").
        if (true !== session('rules.create.fromStore')) {
            $this->rememberPreviousUri('rules.create.uri');
        }
        session()->forget('rules.create.fromStore');

        return prefixView(
            'rules.rule.create',
            compact('subTitleIcon', 'oldTriggers', 'preFilled', 'oldActions', 'triggerCount', 'actionCount', 'subTitle')
        );
    }

    /**
     * @param Rule $rule
     *
     * @return RedirectResponse
     */
    public function duplicate(Rule $rule): RedirectResponse
    {
        /** @var Rule $newRule */
        $newRule = $this->ruleRepos->duplicate($rule);

        session()->flash('success', trans('firefly.duplicated_rule', ['title' => $rule->title, 'newTitle' => $newRule->title]));

        return redirect(route('rules.index'));
    }

    /**
     * Store the new rule.
     *
     * @param RuleFormRequest $request
     *
     * @return RedirectResponse|Redirector
     *
     */
    public function store(RuleFormRequest $request)
    {
        $data = $request->getRuleData();
        $rule = $this->ruleRepos->store($data);
        session()->flash('success', (string)trans('firefly.stored_new_rule', ['title' => $rule->title]));
        app('preferences')->mark();

        // redirect to show bill.
        if ('true' === $request->get('return_to_bill') && (int)$request->get('bill_id') > 0) {
            return redirect(route('bills.show', [(int)$request->get('bill_id')])); 
        }

        // redirect to new bill creation.
        if ((int)$request->get('bill_id') > 0) {
            return redirect($this->getPreviousUri('bills.create.uri')); 
        }

        $redirect = redirect($this->getPreviousUri('rules.create.uri'));

        if (1 === (int)$request->get('create_another')) {

            session()->put('rules.create.fromStore', true);
            $redirect = redirect(route('rules.create', [$data['rule_group_id']]))->withInput();

        }

        return $redirect;
    }
}
