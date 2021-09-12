<?php
/**
 * ConvertToDeposit.php
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

namespace FireflyIII\TransactionRules\Actions;

use DB;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Factory\AccountFactory;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\RuleAction;
use FireflyIII\Models\TransactionType;
use FireflyIII\User;
use Log;

/**
 *
 * Class ConvertToDeposit
 */
class ConvertToDeposit implements ActionInterface
{
    private RuleAction $action;

    /**
     * TriggerInterface constructor.
     *
     * @param RuleAction $action
     */
    public function __construct(RuleAction $action)
    {
        $this->action = $action;
    }

    /**
     * @inheritDoc
     * @throws FireflyException
     */
    public function actOnArray(array $journal): bool
    {
        Log::debug(sprintf('Convert journal #%d to deposit.', $journal['transaction_journal_id']));
        $type = $journal['transaction_type_type'];
        if (TransactionType::DEPOSIT === $type) {
            Log::error(sprintf('Journal #%d is already a deposit (rule #%d).', $journal['transaction_journal_id'], $this->action->rule_id));

            return false;
        }

        if (TransactionType::WITHDRAWAL === $type) {
            Log::debug('Going to transform a withdrawal to a deposit.');

            return $this->convertWithdrawalArray($journal);
        }
        if (TransactionType::TRANSFER === $type) {
            Log::debug('Going to transform a transfer to a deposit.');

            return $this->convertTransferArray($journal);
        }

        return false;
    }

    /**
     * Input is a withdrawal from A to B
     * Is converted to a deposit from C to A.
     *
     * @param array $journal
     *
     * @return bool
     * @throws FireflyException
     */
    private function convertWithdrawalArray(array $journal): bool
    {
        $user = User::find($journal['user_id']);
        // find or create revenue account.
        /** @var AccountFactory $factory */
        $factory = app(AccountFactory::class);
        $factory->setUser($user);

        // get the action value, or use the original destination name in case the action value is empty:
        // this becomes a new or existing revenue account.
        $revenueName = '' === $this->action->action_value ? $journal['destination_account_name'] : $this->action->action_value;
        $revenue     = $factory->findOrCreate($revenueName, AccountType::REVENUE);

        Log::debug(sprintf('ConvertToDeposit. Action value is "%s", revenue name is "%s"', $this->action->action_value, $journal['destination_account_name']));

        // update the source transaction and put in the new revenue ID.
        DB::table('transactions')
          ->where('transaction_journal_id', '=', $journal['transaction_journal_id'])
          ->where('amount', '<', 0)
          ->update(['account_id' => $revenue->id]);

        // update the destination transaction and put in the original source account ID.
        DB::table('transactions')
          ->where('transaction_journal_id', '=', $journal['transaction_journal_id'])
          ->where('amount', '>', 0)
          ->update(['account_id' => $journal['source_account_id']]);

        // change transaction type of journal:
        $newType = TransactionType::whereType(TransactionType::DEPOSIT)->first();

        DB::table('transaction_journals')
          ->where('id', '=', $journal['transaction_journal_id'])
          ->update(['transaction_type_id' => $newType->id]);

        Log::debug('Converted withdrawal to deposit.');

        return true;
    }

    /**
     * Input is a transfer from A to B.
     * Output is a deposit from C to B.
     *
     * @param array $journal
     *
     * @return bool
     * @throws FireflyException
     */
    private function convertTransferArray(array $journal): bool
    {
        $user = User::find($journal['user_id']);
        // find or create revenue account.
        /** @var AccountFactory $factory */
        $factory = app(AccountFactory::class);
        $factory->setUser($user);

        // get the action value, or use the original source name in case the action value is empty:
        // this becomes a new or existing revenue account.
        $revenueName = '' === $this->action->action_value ? $journal['source_account_name'] : $this->action->action_value;
        $revenue     = $factory->findOrCreate($revenueName, AccountType::REVENUE);

        Log::debug(sprintf('ConvertToDeposit. Action value is "%s", revenue name is "%s"', $this->action->action_value, $journal['source_account_name']));

        // update source transaction(s) to be revenue account
        DB::table('transactions')
          ->where('transaction_journal_id', '=', $journal['transaction_journal_id'])
          ->where('amount', '<', 0)
          ->update(['account_id' => $revenue->id]);

        // change transaction type of journal:
        $newType = TransactionType::whereType(TransactionType::DEPOSIT)->first();

        DB::table('transaction_journals')
          ->where('id', '=', $journal['transaction_journal_id'])
          ->update(['transaction_type_id' => $newType->id]);

        Log::debug('Converted transfer to deposit.');

        return true;
    }
}
