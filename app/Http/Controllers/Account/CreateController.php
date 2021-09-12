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

namespace FireflyIII\Http\Controllers\Account;

use FireflyIII\Helpers\Attachments\AttachmentHelperInterface;
use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Http\Requests\AccountFormRequest;
use FireflyIII\Models\AccountType;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Support\Http\Controllers\ModelInformation;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use Log;

/**
 *
 * Class CreateController
 */
class CreateController extends Controller
{
    use ModelInformation;

    private AttachmentHelperInterface  $attachments;
    private AccountRepositoryInterface $repository;

    /**
     * CreateController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        // translations:
        $this->middleware(
            function ($request, $next) {
                app('view')->share('mainTitleIcon', 'fa-credit-card');
                app('view')->share('title', (string)trans('firefly.accounts'));

                $this->repository  = app(AccountRepositoryInterface::class);
                $this->attachments = app(AttachmentHelperInterface::class);

                return $next($request);
            }
        );
    }

    /**
     * Create a new account.
     *
     * @param Request     $request
     * @param string|null $objectType
     *
     * @return Factory|View
     */
    public function create(Request $request, string $objectType = null)
    {
        $objectType      = $objectType ?? 'asset';
        $defaultCurrency = app('amount')->getDefaultCurrency();
        $subTitleIcon    = config(sprintf('firefly.subIconsByIdentifier.%s', $objectType));
        $subTitle        = (string)trans(sprintf('firefly.make_new_%s_account', $objectType));
        $roles           = $this->getRoles();
        $liabilityTypes  = $this->getLiabilityTypes();
        $hasOldInput     = null !== $request->old('_token');
        $locations       = [
            'location' => [
                'latitude'     => $hasOldInput ? old('location_latitude') : config('firefly.default_location.latitude'),
                'longitude'    => $hasOldInput ? old('location_longitude') : config('firefly.default_location.longitude'),
                'zoom_level'   => $hasOldInput ? old('location_zoom_level') : config('firefly.default_location.zoom_level'),
                'has_location' => $hasOldInput ? 'true' === old('location_has_location') : false,
            ],
        ];

        // interest calculation periods:
        $interestPeriods = [
            'daily'   => (string)trans('firefly.interest_calc_daily'),
            'monthly' => (string)trans('firefly.interest_calc_monthly'),
            'yearly'  => (string)trans('firefly.interest_calc_yearly'),
        ];

        // pre fill some data
        $request->session()->flash(
            'preFilled',
            [
                'currency_id'       => $defaultCurrency->id,
                'include_net_worth' => $hasOldInput ? (bool)$request->old('include_net_worth') : true,
            ]
        );

        // put previous url in session if not redirect from store (not "create another").
        if (true !== session('accounts.create.fromStore')) {
            $this->rememberPreviousUri('accounts.create.uri');
        }
        $request->session()->forget('accounts.create.fromStore');
        Log::channel('audit')->info('Creating new account.');

        return prefixView('accounts.create', compact('subTitleIcon', 'locations', 'objectType', 'interestPeriods', 'subTitle', 'roles', 'liabilityTypes'));
    }

    /**
     * Store the new account.
     *
     * @param AccountFormRequest $request
     *
     * @return RedirectResponse|Redirector
     */
    public function store(AccountFormRequest $request)
    {
        $data    = $request->getAccountData();
        $account = $this->repository->store($data);
        $request->session()->flash('success', (string)trans('firefly.stored_new_account', ['name' => $account->name]));
        app('preferences')->mark();

        Log::channel('audit')->info('Stored new account.', $data);

        // update preferences if necessary:
        $frontPage = app('preferences')->get('frontPageAccounts', [])->data;
        if (AccountType::ASSET === $account->accountType->type) {
            $frontPage[] = $account->id;
            app('preferences')->set('frontPageAccounts', $frontPage);
        }

        // store attachment(s):
        /** @var array $files */
        $files = $request->hasFile('attachments') ? $request->file('attachments') : null;
        if (null !== $files && !auth()->user()->hasRole('demo')) {
            $this->attachments->saveAttachmentsForModel($account, $files);
        }
        if (null !== $files && auth()->user()->hasRole('demo')) {
            session()->flash('info', (string)trans('firefly.no_att_demo_user'));
        }

        if (count($this->attachments->getMessages()->get('attachments')) > 0) {
            $request->session()->flash('info', $this->attachments->getMessages()->get('attachments')); 
        }

        // redirect to previous URL.
        $redirect = redirect($this->getPreviousUri('accounts.create.uri'));
        if (1 === (int)$request->get('create_another')) {
            // set value so create routine will not overwrite URL:
            $request->session()->put('accounts.create.fromStore', true);

            $redirect = redirect(route('accounts.create', [$request->input('objectType')]))->withInput();
        }

        return $redirect;
    }
}
