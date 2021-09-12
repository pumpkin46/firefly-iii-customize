<?php

/**
 * UserChangedEmail.php
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

namespace FireflyIII\Events;

use FireflyIII\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class UserChangedEmail.
 *
 * @codeCoverageIgnore
 */
class UserChangedEmail extends Event
{
    use SerializesModels;

    /** @var string The user's IP address */
    public $ipAddress;
    /** @var string The user's new email address */
    public $newEmail;
    /** @var string The user's old email address */
    public $oldEmail;
    /** @var User The user itself */
    public $user;
    /**
     * UserChangedEmail constructor.
     *
     * @param User   $user
     * @param string $newEmail
     * @param string $oldEmail
     * @param string $ipAddress
     */
    public function __construct(User $user, string $newEmail, string $oldEmail, string $ipAddress)
    {
        $this->user      = $user;
        $this->ipAddress = $ipAddress;
        $this->oldEmail  = $oldEmail;
        $this->newEmail  = $newEmail;
    }
}
