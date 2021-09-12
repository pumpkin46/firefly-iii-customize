<?php
/**
 * SearchInterface.php
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

namespace FireflyIII\Support\Search;

use Carbon\Carbon;
use FireflyIII\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

/**
 * Interface SearchInterface.
 */
interface SearchInterface
{
    /**
     * @return Collection
     */
    public function getModifiers(): Collection;

    /**
     * @return Collection
     */
    public function getOperators(): Collection;

    /**
     * @return string
     */
    public function getWordsAsString(): string;

    /**
     * @return bool
     */
    public function hasModifiers(): bool;

    /**
     * @param string $query
     */
    public function parseQuery(string $query);

    /**
     * @return float
     */
    public function searchTime(): float;

    /**
     * @return LengthAwarePaginator
     */
    public function searchTransactions(): LengthAwarePaginator;

    /**
     * @param Carbon $date
     */
    public function setDate(Carbon $date): void;

    /**
     * @param int $limit
     */
    public function setLimit(int $limit): void;

    /**
     * @param int $page
     */
    public function setPage(int $page): void;

    /**
     * @param User $user
     */
    public function setUser(User $user);
}
