<?php
/**
 * UpgradeDatabase.php
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

namespace FireflyIII\Console\Commands\Upgrade;

set_time_limit(0);

use Artisan;
use Illuminate\Console\Command;

/**
 * Class UpgradeDatabase
 *
 * @codeCoverageIgnore
 */
class UpgradeDatabase extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upgrades the database to the latest version.';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firefly-iii:upgrade-database {--F|force : Force all upgrades.}';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {

        $this->callInitialCommands();
        $commands = [
            // there are 14 upgrade commands.
            'firefly-iii:transaction-identifiers',
            'firefly-iii:migrate-to-groups',
            'firefly-iii:account-currencies',
            'firefly-iii:transfer-currencies',
            'firefly-iii:other-currencies',
            'firefly-iii:migrate-notes',
            'firefly-iii:migrate-attachments',
            'firefly-iii:bills-to-rules',
            'firefly-iii:bl-currency',
            'firefly-iii:cc-liabilities',
            'firefly-iii:back-to-journals',
            'firefly-iii:rename-account-meta',
            'firefly-iii:migrate-recurrence-meta',
            'firefly-iii:migrate-tag-locations',
            'firefly-iii:migrate-recurrence-type',

            // there are 16 verify commands.
            'firefly-iii:fix-piggies',
            'firefly-iii:create-link-types',
            'firefly-iii:create-access-tokens',
            'firefly-iii:remove-bills',
            'firefly-iii:enable-currencies',
            'firefly-iii:fix-transfer-budgets',
            'firefly-iii:fix-uneven-amount',
            'firefly-iii:delete-zero-amount',
            'firefly-iii:delete-orphaned-transactions',
            'firefly-iii:delete-empty-journals',
            'firefly-iii:delete-empty-groups',
            'firefly-iii:fix-account-types',
            'firefly-iii:fix-account-order',
            'firefly-iii:rename-meta-fields',
            'firefly-iii:fix-ob-currencies',
            'firefly-iii:fix-long-descriptions',
            'firefly-iii:fix-recurring-transactions',
            'firefly-iii:unify-group-accounts',
            'firefly-iii:fix-transaction-types',
            'firefly-iii:fix-frontpage-accounts',

            // two report commands
            'firefly-iii:report-empty-objects',
            'firefly-iii:report-sum',
            'firefly-iii:restore-oauth-keys',

            // instructions
            'firefly:instructions update',
        ];
        $args     = [];
        if ($this->option('force')) {
            $args = ['--force' => true];
        }
        foreach ($commands as $command) {
            $this->line(sprintf('Now executing %s', $command));
            Artisan::call($command, $args);
            $result = Artisan::output();
            echo $result;
        }
        // set new DB version.
        app('fireflyconfig')->set('db_version', (int)config('firefly.db_version'));
        // index will set FF3 version.
        app('fireflyconfig')->set('ff3_version', (string)config('firefly.version'));

        return 0;
    }

    private function callInitialCommands(): void
    {
        $this->line('Now seeding the database...');
        Artisan::call('migrate', ['--seed' => true, '--force' => true]);
        $result = Artisan::output();
        echo $result;

        $this->line('Fix PostgreSQL sequences.');
        Artisan::call('firefly-iii:fix-pgsql-sequences');
        $result = Artisan::output();
        echo $result;

        $this->line('Now decrypting the database (if necessary)...');
        Artisan::call('firefly-iii:decrypt-all');
        $result = Artisan::output();
        echo $result;

        $this->line('Now installing OAuth2 keys...');
        Artisan::call('passport:install');
        $result = Artisan::output();
        echo $result;

        $this->line('Done!');
    }
}
