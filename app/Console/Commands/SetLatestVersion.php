<?php

/**
 * SetLatestVersion.php
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

namespace FireflyIII\Console\Commands;

use Illuminate\Console\Command;

/**
 * Class SetLatestVersion
 */
class SetLatestVersion extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set latest version in DB.';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firefly-iii:set-latest-version {--james-is-cool}';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        if (!$this->option('james-is-cool')) {
            $this->error('Am too!');

            return 0;
        }
        app('fireflyconfig')->set('db_version', config('firefly.db_version'));
        app('fireflyconfig')->set('ff3_version', config('firefly.version'));
        $this->line('Updated version.');

        app('telemetry')->feature('system.command.executed', $this->signature);

        return 0;
    }
}
