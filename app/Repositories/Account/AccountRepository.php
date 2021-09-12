<?php
/**
 * AccountRepository.php
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

namespace FireflyIII\Repositories\Account;

use Carbon\Carbon;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Factory\AccountFactory;
use FireflyIII\Models\Account;
use FireflyIII\Models\AccountMeta;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\Attachment;
use FireflyIII\Models\Location;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Models\TransactionType;
use FireflyIII\Services\Internal\Destroy\AccountDestroyService;
use FireflyIII\Services\Internal\Update\AccountUpdateService;
use FireflyIII\User;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Log;
use Storage;

/**
 * Class AccountRepository.
 *
 */
class AccountRepository implements AccountRepositoryInterface
{
    private User $user;

    /**
     * @param array $types
     *
     * @return int
     */
    public function count(array $types): int
    {
        return $this->user->accounts()->accountTypeIn($types)->count();
    }

    /**
     * Moved here from account CRUD.
     *
     * @param Account      $account
     * @param Account|null $moveTo
     *
     * @return bool
     *

     */
    public function destroy(Account $account, ?Account $moveTo): bool
    {
        /** @var AccountDestroyService $service */
        $service = app(AccountDestroyService::class);
        $service->destroy($account, $moveTo);

        return true;
    }

    /**
     * Find account with same name OR same IBAN or both, but not the same type or ID.
     *
     * @param Collection $accounts
     *
     * @return Collection
     */
    public function expandWithDoubles(Collection $accounts): Collection
    {
        $result = new Collection;
        /** @var Account $account */
        foreach ($accounts as $account) {
            $byName = $this->user->accounts()->where('name', $account->name)
                                 ->where('id', '!=', $account->id)->first();
            if (null !== $byName) {
                $result->push($account);
                $result->push($byName);
                continue;
            }
            if (null !== $account->iban) {
                $byIban = $this->user->accounts()->where('iban', $account->iban)
                                     ->where('id', '!=', $account->id)->first();
                if (null !== $byIban) {
                    $result->push($account);
                    $result->push($byIban);
                    continue;
                }
            }
            $result->push($account);
        }

        return $result;

    }

    /**
     * @param string $iban
     * @param array  $types
     *
     * @return Account|null
     */
    public function findByIbanNull(string $iban, array $types): ?Account
    {
        $query = $this->user->accounts()->where('accounts.iban', $iban);

        if (0 !== count($types)) {
            $query->leftJoin('account_types', 'accounts.account_type_id', '=', 'account_types.id');
            $query->whereIn('account_types.type', $types);
        }

        return $query->first(['accounts.*']);
    }

    /**
     * @param string $name
     * @param array  $types
     *
     * @return Account|null
     */
    public function findByName(string $name, array $types): ?Account
    {
        $query = $this->user->accounts();

        if (0 !== count($types)) {
            $query->leftJoin('account_types', 'accounts.account_type_id', '=', 'account_types.id');
            $query->whereIn('account_types.type', $types);
        }
        Log::debug(sprintf('Searching for account named "%s" (of user #%d) of the following type(s)', $name, $this->user->id), ['types' => $types]);

        $accounts = $query->get(['accounts.*']);

        // TODO no longer need to loop like this

        /** @var Account $account */
        foreach ($accounts as $account) {
            if ($account->name === $name) {
                Log::debug(sprintf('Found #%d (%s) with type id %d', $account->id, $account->name, $account->account_type_id));

                return $account;
            }
        }
        Log::debug(sprintf('There is no account with name "%s" of types', $name), $types);

        return null;
    }

    /**
     * @param int $accountId
     *
     * @return Account|null
     */
    public function findNull(int $accountId): ?Account
    {
        return $this->user->accounts()->find($accountId);
    }

    /**
     * @param Account $account
     *
     * @return TransactionCurrency|null
     */
    public function getAccountCurrency(Account $account): ?TransactionCurrency
    {
        $currencyId = (int)$this->getMetaValue($account, 'currency_id');
        if ($currencyId > 0) {
            return TransactionCurrency::find($currencyId);
        }

        return null;
    }

    /**
     * Return account type or null if not found.
     *
     * @param string $type
     *
     * @return AccountType|null
     */
    public function getAccountTypeByType(string $type): ?AccountType
    {
        return AccountType::whereType(ucfirst($type))->first();
    }

    /**
     * @param array $accountIds
     *
     * @return Collection
     */
    public function getAccountsById(array $accountIds): Collection
    {
        $query = $this->user->accounts();

        if (0 !== count($accountIds)) {
            $query->whereIn('accounts.id', $accountIds);
        }
        $query->orderBy('accounts.order', 'ASC');
        $query->orderBy('accounts.active', 'DESC');
        $query->orderBy('accounts.name', 'ASC');

        return $query->get(['accounts.*']);
    }

    /**
     * @param array $types
     *
     * @return Collection
     */
    public function getAccountsByType(array $types): Collection
    {
        $query = $this->user->accounts();
        if (0 !== count($types)) {
            $query->accountTypeIn($types);
        }
        $res = array_intersect([AccountType::ASSET, AccountType::MORTGAGE, AccountType::LOAN, AccountType::DEBT], $types);
        if (0 !== count($res)) {
            $query->orderBy('accounts.order', 'ASC');
        }
        $query->orderBy('accounts.active', 'DESC');
        $query->orderBy('accounts.name', 'ASC');

        return $query->get(['accounts.*']);

    }

    /**
     * @param array $types
     *
     * @return Collection
     */
    public function getActiveAccountsByType(array $types): Collection
    {
        $query = $this->user->accounts()->with(
            ['accountmeta' => function (HasMany $query) {
                $query->where('name', 'account_role');
            }, 'attachments']
        );
        if (0 !== count($types)) {
            $query->accountTypeIn($types);
        }
        $query->where('active', true);
        $query->orderBy('accounts.account_type_id', 'ASC');
        $query->orderBy('accounts.order', 'ASC');
        $query->orderBy('accounts.name', 'ASC');

        return $query->get(['accounts.*']);
    }

    /**
     * @inheritDoc
     */
    public function getAttachments(Account $account): Collection
    {
        $set = $account->attachments()->get();

        /** @var Storage $disk */
        $disk = Storage::disk('upload');

        return $set->each(
            static function (Attachment $attachment) use ($disk) {
                $notes                   = $attachment->notes()->first();
                $attachment->file_exists = $disk->exists($attachment->fileName());
                $attachment->notes       = $notes ? $notes->text : '';

                return $attachment;
            }
        );
    }

    /**
     * @return Account
     *
     * @throws FireflyException
     */
    public function getCashAccount(): Account
    {
        /** @var AccountType $type */
        $type = AccountType::where('type', AccountType::CASH)->first();
        /** @var AccountFactory $factory */
        $factory = app(AccountFactory::class);
        $factory->setUser($this->user);

        return $factory->findOrCreate('Cash account', $type->type);
    }

    /**
     * @param array $types
     *
     * @return Collection
     */
    public function getInactiveAccountsByType(array $types): Collection
    {
        $query = $this->user->accounts()->with(
            ['accountmeta' => function (HasMany $query) {
                $query->where('name', 'account_role');
            }]
        );
        if (0 !== count($types)) {
            $query->accountTypeIn($types);
        }
        $query->where('active', 0);
        $query->orderBy('accounts.account_type_id', 'ASC');
        $query->orderBy('accounts.order', 'ASC');
        $query->orderBy('accounts.name', 'ASC');

        return $query->get(['accounts.*']);
    }

    /**
     * @inheritDoc
     */
    public function getLocation(Account $account): ?Location
    {
        return $account->locations()->first();
    }

    /**
     * Return meta value for account. Null if not found.
     *
     * @param Account $account
     * @param string  $field
     *
     * @return null|string
     */
    public function getMetaValue(Account $account, string $field): ?string
    {
        $result = $account->accountMeta->filter(
            function (AccountMeta $meta) use ($field) {
                return strtolower($meta->name) === strtolower($field);
            }
        );
        if (0 === $result->count()) {
            return null;
        }
        if (1 === $result->count()) {
            return (string)$result->first()->data;
        }

        return null;
    }

    /**
     * Get note text or null.
     *
     * @param Account $account
     *
     * @return null|string
     */
    public function getNoteText(Account $account): ?string
    {
        $note = $account->notes()->first();

        if (null === $note) {
            return null;
        }

        return $note->text;
    }

    /**
     * @param Account $account
     *
     * @return TransactionJournal|null
     */
    public function getOpeningBalance(Account $account): ?TransactionJournal
    {
        return TransactionJournal
            ::leftJoin('transactions', 'transactions.transaction_journal_id', '=', 'transaction_journals.id')
            ->where('transactions.account_id', $account->id)
            ->transactionTypes([TransactionType::OPENING_BALANCE])
            ->first(['transaction_journals.*']);
    }

    /**
     * Returns the amount of the opening balance for this account.
     *
     * @param Account $account
     *
     * @return string
     */
    public function getOpeningBalanceAmount(Account $account): ?string
    {

        $journal = TransactionJournal::leftJoin('transactions', 'transactions.transaction_journal_id', '=', 'transaction_journals.id')
                                     ->where('transactions.account_id', $account->id)
                                     ->transactionTypes([TransactionType::OPENING_BALANCE])
                                     ->first(['transaction_journals.*']);
        if (null === $journal) {
            return null;
        }
        $transaction = $journal->transactions()->where('account_id', $account->id)->first();
        if (null === $transaction) {
            return null;
        }

        return (string)$transaction->amount;
    }

    /**
     * Return date of opening balance as string or null.
     *
     * @param Account $account
     *
     * @return null|string
     */
    public function getOpeningBalanceDate(Account $account): ?string
    {
        $journal = TransactionJournal::leftJoin('transactions', 'transactions.transaction_journal_id', '=', 'transaction_journals.id')
                                     ->where('transactions.account_id', $account->id)
                                     ->transactionTypes([TransactionType::OPENING_BALANCE])
                                     ->first(['transaction_journals.*']);
        if (null === $journal) {
            return null;
        }

        return $journal->date->format('Y-m-d');
    }

    /**
     * @param Account $account
     *
     * @return TransactionGroup|null
     */
    public function getOpeningBalanceGroup(Account $account): ?TransactionGroup
    {
        $journal = $this->getOpeningBalance($account);
        $group   = null;
        if (null !== $journal) {
            $group = $journal->transactionGroup;
        }

        return $group;
    }

    /**
     * @param Account $account
     *
     * @return Collection
     */
    public function getPiggyBanks(Account $account): Collection
    {
        return $account->piggyBanks()->get();
    }

    /**
     * @param Account $account
     *
     * @return Account|null
     *
     * @throws FireflyException
     */
    public function getReconciliation(Account $account): ?Account
    {
        if (AccountType::ASSET !== $account->accountType->type) {
            throw new FireflyException(sprintf('%s is not an asset account.', $account->name));
        }
        $currency = $this->getAccountCurrency($account) ?? app('amount')->getDefaultCurrency();
        $name     = trans('firefly.reconciliation_account_name', ['name' => $account->name, 'currency' => $currency->code]);

        /** @var AccountType $type */
        $type    = AccountType::where('type', AccountType::RECONCILIATION)->first();
        $current = $this->user->accounts()->where('account_type_id', $type->id)
                              ->where('name', $name)
                              ->first();

        /** @var Account $current */
        if (null !== $current) {
            return $current;
        }

        $data = [
            'account_type_id'   => null,
            'account_type_name' => AccountType::RECONCILIATION,
            'active'            => true,
            'name'              => $name,
            'currency_id'       => $currency->id,
            'currency_code'     => $currency->code,
        ];

        /** @var AccountFactory $factory */
        $factory = app(AccountFactory::class);
        $factory->setUser($account->user);

        return $factory->create($data);
    }

    /**
     * @inheritDoc
     */
    public function getUsedCurrencies(Account $account): Collection
    {
        $info        = $account->transactions()->get(['transaction_currency_id', 'foreign_currency_id'])->toArray();
        $currencyIds = [];
        foreach ($info as $entry) {
            $currencyIds[] = (int)$entry['transaction_currency_id'];
            $currencyIds[] = (int)$entry['foreign_currency_id'];
        }
        $currencyIds = array_unique($currencyIds);

        return TransactionCurrency::whereIn('id', $currencyIds)->get();
    }

    /**
     * @param Account $account
     *
     * @return bool
     */
    public function isLiability(Account $account): bool
    {
        return in_array($account->accountType->type, [AccountType::CREDITCARD, AccountType::LOAN, AccountType::DEBT, AccountType::MORTGAGE], true);
    }

    /**
     * @inheritDoc
     */
    public function maxOrder(string $type): int
    {
        $sets = [
            AccountType::ASSET    => [AccountType::DEFAULT, AccountType::ASSET],
            AccountType::EXPENSE  => [AccountType::EXPENSE, AccountType::BENEFICIARY],
            AccountType::REVENUE  => [AccountType::REVENUE],
            AccountType::LOAN     => [AccountType::LOAN, AccountType::DEBT, AccountType::CREDITCARD, AccountType::MORTGAGE],
            AccountType::DEBT     => [AccountType::LOAN, AccountType::DEBT, AccountType::CREDITCARD, AccountType::MORTGAGE],
            AccountType::MORTGAGE => [AccountType::LOAN, AccountType::DEBT, AccountType::CREDITCARD, AccountType::MORTGAGE],
        ];
        if (array_key_exists(ucfirst($type), $sets)) {
            $order = (int)$this->getAccountsByType($sets[ucfirst($type)])->max('order');
            Log::debug(sprintf('Return max order of "%s" set: %d', $type, $order));

            return $order;
        }
        $specials = [AccountType::CASH, AccountType::INITIAL_BALANCE, AccountType::IMPORT, AccountType::RECONCILIATION];

        $order = (int)$this->getAccountsByType($specials)->max('order');
        Log::debug(sprintf('Return max order of "%s" set (specials!): %d', $type, $order));

        return $order;
    }

    /**
     * Returns the date of the very first transaction in this account.
     *
     * @param Account $account
     *
     * @return TransactionJournal|null
     */
    public function oldestJournal(Account $account): ?TransactionJournal
    {
        $first = $account->transactions()
                         ->leftJoin('transaction_journals', 'transaction_journals.id', '=', 'transactions.transaction_journal_id')
                         ->orderBy('transaction_journals.date', 'ASC')
                         ->orderBy('transaction_journals.order', 'DESC')
                         ->where('transaction_journals.user_id', $this->user->id)
                         ->orderBy('transaction_journals.id', 'ASC')
                         ->first(['transaction_journals.id']);
        if (null !== $first) {
            return TransactionJournal::find((int)$first->id);
        }

        return null;
    }

    /**
     * Returns the date of the very first transaction in this account.
     *
     * @param Account $account
     *
     * @return Carbon|null
     */
    public function oldestJournalDate(Account $account): ?Carbon
    {
        $result  = null;
        $journal = $this->oldestJournal($account);
        if (null !== $journal) {
            $result = $journal->date;
        }

        return $result;
    }

    /**
     * @inheritDoc
     */
    public function resetAccountOrder(): void
    {
        $sets = [
            [AccountType::DEFAULT, AccountType::ASSET],
            //[AccountType::EXPENSE, AccountType::BENEFICIARY],
            //[AccountType::REVENUE],
            [AccountType::LOAN, AccountType::DEBT, AccountType::CREDITCARD, AccountType::MORTGAGE],
            //[AccountType::CASH, AccountType::INITIAL_BALANCE, AccountType::IMPORT, AccountType::RECONCILIATION],
        ];
        foreach ($sets as $set) {
            Log::debug('Now in resetAccountOrder', $set);
            $list  = $this->getAccountsByType($set);
            $index = 1;
            foreach ($list as $account) {
                if (false === $account->active) {
                    $account->order = 0;
                    continue;
                }
                if ($index !== (int)$account->order) {
                    Log::debug(sprintf('Account #%d ("%s"): order should %d be but is %d.', $account->id, $account->name, $index, $account->order));
                    $account->order = $index;
                    $account->save();
                }
                $index++;
            }
        }
    }

    /**
     * @param string $query
     * @param array  $types
     * @param int    $limit
     *
     * @return Collection
     */
    public function searchAccount(string $query, array $types, int $limit): Collection
    {
        $dbQuery = $this->user->accounts()
                              ->where('active', true)
                              ->orderBy('accounts.order', 'ASC')
                              ->orderBy('accounts.account_type_id', 'ASC')
                              ->orderBy('accounts.name', 'ASC')
                              ->with(['accountType']);
        if ('' !== $query) {
            // split query on spaces just in case:
            $parts = explode(' ', $query);
            foreach ($parts as $part) {
                $search = sprintf('%%%s%%', $part);
                $dbQuery->where('name', 'LIKE', $search);
            }

        }
        if (0 !== count($types)) {
            $dbQuery->leftJoin('account_types', 'accounts.account_type_id', '=', 'account_types.id');
            $dbQuery->whereIn('account_types.type', $types);
        }

        return $dbQuery->take($limit)->get(['accounts.*']);
    }

    /**
     * @inheritDoc
     */
    public function searchAccountNr(string $query, array $types, int $limit): Collection
    {
        $dbQuery = $this->user->accounts()->distinct()
                              ->leftJoin('account_meta', 'accounts.id', '=', 'account_meta.account_id')
                              ->where('accounts.active', true)
                              ->orderBy('accounts.order', 'ASC')
                              ->orderBy('accounts.account_type_id', 'ASC')
                              ->orderBy('accounts.name', 'ASC')
                              ->with(['accountType', 'accountMeta']);
        if ('' !== $query) {
            // split query on spaces just in case:
            $parts = explode(' ', $query);
            foreach ($parts as $part) {
                $search = sprintf('%%%s%%', $part);
                $dbQuery->where(
                    function (EloquentBuilder $q1) use ($search) {
                        $q1->where('accounts.iban', 'LIKE', $search);
                        $q1->orWhere(
                            function (EloquentBuilder $q2) use ($search) {
                                $q2->where('account_meta.name', '=', 'account_number');
                                $q2->where('account_meta.data', 'LIKE', $search);
                            }
                        );
                    }
                );
            }
        }
        if (0 !== count($types)) {
            $dbQuery->leftJoin('account_types', 'accounts.account_type_id', '=', 'account_types.id');
            $dbQuery->whereIn('account_types.type', $types);
        }

        return $dbQuery->take($limit)->get(['accounts.*']);
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @param array $data
     *
     * @return Account
     * @throws FireflyException
     */
    public function store(array $data): Account
    {
        /** @var AccountFactory $factory */
        $factory = app(AccountFactory::class);
        $factory->setUser($this->user);

        return $factory->create($data);
    }

    /**
     * @param Account $account
     * @param array   $data
     *
     * @return Account
     * @throws FireflyException
     */
    public function update(Account $account, array $data): Account
    {
        /** @var AccountUpdateService $service */
        $service = app(AccountUpdateService::class);

        return $service->update($account, $data);
    }

    /**
     * @inheritDoc
     */
    public function findByAccountNumber(string $number, array $types): ?Account
    {
        $dbQuery = $this->user
            ->accounts()
            ->leftJoin('account_meta', 'accounts.id', '=', 'account_meta.account_id')
            ->where('accounts.active', true)
            ->where(
                function (EloquentBuilder $q1) use ($number) {
                    $json = json_encode($number);
                    $q1->where('account_meta.name', '=', 'account_number');
                    $q1->where('account_meta.data', '=', $json);
                }
            );

        if (0 !== count($types)) {
            $dbQuery->leftJoin('account_types', 'accounts.account_type_id', '=', 'account_types.id');
            $dbQuery->whereIn('account_types.type', $types);
        }

        return $dbQuery->first(['accounts.*']);
    }
}
