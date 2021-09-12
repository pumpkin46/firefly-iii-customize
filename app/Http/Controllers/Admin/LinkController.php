<?php
/**
 * LinkController.php
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

namespace FireflyIII\Http\Controllers\Admin;

use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Http\Middleware\IsDemoUser;
use FireflyIII\Http\Requests\LinkTypeFormRequest;
use FireflyIII\Models\LinkType;
use FireflyIII\Repositories\LinkType\LinkTypeRepositoryInterface;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use Log;

/**
 * Class LinkController.
 */
class LinkController extends Controller
{
    private LinkTypeRepositoryInterface $repository;

    /**
     * LinkController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.administration'));
                app('view')->share('mainTitleIcon', 'fa-hand-spock-o');
                $this->repository = app(LinkTypeRepositoryInterface::class);

                return $next($request);
            }
        );
        $this->middleware(IsDemoUser::class)->except(['index', 'show']);
    }

    /**
     * Make a new link form.
     *
     * @return Factory|View
     */
    public function create()
    {
        Log::channel('audit')->info('User visits link index.');

        $subTitle     = (string)trans('firefly.create_new_link_type');
        $subTitleIcon = 'fa-link';

        // put previous url in session if not redirect from store (not "create another").
        if (true !== session('link-types.create.fromStore')) {
            $this->rememberPreviousUri('link-types.create.uri');
        }

        return prefixView('admin.link.create', compact('subTitle', 'subTitleIcon'));
    }

    /**
     * Delete a link form.
     *
     * @param Request  $request
     * @param LinkType $linkType
     *
     * @return Factory|RedirectResponse|Redirector|View
     */
    public function delete(Request $request, LinkType $linkType)
    {
        if (!$linkType->editable) {
            $request->session()->flash('error', (string)trans('firefly.cannot_edit_link_type', ['name' => e($linkType->name)]));

            return redirect(route('admin.links.index'));
        }

        Log::channel('audit')->info(sprintf('User wants to delete link type #%d', $linkType->id));
        $subTitle   = (string)trans('firefly.delete_link_type', ['name' => $linkType->name]);
        $otherTypes = $this->repository->get();
        $count      = $this->repository->countJournals($linkType);
        $moveTo     = [];
        $moveTo[0]  = (string)trans('firefly.do_not_save_connection');

        /** @var LinkType $otherType */
        foreach ($otherTypes as $otherType) {
            if ($otherType->id !== $linkType->id) {
                $moveTo[$otherType->id] = sprintf('%s (%s / %s)', $otherType->name, $otherType->inward, $otherType->outward);
            }
        }

        // put previous url in session
        $this->rememberPreviousUri('link-types.delete.uri');

        return prefixView('admin.link.delete', compact('linkType', 'subTitle', 'moveTo', 'count'));
    }

    /**
     * Actually destroy the link.
     *
     * @param Request  $request
     * @param LinkType $linkType
     *
     * @return RedirectResponse|Redirector
     */
    public function destroy(Request $request, LinkType $linkType)
    {
        Log::channel('audit')->info(sprintf('User destroyed link type #%d', $linkType->id));
        $name   = $linkType->name;
        $moveTo = $this->repository->findNull((int)$request->get('move_link_type_before_delete'));
        $this->repository->destroy($linkType, $moveTo);

        $request->session()->flash('success', (string)trans('firefly.deleted_link_type', ['name' => $name]));
        app('preferences')->mark();

        return redirect($this->getPreviousUri('link-types.delete.uri'));
    }

    /**
     * Edit a link form.
     *
     * @param Request  $request
     * @param LinkType $linkType
     *
     * @return Factory|RedirectResponse|Redirector|View
     */
    public function edit(Request $request, LinkType $linkType)
    {
        if (!$linkType->editable) {
            $request->session()->flash('error', (string)trans('firefly.cannot_edit_link_type', ['name' => e($linkType->name)]));

            return redirect(route('admin.links.index'));
        }
        $subTitle     = (string)trans('firefly.edit_link_type', ['name' => $linkType->name]);
        $subTitleIcon = 'fa-link';

        Log::channel('audit')->info(sprintf('User wants to edit link type #%d', $linkType->id));

        // put previous url in session if not redirect from store (not "return_to_edit").
        if (true !== session('link-types.edit.fromUpdate')) {
            $this->rememberPreviousUri('link-types.edit.uri'); 
        }
        $request->session()->forget('link-types.edit.fromUpdate');

        return prefixView('admin.link.edit', compact('subTitle', 'subTitleIcon', 'linkType'));
    }

    /**
     * Show index of all links.
     *
     * @return Factory|View
     */
    public function index()
    {
        $subTitle     = (string)trans('firefly.journal_link_configuration');
        $subTitleIcon = 'fa-link';
        $linkTypes    = $this->repository->get();

        Log::channel('audit')->info('User on index of link types in admin.');
        $linkTypes->each(
            function (LinkType $linkType) {
                $linkType->journalCount = $this->repository->countJournals($linkType);
            }
        );

        return prefixView('admin.link.index', compact('subTitle', 'subTitleIcon', 'linkTypes'));
    }

    /**
     * Show a single link.
     *
     * @param LinkType $linkType
     *
     * @return Factory|View
     */
    public function show(LinkType $linkType)
    {
        $subTitle     = (string)trans('firefly.overview_for_link', ['name' => $linkType->name]);
        $subTitleIcon = 'fa-link';
        $links        = $this->repository->getJournalLinks($linkType);

        Log::channel('audit')->info(sprintf('User viewing link type #%d', $linkType->id));

        return prefixView('admin.link.show', compact('subTitle', 'subTitleIcon', 'linkType', 'links'));
    }

    /**
     * Store the new link.
     *
     * @param LinkTypeFormRequest $request
     *
     * @return $this|RedirectResponse|Redirector
     */
    public function store(LinkTypeFormRequest $request)
    {
        $data     = [
            'name'    => $request->string('name'),
            'inward'  => $request->string('inward'),
            'outward' => $request->string('outward'),
        ];
        $linkType = $this->repository->store($data);

        Log::channel('audit')->info('User stored new link type.', $linkType->toArray());

        $request->session()->flash('success', (string)trans('firefly.stored_new_link_type', ['name' => $linkType->name]));
        $redirect = redirect($this->getPreviousUri('link-types.create.uri'));
        if (1 === (int)$request->get('create_another')) {
            // set value so create routine will not overwrite URL:
            $request->session()->put('link-types.create.fromStore', true);

            $redirect = redirect(route('admin.links.create'))->withInput();
        }

        // redirect to previous URL.
        return $redirect;
    }

    /**
     * Update an existing link.
     *
     * @param LinkTypeFormRequest $request
     * @param LinkType            $linkType
     *
     * @return $this|RedirectResponse|Redirector
     */
    public function update(LinkTypeFormRequest $request, LinkType $linkType)
    {
        if (!$linkType->editable) {
            $request->session()->flash('error', (string)trans('firefly.cannot_edit_link_type', ['name' => e($linkType->name)]));

            return redirect(route('admin.links.index'));
        }

        $data = [
            'name'    => $request->string('name'),
            'inward'  => $request->string('inward'),
            'outward' => $request->string('outward'),
        ];
        $this->repository->update($linkType, $data);

        Log::channel('audit')->info(sprintf('User update link type #%d.', $linkType->id), $data);

        $request->session()->flash('success', (string)trans('firefly.updated_link_type', ['name' => $linkType->name]));
        app('preferences')->mark();
        $redirect = redirect($this->getPreviousUri('link-types.edit.uri'));
        if (1 === (int)$request->get('return_to_edit')) {
            // set value so edit routine will not overwrite URL:
            $request->session()->put('link-types.edit.fromUpdate', true);

            $redirect = redirect(route('admin.links.edit', [$linkType->id]))->withInput(['return_to_edit' => 1]);
        }

        // redirect to previous URL.
        return $redirect;
    }
}
