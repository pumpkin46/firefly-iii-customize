<?php

/**
 * RegisteredUser.php
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
 * Class RegisteredUser.
 *
 * @codeCoverageIgnore
 */
class RegisteredUser extends Event
{
    use SerializesModels;

    /** @var string The users IP address */
    public $ipAddress;
    /** @var User The user */
    public $user;
    /**
     * Create a new event instance. This event is triggered when a new user registers.
     *
     * @param User   $user
     * @param string $ipAddress
     */
    public function __construct(User $user, string $ipAddress)
    {
        $this->user      = $user;
        $this->ipAddress = $ipAddress;
    }
}
