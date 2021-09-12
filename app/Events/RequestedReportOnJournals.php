<?php

/**
 * RequestedReportOnJournals.php
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

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Log;

/**
 * Class RequestedReportOnJournals
 *
 * @codeCoverageIgnore
 */
class RequestedReportOnJournals
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /** @var Collection The transaction groups to report on. */
    public $groups;
    /** @var int The ID of the user. */
    public $userId;
    /**
     * Create a new event instance.
     *
     * @param int        $userId
     * @param Collection $groups
     */
    public function __construct(int $userId, Collection $groups)
    {
        Log::debug('In event RequestedReportOnJournals.');
        $this->userId = $userId;
        $this->groups = $groups;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
