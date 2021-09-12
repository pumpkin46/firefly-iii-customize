<?php
/**
 * RuleFormRequest.php
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

namespace FireflyIII\Http\Requests;

use FireflyIII\Models\Rule;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use FireflyIII\Support\Request\GetRuleConfiguration;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class RuleFormRequest.
 */
class RuleFormRequest extends FormRequest
{
    use ConvertsDataTypes, GetRuleConfiguration, ChecksLogin;

    /**
     * Get all data for controller.
     *
     * @return array
     *
     */
    public function getRuleData(): array
    {
        return [
            'title'           => $this->string('title'),
            'rule_group_id'   => $this->integer('rule_group_id'),
            'active'          => $this->boolean('active'),
            'trigger'         => $this->string('trigger'),
            'description'     => $this->stringWithNewlines('description'),
            'stop_processing' => $this->boolean('stop_processing'),
            'strict'          => $this->boolean('strict'),
            'triggers'        => $this->getRuleTriggerData(),
            'actions'         => $this->getRuleActionData(),
        ];
    }

    /**
     * @return array
     */
    private function getRuleTriggerData(): array
    {
        $return      = [];
        $triggerData = $this->get('triggers');
        if (is_array($triggerData)) {
            foreach ($triggerData as $trigger) {
                $stopProcessing = $trigger['stop_processing'] ?? '0';
                $return[]       = [
                    'type'            => $trigger['type'] ?? 'invalid',
                    'value'           => $trigger['value'] ?? '',
                    'stop_processing' => 1 === (int)$stopProcessing,
                ];
            }
        }

        return $return;
    }

    /**
     * @return array
     */
    private function getRuleActionData(): array
    {
        $return     = [];
        $actionData = $this->get('actions');
        if (is_array($actionData)) {
            foreach ($actionData as $action) {
                $stopProcessing = $action['stop_processing'] ?? '0';
                $return[]       = [
                    'type'            => $action['type'] ?? 'invalid',
                    'value'           => $action['value'] ?? '',
                    'stop_processing' => 1 === (int)$stopProcessing,
                ];
            }
        }

        return $return;
    }

    /**
     * Rules for this request.
     *
     * @return array
     */
    public function rules(): array
    {
        $validTriggers = $this->getTriggers();
        $validActions  = array_keys(config('firefly.rule-actions'));

        // some actions require text (aka context):
        $contextActions = implode(',', config('firefly.context-rule-actions'));

        // some triggers require text (aka context):
        $contextTriggers = implode(',', $this->getTriggersWithContext());

        // initial set of rules:
        $rules = [
            'title'            => 'required|between:1,100|uniqueObjectForUser:rules,title',
            'description'      => 'between:1,5000|nullable',
            'stop_processing'  => 'boolean',
            'rule_group_id'    => 'required|belongsToUser:rule_groups',
            'trigger'          => 'required|in:store-journal,update-journal',
            'triggers.*.type'  => 'required|in:' . implode(',', $validTriggers),
            'triggers.*.value' => sprintf('required_if:triggers.*.type,%s|min:1|ruleTriggerValue', $contextTriggers),
            'actions.*.type'   => 'required|in:' . implode(',', $validActions),
            'actions.*.value'  => sprintf('required_if:actions.*.type,%s|min:0|max:255|ruleActionValue', $contextActions),
            'strict'           => 'in:0,1',
        ];

        /** @var Rule $rule */
        $rule = $this->route()->parameter('rule');

        if (null !== $rule) {
            $rules['title'] = 'required|between:1,100|uniqueObjectForUser:rules,title,' . $rule->id;
        }

        return $rules;
    }
}
