<?php

/*
 * FixFrontpageAccounts.php
 * Copyright (c) 2021 james@firefly-iii.org
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

namespace FireflyIII\Console\Commands\Correction;

use FireflyIII\Models\AccountType;
use FireflyIII\Models\Preference;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Support\Facades\Preferences;
use FireflyIII\User;
use Illuminate\Console\Command;

/**
 * Class FixFrontpageAccounts
 */
class FixFrontpageAccounts extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fixes a preference that may include deleted accounts or accounts of another type.';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firefly-iii:fix-frontpage-accounts';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $start          = microtime(true);

        $users = User::get();
        /** @var User $user */
        foreach ($users as $user) {
            $preference = Preferences::getForUser($user, 'frontPageAccounts', null);
            if (null !== $preference) {
                $this->fixPreference($preference);
            }
        }
        $end = round(microtime(true) - $start, 2);
        $this->info(sprintf('Verifying account preferences took %s seconds', $end));

        return 0;
    }

    /**
     * @param Preference $preference
     */
    private function fixPreference(Preference $preference): void
    {
        $fixed = [];
        /** @var AccountRepositoryInterface $repository */
        $repository = app(AccountRepositoryInterface::class);
        if (null === $preference->user) {
            return;
        }
        $repository->setUser($preference->user);
        $data = $preference->data;
        if (is_array($data)) {
            /** @var string $accountId */
            foreach ($data as $accountId) {
                $accountId = (int)$accountId;
                $account   = $repository->findNull($accountId);
                if (null !== $account) {
                    if (
                        in_array($account->accountType->type, [AccountType::ASSET, AccountType::DEBT, AccountType::LOAN, AccountType::MORTGAGE], true)
                    && true === $account->active
                    ) {
                        $fixed[] = $account->id;
                        continue;
                    }
                }
            }
        }
        Preferences::setForUser($preference->user, 'frontPageAccounts', $fixed);
    }
}
