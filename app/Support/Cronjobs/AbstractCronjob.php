<?php
/**
 * AbstractCronjob.php
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

namespace FireflyIII\Support\Cronjobs;

use Carbon\Carbon;
use Exception;
use FireflyIII\Exceptions\FireflyException;

/**
 * Class AbstractCronjob
 *
 * @codeCoverageIgnore
 */
abstract class AbstractCronjob
{
    public int       $timeBetweenRuns = 43200;
    protected Carbon $date;
    protected bool   $force;

    public bool $jobFired;
    public bool $jobSucceeded;
    public bool $jobErrored;

    public ?string $message;

    /**
     * AbstractCronjob constructor.
     */
    public function __construct()
    {
        $this->force        = false;
        $this->date         = today(config('app.timezone'));
        $this->jobErrored   = false;
        $this->jobSucceeded = false;
        $this->jobFired     = false;
        $this->message      = null;
    }

    /**
     *
     */
    abstract public function fire(): void;

    /**
     * @param Carbon $date
     */
    final public function setDate(Carbon $date): void
    {
        $newDate = clone $date;
        $this->date = $newDate;
    }

    /**
     * @param bool $force
     */
    final public function setForce(bool $force): void
    {
        $this->force = $force;
    }

}
