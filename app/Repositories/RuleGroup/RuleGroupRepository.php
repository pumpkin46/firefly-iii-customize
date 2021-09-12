<?php
/**
 * RuleGroupRepository.php
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

namespace FireflyIII\Repositories\RuleGroup;

use Exception;
use FireflyIII\Models\Rule;
use FireflyIII\Models\RuleAction;
use FireflyIII\Models\RuleGroup;
use FireflyIII\Models\RuleTrigger;
use FireflyIII\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Log;

/**
 * Class RuleGroupRepository.
 */
class RuleGroupRepository implements RuleGroupRepositoryInterface
{
    private User $user;

    /**
     * @inheritDoc
     */
    public function correctRuleGroupOrder(): void
    {
        $set   = $this->user
            ->ruleGroups()
            ->orderBy('order', 'ASC')
            ->orderBy('active', 'DESC')
            ->orderBy('title', 'ASC')
            ->get(['rule_groups.id']);
        $index = 1;
        /** @var RuleGroup $ruleGroup */
        foreach ($set as $ruleGroup) {
            if ($ruleGroup->order !== $index) {
                $ruleGroup->order = $index;
                $ruleGroup->save();
            }
            $index++;
        }
    }

    /**
     * @return int
     */
    public function count(): int
    {
        return $this->user->ruleGroups()->count();
    }

    /**
     * @param RuleGroup      $ruleGroup
     * @param RuleGroup|null $moveTo
     *
     * @return bool
     * @throws Exception
     */
    public function destroy(RuleGroup $ruleGroup, ?RuleGroup $moveTo): bool
    {
        /** @var Rule $rule */
        foreach ($ruleGroup->rules as $rule) {
            if (null === $moveTo) {
                $rule->delete();
                continue;
            }
            // move
            $rule->ruleGroup()->associate($moveTo);
            $rule->save();
        }

        $ruleGroup->delete();

        $this->resetOrder();
        if (null !== $moveTo) {
            $this->resetRuleOrder($moveTo);
        }

        return true;
    }

    /**
     * @inheritDoc
     */
    public function destroyAll(): void
    {
        $groups = $this->get();
        /** @var RuleGroup $group */
        foreach ($groups as $group) {
            $group->rules()->delete();
            $group->delete();
        }
    }

    /**
     * @param int $ruleGroupId
     *
     * @return RuleGroup|null
     */
    public function find(int $ruleGroupId): ?RuleGroup
    {
        $group = $this->user->ruleGroups()->find($ruleGroupId);
        if (null === $group) {
            return null;
        }

        return $group;
    }

    /**
     * @param string $title
     *
     * @return RuleGroup|null
     */
    public function findByTitle(string $title): ?RuleGroup
    {
        return $this->user->ruleGroups()->where('title', $title)->first();
    }

    /**
     * @return Collection
     */
    public function get(): Collection
    {
        return $this->user->ruleGroups()->orderBy('order', 'ASC')->get();
    }

    /**
     * @return Collection
     */
    public function getActiveGroups(): Collection
    {
        return $this->user->ruleGroups()->with(['rules'])->where('rule_groups.active', true)->orderBy('order', 'ASC')->get(['rule_groups.*']);
    }

    /**
     * @param RuleGroup $group
     *
     * @return Collection
     */
    public function getActiveRules(RuleGroup $group): Collection
    {
        return $group->rules()
                     ->where('rules.active', true)
                     ->get(['rules.*']);
    }

    /**
     * @param RuleGroup $group
     *
     * @return Collection
     */
    public function getActiveStoreRules(RuleGroup $group): Collection
    {
        return $group->rules()
                     ->leftJoin('rule_triggers', 'rules.id', '=', 'rule_triggers.rule_id')
                     ->where('rule_triggers.trigger_type', 'user_action')
                     ->where('rule_triggers.trigger_value', 'store-journal')
                     ->where('rules.active', true)
                     ->get(['rules.*']);
    }

    /**
     * @param RuleGroup $group
     *
     * @return Collection
     */
    public function getActiveUpdateRules(RuleGroup $group): Collection
    {
        return $group->rules()
                     ->leftJoin('rule_triggers', 'rules.id', '=', 'rule_triggers.rule_id')
                     ->where('rule_triggers.trigger_type', 'user_action')
                     ->where('rule_triggers.trigger_value', 'update-journal')
                     ->where('rules.active', true)
                     ->get(['rules.*']);
    }

    /**
     * @return int
     */
    public function getHighestOrderRuleGroup(): int
    {
        $entry = $this->user->ruleGroups()->max('order');

        return (int)$entry;
    }

    /**
     * @param string|null $filter
     *
     * @return Collection
     */
    public function getRuleGroupsWithRules(?string $filter): Collection
    {
        $groups = $this->user->ruleGroups()
                             ->orderBy('order', 'ASC')
                             ->where('active', true)
                             ->with(
                                 [
                                     'rules'              => static function (HasMany $query) {
                                         $query->orderBy('order', 'ASC');
                                     },
                                     'rules.ruleTriggers' => static function (HasMany $query) {
                                         $query->orderBy('order', 'ASC');
                                     },
                                     'rules.ruleActions'  => static function (HasMany $query) {
                                         $query->orderBy('order', 'ASC');
                                     },
                                 ]
                             )->get();
        if (null === $filter) {
            return $groups;
        }
        Log::debug(sprintf('Will filter getRuleGroupsWithRules on "%s".', $filter));

        return $groups->map(
            function (RuleGroup $group) use ($filter) {
                Log::debug(sprintf('Now filtering group #%d', $group->id));
                // filter the rules in the rule group:
                $group->rules = $group->rules->filter(
                    function (Rule $rule) use ($filter) {
                        Log::debug(sprintf('Now filtering rule #%d', $rule->id));
                        foreach ($rule->ruleTriggers as $trigger) {
                            if ('user_action' === $trigger->trigger_type && $filter === $trigger->trigger_value) {
                                Log::debug(sprintf('Rule #%d triggers on %s, include it.', $rule->id, $filter));

                                return true;
                            }
                        }
                        Log::debug(sprintf('Rule #%d does not trigger on %s, do not include it.', $rule->id, $filter));

                        return false;
                    }
                );

                return $group;
            }
        );
    }

    /**
     * @param string|null $filter
     *
     * @return Collection
     */
    public function getAllRuleGroupsWithRules(?string $filter): Collection
    {
        $groups = $this->user->ruleGroups()
                             ->orderBy('order', 'ASC')
                             ->with(
                                 [
                                     'rules'              => static function (HasMany $query) {
                                         $query->orderBy('order', 'ASC');
                                     },
                                     'rules.ruleTriggers' => static function (HasMany $query) {
                                         $query->orderBy('order', 'ASC');
                                     },
                                     'rules.ruleActions'  => static function (HasMany $query) {
                                         $query->orderBy('order', 'ASC');
                                     },
                                 ]
                             )->get();
        if (null === $filter) {
            return $groups;
        }
        Log::debug(sprintf('Will filter getRuleGroupsWithRules on "%s".', $filter));

        return $groups->map(
            function (RuleGroup $group) use ($filter) {
                Log::debug(sprintf('Now filtering group #%d', $group->id));
                // filter the rules in the rule group:
                $group->rules = $group->rules->filter(
                    function (Rule $rule) use ($filter) {
                        Log::debug(sprintf('Now filtering rule #%d', $rule->id));
                        foreach ($rule->ruleTriggers as $trigger) {
                            if ('user_action' === $trigger->trigger_type && $filter === $trigger->trigger_value) {
                                Log::debug(sprintf('Rule #%d triggers on %s, include it.', $rule->id, $filter));

                                return true;
                            }
                        }
                        Log::debug(sprintf('Rule #%d does not trigger on %s, do not include it.', $rule->id, $filter));

                        return false;
                    }
                );

                return $group;
            }
        );
    }

    /**
     * @param RuleGroup $group
     *
     * @return Collection
     */
    public function getRules(RuleGroup $group): Collection
    {
        return $group->rules()
                     ->get(['rules.*']);
    }

    /**
     * @inheritDoc
     */
    public function maxOrder(): int
    {
        return (int)$this->user->ruleGroups()->where('active', true)->max('order');
    }

    /**
     * @return bool
     */
    public function resetOrder(): bool
    {
        $this->user->ruleGroups()->where('active', false)->update(['order' => 0]);
        $set   = $this->user
            ->ruleGroups()
            ->where('active', true)
            ->whereNull('deleted_at')
            ->orderBy('order', 'ASC')
            ->orderBy('title', 'DESC')
            ->get();
        $count = 1;
        /** @var RuleGroup $entry */
        foreach ($set as $entry) {
            if ($entry->order !== $count) {
                $entry->order = $count;
                $entry->save();
            }

            // also update rules in group.
            $this->resetRuleOrder($entry);

            ++$count;
        }

        return true;
    }

    /**
     * @param RuleGroup $ruleGroup
     *
     * @return bool
     */
    public function resetRuleOrder(RuleGroup $ruleGroup): bool
    {
        $set   = $ruleGroup->rules()
                           ->orderBy('order', 'ASC')
                           ->where('active', true)
                           ->orderBy('title', 'DESC')
                           ->orderBy('updated_at', 'DESC')
                           ->get(['rules.*']);
        $count = 1;
        /** @var Rule $entry */
        foreach ($set as $entry) {
            if ((int)$entry->order !== $count) {
                Log::debug(sprintf('Rule #%d was on spot %d but must be on spot %d', $entry->id, $entry->order, $count));
                $entry->order = $count;
                $entry->save();
            }
            $this->resetRuleActionOrder($entry);
            $this->resetRuleTriggerOrder($entry);

            ++$count;
        }

        return true;
    }

    /**
     * @inheritDoc
     */
    public function searchRuleGroup(string $query, int $limit): Collection
    {
        $search = $this->user->ruleGroups();
        if ('' !== $query) {
            $search->where('rule_groups.title', 'LIKE', sprintf('%%%s%%', $query));
        }
        $search->orderBy('rule_groups.order', 'ASC')
               ->orderBy('rule_groups.title', 'ASC');

        return $search->take($limit)->get(['id', 'title', 'description']);
    }

    /**
     * @inheritDoc
     */
    public function setOrder(RuleGroup $ruleGroup, int $newOrder): void
    {
        $oldOrder = (int)$ruleGroup->order;

        if ($newOrder > $oldOrder) {
            $this->user->ruleGroups()->where('rule_groups.order', '<=', $newOrder)->where('rule_groups.order', '>', $oldOrder)
                       ->where('rule_groups.id', '!=', $ruleGroup->id)
                       ->decrement('order', 1);
            $ruleGroup->order = $newOrder;
            Log::debug(sprintf('Order of group #%d ("%s") is now %d', $ruleGroup->id, $ruleGroup->title, $newOrder));
            $ruleGroup->save();

            return;
        }

        $this->user->ruleGroups()->where('rule_groups.order', '>=', $newOrder)->where('rule_groups.order', '<', $oldOrder)
                   ->where('rule_groups.id', '!=', $ruleGroup->id)
                   ->increment('order', 1);
        $ruleGroup->order = $newOrder;
        Log::debug(sprintf('Order of group #%d ("%s") is now %d', $ruleGroup->id, $ruleGroup->title, $newOrder));
        $ruleGroup->save();
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
     * @return RuleGroup
     */
    public function store(array $data): RuleGroup
    {
        $newRuleGroup = new RuleGroup(
            [
                'user_id'     => $this->user->id,
                'title'       => $data['title'],
                'description' => $data['description'],
                'order'       => 31337,
                'active'      => array_key_exists('active', $data) ? $data['active'] : true,
            ]
        );
        $newRuleGroup->save();
        $this->resetOrder();
        if (array_key_exists('order', $data)) {
            $this->setOrder($newRuleGroup, $data['order']);
        }

        return $newRuleGroup;
    }

    /**
     * @param RuleGroup $ruleGroup
     * @param array     $data
     *
     * @return RuleGroup
     */
    public function update(RuleGroup $ruleGroup, array $data): RuleGroup
    {
        // update the account:
        if (array_key_exists('title', $data)) {
            $ruleGroup->title = $data['title'];
        }
        if (array_key_exists('description', $data)) {
            $ruleGroup->description = $data['description'];
        }
        if (array_key_exists('active', $data)) {
            $ruleGroup->active = $data['active'];
        }
        // order
        if (array_key_exists('order', $data) && $ruleGroup->order !== $data['order']) {
            $this->resetOrder();
            $this->setOrder($ruleGroup, (int)$data['order']);
        }

        $ruleGroup->save();

        return $ruleGroup;
    }

    /**
     * @param Rule $rule
     */
    private function resetRuleActionOrder(Rule $rule): void
    {
        $actions = $rule->ruleActions()
                        ->orderBy('order', 'ASC')
                        ->orderBy('active', 'DESC')
                        ->orderBy('action_type', 'ASC')
                        ->get();
        $index   = 1;
        /** @var RuleAction $action */
        foreach ($actions as $action) {
            if ((int)$action->order !== $index) {
                $action->order = $index;
                $action->save();
                Log::debug(sprintf('Rule action #%d was on spot %d but must be on spot %d', $action->id, $action->order, $index));
            }
            $index++;
        }
    }

    /**
     * @param Rule $rule
     */
    private function resetRuleTriggerOrder(Rule $rule): void
    {
        $triggers = $rule->ruleTriggers()
                         ->orderBy('order', 'ASC')
                         ->orderBy('active', 'DESC')
                         ->orderBy('trigger_type', 'ASC')
                         ->get();
        $index    = 1;
        /** @var RuleTrigger $trigger */
        foreach ($triggers as $trigger) {
            $order = (int)$trigger->order;
            if ($order !== $index) {
                $trigger->order = $index;
                $trigger->save();
                Log::debug(sprintf('Rule trigger #%d was on spot %d but must be on spot %d', $trigger->id, $order, $index));
            }
            $index++;
        }
    }
}
