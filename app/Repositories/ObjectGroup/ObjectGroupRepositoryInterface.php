<?php

/**
 * ObjectGroupRepositoryInterface.php
 * Copyright (c) 2020 james@firefly-iii.org
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

namespace FireflyIII\Repositories\ObjectGroup;

use FireflyIII\Models\ObjectGroup;
use FireflyIII\User;
use Illuminate\Support\Collection;

/**
 * Interface ObjectGroupRepositoryInterface
 */
interface ObjectGroupRepositoryInterface
{
    /**
     * Delete all.
     */
    public function deleteAll(): void;

    /**
     * Delete empty ones.
     */
    public function deleteEmpty(): void;

    /**
     * @param ObjectGroup $objectGroup
     */
    public function destroy(ObjectGroup $objectGroup): void;

    /**
     * @return Collection
     */
    public function get(): Collection;

    /**
     * @param ObjectGroup $objectGroup
     *
     * @return Collection
     */
    public function getBills(ObjectGroup $objectGroup): Collection;

    /**
     * @param ObjectGroup $objectGroup
     *
     * @return Collection
     */
    public function getPiggyBanks(ObjectGroup $objectGroup): Collection;

    /**
     * Delete all.
     */
    public function resetOrder(): void;

    /**
     * @param string $query
     * @param int    $limit
     *
     * @return Collection
     */
    public function search(string $query, int $limit): Collection;

    /**
     * @param ObjectGroup $objectGroup
     * @param int         $newOrder
     *
     * @return ObjectGroup
     */
    public function setOrder(ObjectGroup $objectGroup, int $newOrder): ObjectGroup;

    /**
     * @param User $user
     */
    public function setUser(User $user): void;

    /**
     * @param ObjectGroup $objectGroup
     * @param array       $data
     *
     * @return ObjectGroup
     */
    public function update(ObjectGroup $objectGroup, array $data): ObjectGroup;

}
