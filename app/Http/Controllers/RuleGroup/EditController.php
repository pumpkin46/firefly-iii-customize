<?php
/**
 * EditController.php
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

namespace FireflyIII\Http\Controllers\RuleGroup;

use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Http\Requests\RuleGroupFormRequest;
use FireflyIII\Models\RuleGroup;
use FireflyIII\Repositories\RuleGroup\RuleGroupRepositoryInterface;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

/**
 * Class EditController
 */
class EditController extends Controller
{
    private RuleGroupRepositoryInterface $repository;

    /**
     * EditController constructor.
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

                $this->repository = app(RuleGroupRepositoryInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Move a rule group down.
     *
     * @param RuleGroup $ruleGroup
     *
     * @return RedirectResponse|Redirector
     */
    public function down(RuleGroup $ruleGroup)
    {
        $maxOrder = $this->repository->maxOrder();
        $order    = (int)$ruleGroup->order;
        if ($order < $maxOrder) {
            $newOrder = $order + 1;
            $this->repository->setOrder($ruleGroup, $newOrder);
        }

        return redirect(route('rules.index'));
    }

    /**
     * Edit a rule group.
     *
     * @param Request   $request
     * @param RuleGroup $ruleGroup
     *
     * @return Factory|View
     */
    public function edit(Request $request, RuleGroup $ruleGroup)
    {
        $subTitle = (string)trans('firefly.edit_rule_group', ['title' => $ruleGroup->title]);

        $hasOldInput = null !== $request->old('_token');
        $preFilled   = [
            'active' => $hasOldInput ? (bool)$request->old('active') : $ruleGroup->active,
        ];
        // put previous url in session if not redirect from store (not "return_to_edit").
        if (true !== session('rule-groups.edit.fromUpdate')) {
            $this->rememberPreviousUri('rule-groups.edit.uri');
        }
        session()->forget('rule-groups.edit.fromUpdate');
        session()->flash('preFilled', $preFilled);

        return prefixView('rules.rule-group.edit', compact('ruleGroup', 'subTitle'));
    }

    /**
     * Move the rule group up.
     *
     * @param RuleGroup $ruleGroup
     *
     * @return RedirectResponse|Redirector
     *
     */
    public function up(RuleGroup $ruleGroup)
    {
        $order = (int)$ruleGroup->order;
        if ($order > 1) {
            $newOrder = $order - 1;
            $this->repository->setOrder($ruleGroup, $newOrder);
        }

        return redirect(route('rules.index'));
    }

    /**
     * Update the rule group.
     *
     * @param RuleGroupFormRequest $request
     * @param RuleGroup            $ruleGroup
     *
     * @return $this|RedirectResponse|Redirector
     */
    public function update(RuleGroupFormRequest $request, RuleGroup $ruleGroup)
    {
        $data = [
            'title'       => $request->string('title'),
            'description' => $request->stringWithNewlines('description'),
            'active'      => 1 === (int)$request->input('active'),
        ];

        $this->repository->update($ruleGroup, $data);

        session()->flash('success', (string)trans('firefly.updated_rule_group', ['title' => $ruleGroup->title]));
        app('preferences')->mark();
        $redirect = redirect($this->getPreviousUri('rule-groups.edit.uri'));
        if (1 === (int)$request->get('return_to_edit')) {

            session()->put('rule-groups.edit.fromUpdate', true);

            $redirect = redirect(route('rule-groups.edit', [$ruleGroup->id]))->withInput(['return_to_edit' => 1]);

        }

        // redirect to previous URL.
        return $redirect;
    }

}
