<?php
/**
 * UserController.php
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
use FireflyIII\Http\Requests\UserFormRequest;
use FireflyIII\Repositories\User\UserRepositoryInterface;
use FireflyIII\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use Log;

/**
 * Class UserController.
 */
class UserController extends Controller
{
    protected bool                  $externalIdentity;
    private UserRepositoryInterface $repository;

    /**
     * UserController constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.administration'));
                app('view')->share('mainTitleIcon', 'fa-hand-spock-o');
                $this->repository = app(UserRepositoryInterface::class);

                return $next($request);
            }
        );
        $this->middleware(IsDemoUser::class)->except(['index', 'show']);
        $loginProvider          = config('firefly.login_provider');
        $authGuard              = config('firefly.authentication_guard');
        $this->externalIdentity = 'eloquent' !== $loginProvider || 'web' !== $authGuard;
    }

    /**
     * @param User $user
     *
     * @return Application|Factory|RedirectResponse|Redirector|View
     */
    public function delete(User $user)
    {
        if ($this->externalIdentity) {
            request()->session()->flash('error', trans('firefly.external_user_mgt_disabled'));

            return redirect(route('admin.users'));
        }

        $subTitle = (string)trans('firefly.delete_user', ['email' => $user->email]);

        return prefixView('admin.users.delete', compact('user', 'subTitle'));
    }

    /**
     * Destroy a user.
     *
     * @param User $user
     *
     * @return RedirectResponse|Redirector
     */
    public function destroy(User $user)
    {
        if ($this->externalIdentity) {
            request()->session()->flash('error', trans('firefly.external_user_mgt_disabled'));

            return redirect(route('admin.users'));
        }
        $this->repository->destroy($user);
        session()->flash('success', (string)trans('firefly.user_deleted'));

        return redirect(route('admin.users'));
    }

    /**
     * Edit user form.
     *
     * @param User $user
     *
     * @return Factory|View
     */
    public function edit(User $user)
    {
        $canEditDetails = true;
        if ($this->externalIdentity) {
            $canEditDetails = false;
        }
        // put previous url in session if not redirect from store (not "return_to_edit").
        if (true !== session('users.edit.fromUpdate')) {
            $this->rememberPreviousUri('users.edit.uri');
        }
        session()->forget('users.edit.fromUpdate');

        $subTitle     = (string)trans('firefly.edit_user', ['email' => $user->email]);
        $subTitleIcon = 'fa-user-o';
        $currentUser  = auth()->user();
        $isAdmin      = $this->repository->hasRole($user, 'owner');
        $codes        = [
            ''              => (string)trans('firefly.no_block_code'),
            'bounced'       => (string)trans('firefly.block_code_bounced'),
            'expired'       => (string)trans('firefly.block_code_expired'),
            'email_changed' => (string)trans('firefly.block_code_email_changed'),
        ];

        return prefixView('admin.users.edit', compact('user', 'canEditDetails', 'subTitle', 'subTitleIcon', 'codes', 'currentUser', 'isAdmin'));
    }

    /**
     * Show index of user manager.
     *
     * @return Factory|View
     */
    public function index()
    {
        $subTitle     = (string)trans('firefly.user_administration');
        $subTitleIcon = 'fa-users';
        $users        = $this->repository->all();

        // add meta stuff.
        $users->each(
            function (User $user) {
                $user->isAdmin = $this->repository->hasRole($user, 'owner');
                $user->has2FA  = null !== $user->mfa_secret;
            }
        );

        return prefixView('admin.users.index', compact('subTitle', 'subTitleIcon', 'users'));
    }

    /**
     * Show single user.
     *
     * @param User $user
     *
     * @return Factory|View
     */
    public function show(User $user)
    {
        $title         = (string)trans('firefly.administration');
        $mainTitleIcon = 'fa-hand-spock-o';
        $subTitle      = (string)trans('firefly.single_user_administration', ['email' => $user->email]);
        $subTitleIcon  = 'fa-user';
        $information   = $this->repository->getUserData($user);

        return prefixView(
            'admin.users.show',
            compact(
                'title',
                'mainTitleIcon',
                'subTitle',
                'subTitleIcon',
                'information',
                'user'
            )
        );
    }

    /**
     * Update single user.
     *
     * @param UserFormRequest $request
     * @param User            $user
     *
     * @return $this|RedirectResponse|Redirector
     */
    public function update(UserFormRequest $request, User $user)
    {
        Log::debug('Actually here');
        $data = $request->getUserData();

        //var_dump($data);

        // update password
        if (array_key_exists('password', $data) && '' !== $data['password']) {
            $this->repository->changePassword($user, $data['password']);
        }
        if (true === $data['is_owner']) {
            $this->repository->attachRole($user, 'owner');
            session()->flash('info', trans('firefly.give_admin_careful'));
        }
        if (false === $data['is_owner'] && $user->id !== auth()->user()->id) {
            $this->repository->removeRole($user, 'owner');
        }

        $this->repository->changeStatus($user, $data['blocked'], $data['blocked_code']);
        $this->repository->updateEmail($user, $data['email']);

        session()->flash('success', (string)trans('firefly.updated_user', ['email' => $user->email]));
        app('preferences')->mark();
        $redirect = redirect($this->getPreviousUri('users.edit.uri'));
        if (1 === (int)$request->get('return_to_edit')) {

            session()->put('users.edit.fromUpdate', true);

            $redirect = redirect(route('admin.users.edit', [$user->id]))->withInput(['return_to_edit' => 1]);

        }

        // redirect to previous URL.
        return $redirect;
    }
}
