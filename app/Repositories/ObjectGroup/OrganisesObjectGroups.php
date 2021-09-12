<?php

/**
 * OrganisesObjectGroups.php
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

/**
 * Trait OrganisesRoleGroups
 */
trait OrganisesObjectGroups
{
    /**
     *
     */
    protected function cleanupObjectGroups(): void
    {
        $this->deleteEmptyObjectGroups();
        $this->sortObjectGroups();
    }

    /**
     *
     */
    private function deleteEmptyObjectGroups(): void
    {
        $repository = app(ObjectGroupRepositoryInterface::class);
        $repository->deleteEmpty();
    }

    /**
     *
     */
    private function sortObjectGroups(): void
    {
        $repository = app(ObjectGroupRepositoryInterface::class);
        $repository->resetOrder();
    }
}
