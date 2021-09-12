<?php
/**
 * IsAssetAccountId.php
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

namespace FireflyIII\Rules;

use FireflyIII\Models\Account;
use FireflyIII\Models\AccountType;
use Illuminate\Contracts\Validation\Rule;

/**
 *
 * Class IsAssetAccountId
 */
class IsAssetAccountId implements Rule
{
    /**
     * Get the validation error message. This is not translated because only the API uses it.
     *
     * @return string
     * @codeCoverageIgnore
     */
    public function message(): string
    {
        return 'This is not an asset account.';
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed  $value
     *
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        $accountId = (int)$value;
        $account   = Account::with('accountType')->find($accountId);
        if (null === $account) {
            return false;
        }
        if ($account->accountType->type !== AccountType::ASSET && $account->accountType->type !== AccountType::DEFAULT) {
            return false;
        }

        return true;
    }
}
