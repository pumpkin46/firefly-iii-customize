<?php

/**
 * Authenticate.php
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

namespace FireflyIII\Http\Middleware;

use Closure;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

/**
 * Class Authenticate
 */
class Authenticate
{
    /**
     * The authentication factory instance.
     *
     * @var Auth
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param Auth $auth
     *
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request  $request
     * @param Closure  $next
     * @param string[] ...$guards
     *
     * @return mixed
     *
     * @throws FireflyException
     * @throws AuthenticationException
     */
    public function handle($request, Closure $next, ...$guards)
    {
        $this->authenticate($request, $guards);

        return $next($request);
    }

    /**
     * Determine if the user is logged in to any of the given guards.
     *
     * @param mixed $request
     * @param array $guards
     *
     * @return mixed
     * @throws FireflyException
     * @throws AuthenticationException
     */
    protected function authenticate($request, array $guards)
    {

        if (0 === count($guards)) {
            try {
                // go for default guard:
                /** @noinspection PhpUndefinedMethodInspection */
                if ($this->auth->check()) {

                    // do an extra check on user object.
                    /** @noinspection PhpUndefinedMethodInspection */
                    /** @var User $user */
                    $user = $this->auth->authenticate();
                    if (1 === (int)$user->blocked) {
                        $message = (string)trans('firefly.block_account_logout');
                        if ('email_changed' === $user->blocked_code) {
                            $message = (string)trans('firefly.email_changed_logout');
                        }
                        app('session')->flash('logoutMessage', $message);
                        /** @noinspection PhpUndefinedMethodInspection */
                        $this->auth->logout();

                        throw new AuthenticationException('Blocked account.', $guards);
                    }
                }
            } catch (QueryException $e) {

                throw new FireflyException(
                    sprintf(
                        'It seems the database has not yet been initialized. Did you run the correct upgrade or installation commands? Error: %s',
                        $e->getMessage()
                    ), 0, $e
                );

            }

            /** @noinspection PhpUndefinedMethodInspection */
            return $this->auth->authenticate();
        }


        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                /** @noinspection PhpVoidFunctionResultUsedInspection */
                return $this->auth->shouldUse($guard); // @phpstan-ignore-line
            }
        }

        throw new AuthenticationException('Unauthenticated.', $guards);

    }
}
