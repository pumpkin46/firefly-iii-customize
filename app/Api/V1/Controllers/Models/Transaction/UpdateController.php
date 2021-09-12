<?php
/*
 * UpdateController.php
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

namespace FireflyIII\Api\V1\Controllers\Models\Transaction;

use FireflyIII\Api\V1\Controllers\Controller;
use FireflyIII\Api\V1\Requests\Models\Transaction\UpdateRequest;
use FireflyIII\Events\UpdatedTransactionGroup;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Repositories\TransactionGroup\TransactionGroupRepositoryInterface;
use FireflyIII\Transformers\TransactionGroupTransformer;
use FireflyIII\User;
use Illuminate\Http\JsonResponse;
use League\Fractal\Resource\Item;
use Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class UpdateController
 */
class UpdateController extends Controller
{
    private TransactionGroupRepositoryInterface $groupRepository;

    /**
     * TransactionController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware(
            function ($request, $next) {
                /** @var User $admin */
                $admin = auth()->user();

                $this->groupRepository = app(TransactionGroupRepositoryInterface::class);
                $this->groupRepository->setUser($admin);

                return $next($request);
            }
        );
    }

    /**
     * Update a transaction.
     *
     * @param UpdateRequest    $request
     * @param TransactionGroup $transactionGroup
     *
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, TransactionGroup $transactionGroup): JsonResponse
    {
        Log::debug('Now in update routine for transaction group!');
        $data             = $request->getAll();
        $transactionGroup = $this->groupRepository->update($transactionGroup, $data);
        $manager          = $this->getManager();

        app('preferences')->mark();
        event(new UpdatedTransactionGroup($transactionGroup, $data['apply_rules'] ?? true));

        /** @var User $admin */
        $admin = auth()->user();
        // use new group collector:
        /** @var GroupCollectorInterface $collector */
        $collector = app(GroupCollectorInterface::class);
        $collector
            ->setUser($admin)
            // filter on transaction group.
            ->setTransactionGroup($transactionGroup)
            // all info needed for the API:
            ->withAPIInformation();

        $selectedGroup = $collector->getGroups()->first();
        if (null === $selectedGroup) {
            throw new NotFoundHttpException(); 
        }
        /** @var TransactionGroupTransformer $transformer */
        $transformer = app(TransactionGroupTransformer::class);
        $transformer->setParameters($this->parameters);
        $resource = new Item($selectedGroup, $transformer, 'transactions');

        return response()->json($manager->createData($resource)->toArray())->header('Content-Type', self::CONTENT_TYPE);
    }

}
