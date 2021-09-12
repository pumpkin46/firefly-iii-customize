<?php
/**
 * CreateStuff.php
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

namespace FireflyIII\Support\Http\Controllers;

use Carbon\Carbon;
use FireflyIII\Http\Requests\NewUserFormRequest;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\User;
use Laravel\Passport\Passport;
use Log;
use phpseclib\Crypt\RSA as LegacyRSA;
use phpseclib3\Crypt\RSA;

/**
 * Trait CreateStuff
 *
 */
trait CreateStuff
{

    /**
     * Creates an asset account.
     *
     * @param NewUserFormRequest  $request
     * @param TransactionCurrency $currency
     *
     * @return bool
     */
    protected function createAssetAccount(NewUserFormRequest $request, TransactionCurrency $currency): bool // create stuff
    {
        /** @var AccountRepositoryInterface $repository */
        $repository   = app(AccountRepositoryInterface::class);
        $assetAccount = [
            'name'                 => $request->get('bank_name'),
            'iban'                 => null,
            'account_type_name'    => 'asset',
            'virtual_balance'      => 0,
            'account_type_id'      => null,
            'active'               => true,
            'account_role'         => 'defaultAsset',
            'opening_balance'      => $request->input('bank_balance'),
            'opening_balance_date' => new Carbon,
            'currency_id'          => $currency->id,
        ];

        $repository->store($assetAccount);

        return true;
    }

    /**
     * Creates a cash wallet.
     *
     * @param TransactionCurrency $currency
     * @param string              $language
     *
     * @return bool
     */
    protected function createCashWalletAccount(TransactionCurrency $currency, string $language): bool // create stuff
    {
        /** @var AccountRepositoryInterface $repository */
        $repository   = app(AccountRepositoryInterface::class);
        $assetAccount = [
            'name'                 => (string)trans('firefly.cash_wallet', [], $language),
            'iban'                 => null,
            'account_type_name'         => 'asset',
            'virtual_balance'      => 0,
            'account_type_id'      => null,
            'active'               => true,
            'account_role'         => 'cashWalletAsset',
            'opening_balance'      => null,
            'opening_balance_date' => null,
            'currency_id'          => $currency->id,
        ];

        $repository->store($assetAccount);

        return true;
    }

    /**
     * Create new RSA keys.
     */
    protected function createOAuthKeys(): void // create stuff
    {
        [$publicKey, $privateKey] = [
            Passport::keyPath('oauth-public.key'),
            Passport::keyPath('oauth-private.key'),
        ];

        if (file_exists($publicKey) || file_exists($privateKey)) {
            return;
        }

        // switch on class existence.
        $keys= [];
        Log::info(sprintf('PHP version is %s', phpversion()));
        if (class_exists(LegacyRSA::class)) {
            // PHP 7
            Log::info('Will run PHP7 code.');
            $keys = (new LegacyRSA)->createKey(4096);
        }

        if (!class_exists(LegacyRSA::class)) {
            // PHP 8
            Log::info('Will run PHP8 code.');
            $keys = RSA::createKey(4096);
        }


        Log::alert('NO OAuth keys were found. They have been created.');

        file_put_contents($publicKey, $keys['publickey']);
        file_put_contents($privateKey, $keys['privatekey']);
    }

    /**
     * Create a savings account.
     *
     * @param NewUserFormRequest  $request
     * @param TransactionCurrency $currency
     * @param string              $language
     *
     * @return bool
     */
    protected function createSavingsAccount(NewUserFormRequest $request, TransactionCurrency $currency, string $language): bool // create stuff
    {
        /** @var AccountRepositoryInterface $repository */
        $repository     = app(AccountRepositoryInterface::class);
        $savingsAccount = [
            'name'                 => (string)trans('firefly.new_savings_account', ['bank_name' => $request->get('bank_name')], $language),
            'iban'                 => null,
            'account_type_name'         => 'asset',
            'account_type_id'      => null,
            'virtual_balance'      => 0,
            'active'               => true,
            'account_role'         => 'savingAsset',
            'opening_balance'      => $request->input('savings_balance'),
            'opening_balance_date' => new Carbon,
            'currency_id'          => $currency->id,
        ];
        $repository->store($savingsAccount);

        return true;
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     *
     * @return User
     */
    protected function createUser(array $data): User // create object
    {
        return User::create(
            [
                'email'    => $data['email'],
                'password' => bcrypt($data['password']),
            ]
        );
    }

}
