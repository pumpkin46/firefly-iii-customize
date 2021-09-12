<?php
/**
 * BudgetRepository.php
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

namespace FireflyIII\Repositories\Budget;

use Carbon\Carbon;
use DB;
use Exception;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\Attachment;
use FireflyIII\Models\AutoBudget;
use FireflyIII\Models\Budget;
use FireflyIII\Models\BudgetLimit;
use FireflyIII\Models\RecurrenceTransactionMeta;
use FireflyIII\Models\RuleAction;
use FireflyIII\Models\RuleTrigger;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Services\Internal\Destroy\BudgetDestroyService;
use FireflyIII\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Log;
use Storage;

/**
 * Class BudgetRepository.
 *
 */
class BudgetRepository implements BudgetRepositoryInterface
{
    /** @var User */
    private $user;

    /**
     * @return bool
     */
    public function cleanupBudgets(): bool
    {
        // delete limits with amount 0:
        try {
            BudgetLimit::where('amount', 0)->delete();
        } catch (Exception $e) { // @phpstan-ignore-line
            // @ignoreException
        }
        $budgets = $this->getActiveBudgets();
        /**
         * @var int    $index
         * @var Budget $budget
         */
        foreach ($budgets as $index => $budget) {
            $budget->order = $index + 1;
            $budget->save();
        }
        // other budgets, set to 0.
        $this->user->budgets()->where('active', 0)->update(['order' => 0]);

        return true;
    }

    /**
     * @param Budget $budget
     *
     * @return bool
     */
    public function destroy(Budget $budget): bool
    {
        /** @var BudgetDestroyService $service */
        $service = app(BudgetDestroyService::class);
        $service->destroy($budget);

        return true;
    }

    /**
     * Destroy all budgets.
     */
    public function destroyAll(): void
    {
        $budgets = $this->getBudgets();
        /** @var Budget $budget */
        foreach ($budgets as $budget) {
            DB::table('budget_transaction')->where('budget_id', (int)$budget->id)->delete();
            DB::table('budget_transaction_journal')->where('budget_id', (int)$budget->id)->delete();
            RecurrenceTransactionMeta::where('name', 'budget_id')->where('value', (string)$budget->id)->delete();
            RuleAction::where('action_type', 'set_budget')->where('action_value', (string)$budget->id)->delete();
            $budget->delete();
        }
    }

    /**
     * @inheritDoc
     */
    public function destroyAutoBudget(Budget $budget): void
    {
        /** @var AutoBudget $autoBudget */
        foreach ($budget->autoBudgets()->get() as $autoBudget) {
            $autoBudget->delete();
        }
    }

    /**
     * @param int|null    $budgetId
     * @param string|null $budgetName
     *
     * @return Budget|null
     */
    public function findBudget(?int $budgetId, ?string $budgetName): ?Budget
    {
        Log::debug('Now in findBudget()');
        Log::debug(sprintf('Searching for budget with ID #%d...', $budgetId));
        $result = $this->findNull((int)$budgetId);
        if (null === $result && null !== $budgetName && '' !== $budgetName) {
            Log::debug(sprintf('Searching for budget with name %s...', $budgetName));
            $result = $this->findByName((string)$budgetName);
        }
        if (null !== $result) {
            Log::debug(sprintf('Found budget #%d: %s', $result->id, $result->name));
        }
        Log::debug(sprintf('Found result is null? %s', var_export(null === $result, true)));

        return $result;
    }

    /**
     * Find budget by name.
     *
     * @param string|null $name
     *
     * @return Budget|null
     */
    public function findByName(?string $name): ?Budget
    {
        if (null === $name) {
            return null;
        }
        $query = sprintf('%%%s%%', $name);

        return $this->user->budgets()->where('name', 'LIKE', $query)->first();
    }

    /**
     * Find a budget or return NULL
     *
     * @param int $budgetId |null
     *
     * @return Budget|null
     */
    public function findNull(int $budgetId = null): ?Budget
    {
        if (null === $budgetId) {
            return null;
        }

        return $this->user->budgets()->find($budgetId);
    }

    /**
     * This method returns the oldest journal or transaction date known to this budget.
     * Will cache result.
     *
     * @param Budget $budget
     *
     * @return Carbon
     *
     */
    public function firstUseDate(Budget $budget): ?Carbon
    {
        $journal = $budget->transactionJournals()->orderBy('date', 'ASC')->first();
        if (null !== $journal) {
            return $journal->date;
        }

        return null;
    }

    /**
     * @return Collection
     */
    public function getActiveBudgets(): Collection
    {
        return $this->user->budgets()->where('active', true)
                          ->orderBy('order', 'ASC')
                          ->orderBy('name', 'ASC')
                          ->get();
    }

    /**
     * @inheritDoc
     */
    public function getAttachments(Budget $budget): Collection
    {
        $set = $budget->attachments()->get();

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
     * @inheritDoc
     */
    public function getAutoBudget(Budget $budget): ?AutoBudget
    {
        return $budget->autoBudgets()->first();
    }

    /**
     * @return Collection
     */
    public function getBudgets(): Collection
    {
        return $this->user->budgets()->orderBy('order', 'ASC')
                          ->orderBy('name', 'ASC')->get();
    }

    /**
     * Get all budgets with these ID's.
     *
     * @param array $budgetIds
     *
     * @return Collection
     */
    public function getByIds(array $budgetIds): Collection
    {
        return $this->user->budgets()->whereIn('id', $budgetIds)->get();
    }

    /**
     * @return Collection
     */
    public function getInactiveBudgets(): Collection
    {
        return $this->user->budgets()
                          ->orderBy('order', 'ASC')
                          ->orderBy('name', 'ASC')->where('active', 0)->get();
    }

    public function getMaxOrder(): int
    {
        return (int)$this->user->budgets()->max('order');
    }

    /**
     * @param string $query
     * @param int    $limit
     *
     * @return Collection
     */
    public function searchBudget(string $query, int $limit): Collection
    {

        $search = $this->user->budgets();
        if ('' !== $query) {
            $search->where('name', 'LIKE', sprintf('%%%s%%', $query));
        }
        $search->orderBy('order', 'ASC')
               ->orderBy('name', 'ASC')->where('active', true);

        return $search->take($limit)->get();
    }

    /**
     * @param Budget $budget
     * @param int    $order
     */
    public function setBudgetOrder(Budget $budget, int $order): void
    {
        $budget->order = $order;
        $budget->save();
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
     * @return Budget
     * @throws FireflyException
     */
    public function store(array $data): Budget
    {
        $order = $this->getMaxOrder();
        try {
            $newBudget = Budget::create(
                [
                    'user_id' => $this->user->id,
                    'name'    => $data['name'],
                    'order'   => $order + 1,
                    'active'  => array_key_exists('active', $data) ? $data['active'] : true,
                ]
            );
        } catch (QueryException $e) {
            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());
            throw new FireflyException('400002: Could not store budget.', 0, $e);
        }
        if (!array_key_exists('auto_budget_type', $data) || !array_key_exists('auto_budget_amount', $data) || !array_key_exists('auto_budget_period', $data)) {
            return $newBudget;
        }
        $type = $data['auto_budget_type'];
        if ('none' === $type) {
            return $newBudget;
        }
        if (0 === $type) {
            return $newBudget;
        }

        if ('reset' === $type) {
            $type = AutoBudget::AUTO_BUDGET_RESET;
        }
        if ('rollover' === $type) {
            $type = AutoBudget::AUTO_BUDGET_ROLLOVER;
        }

        $repos    = app(CurrencyRepositoryInterface::class);
        $currency = null;
        if (array_key_exists('currency_id', $data)) {
            $currency = $repos->findNull((int)$data['currency_id']);
        }
        if (array_key_exists('currency_code', $data)) {
            $currency = $repos->findByCode((string)$data['currency_code']);
        }
        if (null === $currency) {
            $currency = app('amount')->getDefaultCurrencyByUser($this->user);
        }

        $autoBudget = new AutoBudget;
        $autoBudget->budget()->associate($newBudget);
        $autoBudget->transaction_currency_id = $currency->id;
        $autoBudget->auto_budget_type        = $type;
        $autoBudget->amount                  = $data['auto_budget_amount'] ?? '1';
        $autoBudget->period                  = $data['auto_budget_period'] ?? 'monthly';
        $autoBudget->save();

        // create initial budget limit.
        $today = today(config('app.timezone'));
        $start = app('navigation')->startOfPeriod($today, $autoBudget->period);
        $end   = app('navigation')->endOfPeriod($start, $autoBudget->period);

        $limitRepos = app(BudgetLimitRepositoryInterface::class);
        $limitRepos->setUser($this->user);
        $limitRepos->store(
            [
                'budget_id'   => $newBudget->id,
                'currency_id' => $autoBudget->transaction_currency_id,
                'start_date'  => $start,
                'end_date'    => $end,
                'amount'      => $autoBudget->amount,
            ]
        );

        return $newBudget;
    }

    /**
     * @param Budget $budget
     * @param array  $data
     *
     * @return Budget
     */
    public function update(Budget $budget, array $data): Budget
    {
        Log::debug('Now in update()');

        $oldName = $budget->name;
        if (array_key_exists('name', $data)) {
            $budget->name = $data['name'];
            $this->updateRuleActions($oldName, $budget->name);
            $this->updateRuleTriggers($oldName, $budget->name);
        }
        if (array_key_exists('active', $data)) {
            $budget->active = $data['active'];
        }
        $budget->save();

        // update or create auto-budget:
        $autoBudget = $this->getAutoBudget($budget);

        // first things first: delete when no longer required:
        $autoBudgetType = array_key_exists('auto_budget_type', $data) ? $data['auto_budget_type'] : null;

        if (0 === $autoBudgetType && null !== $autoBudget) {
            // delete!
            $autoBudget->delete();

            return $budget;
        }
        if (0 === $autoBudgetType && null === $autoBudget) {
            return $budget;
        }
        if (null === $autoBudgetType && null === $autoBudget) {
            return $budget;
        }
        $this->updateAutoBudget($budget, $data);

        return $budget;
    }

    /**
     * @param Budget $budget
     * @param array  $data
     */
    private function updateAutoBudget(Budget $budget, array $data): void
    {
        // update or create auto-budget:
        $autoBudget = $this->getAutoBudget($budget);

        // grab default currency:
        $currency = app('amount')->getDefaultCurrencyByUser($this->user);

        if (null === $autoBudget) {
            // at this point it's a blind assumption auto_budget_type is 1 or 2.
            $autoBudget                          = new AutoBudget;
            $autoBudget->auto_budget_type        = $data['auto_budget_type'];
            $autoBudget->budget_id               = $budget->id;
            $autoBudget->transaction_currency_id = $currency->id;
        }

        // set or update the currency.
        if (array_key_exists('currency_id', $data) || array_key_exists('currency_code', $data)) {
            $repos        = app(CurrencyRepositoryInterface::class);
            $currencyId   = (int)($data['currency_id'] ?? 0);
            $currencyCode = (string)($data['currency_code'] ?? '');
            $currency     = $repos->findNull($currencyId);
            if (null === $currency) {
                $currency = $repos->findByCodeNull($currencyCode);
            }
            if (null !== $currency) {
                $autoBudget->transaction_currency_id = $currency->id;
            }
        }

        // change values if submitted or presented:
        if (array_key_exists('auto_budget_type', $data)) {
            $autoBudget->auto_budget_type = $data['auto_budget_type'];
        }
        if (array_key_exists('auto_budget_amount', $data)) {
            $autoBudget->amount = $data['auto_budget_amount'];

        }
        if (array_key_exists('auto_budget_period', $data)) {
            $autoBudget->period = $data['auto_budget_period'];
        }

        $autoBudget->save();
    }

    /**
     * @param string $oldName
     * @param string $newName
     */
    private function updateRuleActions(string $oldName, string $newName): void
    {
        $types   = ['set_budget',];
        $actions = RuleAction::leftJoin('rules', 'rules.id', '=', 'rule_actions.rule_id')
                             ->where('rules.user_id', $this->user->id)
                             ->whereIn('rule_actions.action_type', $types)
                             ->where('rule_actions.action_value', $oldName)
                             ->get(['rule_actions.*']);
        Log::debug(sprintf('Found %d actions to update.', $actions->count()));
        /** @var RuleAction $action */
        foreach ($actions as $action) {
            $action->action_value = $newName;
            $action->save();
            Log::debug(sprintf('Updated action %d: %s', $action->id, $action->action_value));
        }
    }

    /**
     * @param string $oldName
     * @param string $newName
     */
    private function updateRuleTriggers(string $oldName, string $newName): void
    {
        $types    = ['budget_is',];
        $triggers = RuleTrigger::leftJoin('rules', 'rules.id', '=', 'rule_triggers.rule_id')
                               ->where('rules.user_id', $this->user->id)
                               ->whereIn('rule_triggers.trigger_type', $types)
                               ->where('rule_triggers.trigger_value', $oldName)
                               ->get(['rule_triggers.*']);
        Log::debug(sprintf('Found %d triggers to update.', $triggers->count()));
        /** @var RuleTrigger $trigger */
        foreach ($triggers as $trigger) {
            $trigger->trigger_value = $newName;
            $trigger->save();
            Log::debug(sprintf('Updated trigger %d: %s', $trigger->id, $trigger->trigger_value));
        }
    }
}
