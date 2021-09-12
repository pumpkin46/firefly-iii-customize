<?php
/**
 * BillUpdateService.php
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

namespace FireflyIII\Services\Internal\Update;

use FireflyIII\Factory\TransactionCurrencyFactory;
use FireflyIII\Models\Bill;
use FireflyIII\Models\Rule;
use FireflyIII\Models\RuleTrigger;
use FireflyIII\Repositories\Bill\BillRepositoryInterface;
use FireflyIII\Repositories\ObjectGroup\CreatesObjectGroups;
use FireflyIII\Services\Internal\Support\BillServiceTrait;
use FireflyIII\User;
use Illuminate\Support\Collection;
use Log;

/**
 * @codeCoverageIgnore
 * Class BillUpdateService
 */
class BillUpdateService
{
    use BillServiceTrait, CreatesObjectGroups;

    protected User $user;

    /**
     * @param Bill  $bill
     * @param array $data
     *
     * @return Bill
     */
    public function update(Bill $bill, array $data): Bill
    {
        $this->user = $bill->user;

        if (array_key_exists('currency_id', $data) || array_key_exists('currency_code', $data)) {
            $factory  = app(TransactionCurrencyFactory::class);
            $currency = $factory->find((int)($data['currency_id'] ?? null), $data['currency_code'] ?? null) ??
                        app('amount')->getDefaultCurrencyByUser($bill->user);

            // enable the currency if it isn't.
            $currency->enabled = true;
            $currency->save();
            $bill->transaction_currency_id = $currency->id;
            $bill->save();
        }
        // update bill properties:
        $bill = $this->updateBillProperties($bill, $data);
        $bill->save();
        $bill->refresh();
        // old values
        $oldData = [
            'name'                      => $bill->name,
            'amount_min'                => $bill->amount_min,
            'amount_max'                => $bill->amount_max,
            'transaction_currency_name' => $bill->transactionCurrency->name,
        ];
        // update note:
        if (array_key_exists('notes', $data)) {
            $this->updateNote($bill, (string)$data['notes']);
        }

        // update order.
        if (array_key_exists('order', $data)) {
            // update the order of the piggy bank:
            $oldOrder = (int)$bill->order;
            $newOrder = (int)($data['order'] ?? $oldOrder);
            if ($oldOrder !== $newOrder) {
                $this->updateOrder($bill, $oldOrder, $newOrder);
            }
        }

        // update rule actions.
        if (array_key_exists('name', $data)) {
            $this->updateBillActions($bill, $oldData['name'], $data['name']);
            $this->updateBillTriggers($bill, $oldData, $data);
        }

        // update using name:
        if (array_key_exists('object_group_title', $data)) {
            $objectGroupTitle = $data['object_group_title'] ?? '';
            if ('' !== $objectGroupTitle) {
                $objectGroup = $this->findOrCreateObjectGroup($objectGroupTitle);
                if (null !== $objectGroup) {
                    $bill->objectGroups()->sync([$objectGroup->id]);
                    $bill->save();
                }

                return $bill;
            }
            // remove if name is empty. Should be overruled by ID.
            if ('' === $objectGroupTitle) {
                $bill->objectGroups()->sync([]);
                $bill->save();
            }
        }
        if (array_key_exists('object_group_id', $data)) {
            // try also with ID:
            $objectGroupId = (int)($data['object_group_id'] ?? 0);
            if (0 !== $objectGroupId) {
                $objectGroup = $this->findObjectGroupById($objectGroupId);
                if (null !== $objectGroup) {
                    $bill->objectGroups()->sync([$objectGroup->id]);
                    $bill->save();
                }

                return $bill;
            }
            if (0 === $objectGroupId) {
                $bill->objectGroups()->sync([]);
                $bill->save();
            }
        }

        return $bill;
    }

    /**
     * @param Bill  $bill
     * @param array $data
     *
     * @return Bill
     */
    private function updateBillProperties(Bill $bill, array $data): Bill
    {
        if (array_key_exists('name', $data) && '' !== (string)$data['name']) {
            $bill->name = $data['name'];
        }

        if (array_key_exists('amount_min', $data) && '' !== (string)$data['amount_min']) {
            $bill->amount_min = $data['amount_min'];
        }
        if (array_key_exists('amount_max', $data) && '' !== (string)$data['amount_max']) {
            $bill->amount_max = $data['amount_max'];
        }
        if (array_key_exists('date', $data) && '' !== (string)$data['date']) {
            $bill->date = $data['date'];
        }
        if (array_key_exists('repeat_freq', $data) && '' !== (string)$data['repeat_freq']) {
            $bill->repeat_freq = $data['repeat_freq'];
        }
        if (array_key_exists('skip', $data)) {
            $bill->skip = $data['skip'];
        }
        if (array_key_exists('active', $data)) {
            $bill->active = $data['active'];
        }

        $bill->match     = 'EMPTY';
        $bill->automatch = true;
        $bill->save();

        return $bill;
    }

    /**
     * @param Bill $bill
     * @param int  $oldOrder
     * @param int  $newOrder
     */
    private function updateOrder(Bill $bill, int $oldOrder, int $newOrder): void
    {
        if ($newOrder > $oldOrder) {
            $this->user->bills()->where('order', '<=', $newOrder)->where('order', '>', $oldOrder)
                       ->where('bills.id', '!=', $bill->id)
                       ->decrement('bills.order', 1);
            $bill->order = $newOrder;
            $bill->save();
        }
        if ($newOrder < $oldOrder) {
            $this->user->bills()->where('order', '>=', $newOrder)->where('order', '<', $oldOrder)
                       ->where('bills.id', '!=', $bill->id)
                       ->increment('bills.order', 1);
            $bill->order = $newOrder;
            $bill->save();
        }

    }

    /**
     * @param Bill  $bill
     * @param array $oldData
     * @param array $newData
     */
    private function updateBillTriggers(Bill $bill, array $oldData, array $newData): void
    {
        Log::debug(sprintf('Now in updateBillTriggers(%d, "%s")', $bill->id, $bill->name));
        /** @var BillRepositoryInterface $repository */
        $repository = app(BillRepositoryInterface::class);
        $repository->setUser($bill->user);
        $rules = $repository->getRulesForBill($bill);
        if (0 === $rules->count()) {
            Log::debug('Found no rules.');

            return;
        }
        Log::debug(sprintf('Found %d rules', $rules->count()));
        $fields = [
            'name'                      => 'description_contains',
            'amount_min'                => 'amount_more',
            'amount_max'                => 'amount_less',
            'transaction_currency_name' => 'currency_is'];
        foreach ($fields as $field => $ruleTriggerKey) {
            if (!array_key_exists($field, $newData)) {
                continue;
            }
            if ($oldData[$field] === $newData[$field]) {
                Log::debug(sprintf('Field %s is unchanged ("%s"), continue.', $field, $oldData[$field]));
                continue;
            }
            $this->updateRules($rules, $ruleTriggerKey, $oldData[$field], $newData[$field]);
        }

    }

    /**
     * @param Collection $rules
     * @param string     $key
     * @param string     $oldValue
     * @param string     $newValue
     */
    private function updateRules(Collection $rules, string $key, string $oldValue, string $newValue): void
    {
        /** @var Rule $rule */
        foreach ($rules as $rule) {
            $trigger = $this->getRuleTrigger($rule, $key);
            if (null !== $trigger && $trigger->trigger_value === $oldValue) {
                Log::debug(sprintf('Updated rule trigger #%d from value "%s" to value "%s"', $trigger->id, $oldValue, $newValue));
                $trigger->trigger_value = $newValue;
                $trigger->save();
                continue;
            }
            if (null !== $trigger && $trigger->trigger_value !== $oldValue && in_array($key, ['amount_more', 'amount_less'], true)
                && 0 === bccomp($trigger->trigger_value, $oldValue)) {
                Log::debug(sprintf('Updated rule trigger #%d from value "%s" to value "%s"', $trigger->id, $oldValue, $newValue));
                $trigger->trigger_value = $newValue;
                $trigger->save();
            }
        }
    }

    /**
     * @param Rule   $rule
     * @param string $key
     *
     * @return RuleTrigger|null
     */
    private function getRuleTrigger(Rule $rule, string $key): ?RuleTrigger
    {
        return $rule->ruleTriggers()->where('trigger_type', $key)->first();
    }
}
