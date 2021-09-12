<?php
/**
 * RuleRepositoryInterface.php
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

namespace FireflyIII\Repositories\Rule;

use FireflyIII\Models\Rule;
use FireflyIII\Models\RuleAction;
use FireflyIII\Models\RuleGroup;
use FireflyIII\Models\RuleTrigger;
use FireflyIII\User;
use Illuminate\Support\Collection;

/**
 * Interface RuleRepositoryInterface.
 */
interface RuleRepositoryInterface
{
    /**
     * @return int
     */
    public function count(): int;

    /**
     * @param Rule $rule
     *
     * @return bool
     */
    public function destroy(Rule $rule): bool;

    /**
     * @param Rule $rule
     *
     * @return Rule
     */
    public function duplicate(Rule $rule): Rule;

    /**
     * @param int $ruleId
     *
     * @return Rule|null
     */
    public function find(int $ruleId): ?Rule;

    /**
     * Get all the users rules.
     *
     * @return Collection
     */
    public function getAll(): Collection;

    /**
     * @return RuleGroup
     */
    public function getFirstRuleGroup(): RuleGroup;

    /**
     * @param RuleGroup $ruleGroup
     *
     * @return int
     */
    public function getHighestOrderInRuleGroup(RuleGroup $ruleGroup): int;

    /**
     * @param Rule $rule
     *
     * @return string
     */
    public function getPrimaryTrigger(Rule $rule): string;

    /**
     * @param Rule $rule
     *
     * @return Collection
     */
    public function getRuleActions(Rule $rule): Collection;

    /**
     * @param Rule $rule
     *
     * @return Collection
     */
    public function getRuleTriggers(Rule $rule): Collection;

    /**
     * Return search query for rule.
     *
     * @param Rule $rule
     *
     * @return string
     */
    public function getSearchQuery(Rule $rule): string;

    /**
     * Get all the users rules that trigger on storage.
     *
     * @return Collection
     */
    public function getStoreRules(): Collection;

    /**
     * Get all the users rules that trigger on update.
     *
     * @return Collection
     */
    public function getUpdateRules(): Collection;

    /**
     * @param RuleGroup $ruleGroup
     *
     * @return int
     */
    public function maxOrder(RuleGroup $ruleGroup): int;

    /**
     * @param Rule      $rule
     * @param RuleGroup $ruleGroup
     * @param int       $order
     *
     * @return Rule
     */
    public function moveRule(Rule $rule, RuleGroup $ruleGroup, int $order): Rule;

    /**
     * @param RuleGroup $ruleGroup
     *
     * @return bool
     */
    public function resetRuleOrder(RuleGroup $ruleGroup): bool;

    /**
     * @param string $query
     * @param int    $limit
     *
     * @return Collection
     */
    public function searchRule(string $query, int $limit): Collection;

    /**
     * @param Rule $rule
     * @param int  $newOrder
     */
    public function setOrder(Rule $rule, int $newOrder): void;

    /**
     * @param User $user
     */
    public function setUser(User $user);

    /**
     * @param array $data
     *
     * @return Rule
     */
    public function store(array $data): Rule;

    /**
     * @param Rule  $rule
     * @param array $values
     *
     * @return RuleAction
     */
    public function storeAction(Rule $rule, array $values): RuleAction;

    /**
     * @param Rule  $rule
     * @param array $values
     *
     * @return RuleTrigger
     */
    public function storeTrigger(Rule $rule, array $values): RuleTrigger;

    /**
     * @param Rule  $rule
     * @param array $data
     *
     * @return Rule
     */
    public function update(Rule $rule, array $data): Rule;
}
