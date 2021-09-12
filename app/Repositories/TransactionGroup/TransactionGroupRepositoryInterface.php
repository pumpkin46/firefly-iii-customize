<?php
/**
 * TransactionGroupRepositoryInterface.php
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

namespace FireflyIII\Repositories\TransactionGroup;

use FireflyIII\Exceptions\DuplicateTransactionException;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\Location;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Support\NullArrayObject;
use FireflyIII\User;
use Illuminate\Support\Collection;

/**
 * Interface TransactionGroupRepositoryInterface
 */
interface TransactionGroupRepositoryInterface
{
    /**
     * @param TransactionGroup $group
     */
    public function destroy(TransactionGroup $group): void;

    /**
     * Return a group and expand all meta data etc.
     *
     * @param TransactionGroup $group
     *
     * @return array
     */
    public function expandGroup(TransactionGroup $group): array;

    /**
     * Find a transaction group by its ID.
     *
     * @param int $groupId
     *
     * @return TransactionGroup|null
     */
    public function find(int $groupId): ?TransactionGroup;

    /**
     * Return all attachments for all journals in the group.
     *
     * @param TransactionGroup $group
     *
     * @return array
     */
    public function getAttachments(TransactionGroup $group): array;

    /**
     * Return all journal links for all journals in the group.
     *
     * @param TransactionGroup $group
     *
     * @return array
     */
    public function getLinks(TransactionGroup $group): array;

    /**
     * Get the location of a journal or NULL.
     *
     * @param int $journalId
     *
     * @return Location|null
     */
    public function getLocation(int $journalId): ?Location;

    /**
     * Return object with all found meta field things as Carbon objects.
     *
     * @param int   $journalId
     * @param array $fields
     *
     * @return NullArrayObject
     */
    public function getMetaDateFields(int $journalId, array $fields): NullArrayObject;

    /**
     * Return object with all found meta field things.
     *
     * @param int   $journalId
     * @param array $fields
     *
     * @return NullArrayObject
     */
    public function getMetaFields(int $journalId, array $fields): NullArrayObject;

    /**
     * Get the note text for a journal (by ID).
     *
     * @param int $journalId
     *
     * @return string|null
     */
    public function getNoteText(int $journalId): ?string;

    /**
     * Return all piggy bank events for all journals in the group.
     *
     * @param TransactionGroup $group
     *
     * @return array
     */
    public function getPiggyEvents(TransactionGroup $group): array;

    /**
     * Get the tags for a journal (by ID) as Tag objects.
     *
     * @param int $journalId
     *
     * @return Collection
     */
    public function getTagObjects(int $journalId): Collection;

    /**
     * Get the tags for a journal (by ID).
     *
     * @param int $journalId
     *
     * @return array
     */
    public function getTags(int $journalId): array;

    /**
     * Set the user.
     *
     * @param User $user
     */
    public function setUser(User $user): void;

    /**
     * Create a new transaction group.
     *
     * @param array $data
     *
     * @return TransactionGroup
     * @throws DuplicateTransactionException
     * @throws FireflyException
     */
    public function store(array $data): TransactionGroup;

    /**
     * Update an existing transaction group.
     *
     * @param TransactionGroup $transactionGroup
     * @param array            $data
     *
     * @return TransactionGroup
     */
    public function update(TransactionGroup $transactionGroup, array $data): TransactionGroup;

}
