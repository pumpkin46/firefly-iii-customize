<?php
/**
 * ClearBudget.php
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
use FireflyIII\Models\RuleAction;
use Log;

/**
 * Class ClearBudget.
 */
class ClearBudget implements ActionInterface
{
    /**
     * @inheritDoc
     */
    public function actOnArray(array $journal): bool
    {
        DB::table('budget_transaction_journal')->where('transaction_journal_id', '=', $journal['transaction_journal_id'])->delete();

        Log::debug(sprintf('RuleAction ClearBudget removed all budgets from journal %d.', $journal['transaction_journal_id']));

        return true;
    }
}
