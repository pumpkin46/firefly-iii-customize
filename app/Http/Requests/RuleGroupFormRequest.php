<?php
/**
 * RuleGroupFormRequest.php
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

use FireflyIII\Models\RuleGroup;
use FireflyIII\Rules\IsBoolean;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class RuleGroupFormRequest.
 */
class RuleGroupFormRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Get all data for controller.
     *
     * @return array
     */
    public function getRuleGroupData(): array
    {
        $active = true;
        if (null !== $this->get('active')) {
            $active = $this->boolean('active');
        }

        return [
            'title'       => $this->string('title'),
            'description' => $this->stringWithNewlines('description'),
            'active'      => $active,
        ];
    }

    /**
     * Rules for this request.
     *
     * @return array
     */
    public function rules(): array
    {
        $titleRule = 'required|between:1,100|uniqueObjectForUser:rule_groups,title';

        /** @var RuleGroup $ruleGroup */
        $ruleGroup = $this->route()->parameter('ruleGroup');

        if (null !== $ruleGroup) {
            $titleRule = 'required|between:1,100|uniqueObjectForUser:rule_groups,title,' . $ruleGroup->id;
        }

        return [
            'title'       => $titleRule,
            'description' => 'between:1,5000|nullable',
            'active'      => [new IsBoolean],
        ];
    }
}
