<?php
/**
 * AttachmentRepositoryInterface.php
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

namespace FireflyIII\Repositories\Attachment;

use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\Attachment;
use FireflyIII\User;
use Illuminate\Support\Collection;

/**
 * Interface AttachmentRepositoryInterface.
 */
interface AttachmentRepositoryInterface
{

    /**
     * @param Attachment $attachment
     *
     * @return bool
     */
    public function destroy(Attachment $attachment): bool;

    /**
     * @param Attachment $attachment
     *
     * @return bool
     */
    public function exists(Attachment $attachment): bool;

    /**
     * @return Collection
     */
    public function get(): Collection;

    /**
     * @param Attachment $attachment
     *
     * @return string
     */
    public function getContent(Attachment $attachment): string;

    /**
     * Get attachment note text or empty string.
     *
     * @param Attachment $attachment
     *
     * @return string
     */
    public function getNoteText(Attachment $attachment): ?string;

    /**
     * @param User $user
     */
    public function setUser(User $user);

    /**
     * @param array $data
     *
     * @return Attachment
     * @throws FireflyException
     */
    public function store(array $data): Attachment;

    /**
     * @param Attachment $attachment
     * @param array      $attachmentData
     *
     * @return Attachment
     */
    public function update(Attachment $attachment, array $attachmentData): Attachment;
}
