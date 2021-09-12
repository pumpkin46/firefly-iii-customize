<?php

/**
 * AccountMetaFactory.php
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

namespace FireflyIII\Factory;

use Exception;
use FireflyIII\Models\Account;
use FireflyIII\Models\AccountMeta;
use Log;

/**
 * Class AccountMetaFactory
 */
class AccountMetaFactory
{
    /**
     * Create update or delete meta data.
     *
     * @param Account $account
     * @param string  $field
     * @param string  $value
     *
     * @return AccountMeta|null
     */
    public function crud(Account $account, string $field, string $value): ?AccountMeta
    {
        /** @var AccountMeta $entry */
        $entry = $account->accountMeta()->where('name', $field)->first();
        // must not be an empty string:
        if ('' !== $value) {

            // if $data has field and $entry is null, create new one:
            if (null === $entry) {
                Log::debug(sprintf('Created meta-field "%s":"%s" for account #%d ("%s") ', $field, $value, $account->id, $account->name));

                return $this->create(['account_id' => $account->id, 'name' => $field, 'data' => $value]);
            }

            // if $data has field and $entry is not null, update $entry:
            if (null !== $entry) {
                $entry->data = $value;
                $entry->save();
                Log::debug(sprintf('Updated meta-field "%s":"%s" for #%d ("%s") ', $field, $value, $account->id, $account->name));
            }
        }
        if ('' === $value && null !== $entry) {
            try {
                $entry->delete();
            } catch (Exception $e) { // @phpstan-ignore-line
                Log::debug(sprintf('Could not delete entry: %s', $e->getMessage())); 
            }

            return null;
        }

        return $entry;
    }

    /**
     * @param array $data
     *
     * @return AccountMeta|null
     */
    public function create(array $data): ?AccountMeta
    {
        return AccountMeta::create($data);
    }

}
