<?php

/*
 * DestroyController.php
 * Copyright (c) 2021 james@firefly-iii.org
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

namespace FireflyIII\Api\V1\Controllers\Models\TransactionLink;

use FireflyIII\Api\V1\Controllers\Controller;
use FireflyIII\Models\TransactionJournalLink;
use FireflyIII\Repositories\LinkType\LinkTypeRepositoryInterface;
use FireflyIII\User;
use Illuminate\Http\JsonResponse;

class DestroyController extends Controller
{

    private LinkTypeRepositoryInterface $repository;

    /**
     * TransactionLinkController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware(
            function ($request, $next) {
                /** @var User $user */
                $user = auth()->user();

                $this->repository = app(LinkTypeRepositoryInterface::class);

                $this->repository->setUser($user);

                return $next($request);
            }
        );
    }

    /**
     * Delete the resource.
     *
     * @param TransactionJournalLink $link
     *
     * @return JsonResponse
     * @codeCoverageIgnore
     */
    public function destroy(TransactionJournalLink $link): JsonResponse
    {
        $this->repository->destroyLink($link);

        return response()->json([], 204);
    }

}
