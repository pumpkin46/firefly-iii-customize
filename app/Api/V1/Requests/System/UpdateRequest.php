<?php

/**
 * ConfigurationRequest.php
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

namespace FireflyIII\Api\V1\Requests\System;

use FireflyIII\Rules\IsBoolean;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateRequest
 *
 * @codeCoverageIgnore
 */
class UpdateRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Get all data from the request.
     *
     * @return array
     */
    public function getAll(): array
    {
        $name = $this->route()->parameter('dynamicConfigKey');
        switch ($name) {
            default:
                break;
            case 'configuration.is_demo_site':
            case 'configuration.single_user_mode':
                return ['value' => $this->boolean('value')];
            case 'configuration.permission_update_check':
            case 'configuration.last_update_check':
                return ['value' => $this->integer('value')];
        }

        return ['value' => $this->string('value')]; 
    }

    /**
     * The rules that the incoming request must be matched against.
     *
     * @return array
     */
    public function rules(): array
    {
        $name = $this->route()->parameter('configName');
        switch ($name) {
            default:
                break;
            case 'configuration.is_demo_site':
            case 'configuration.single_user_mode':
                return ['value' => ['required', new IsBoolean]];
            case 'configuration.permission_update_check':
                return ['value' => 'required|numeric|between:-1,1'];
            case 'configuration.last_update_check':
                return ['value' => 'required|numeric|min:464272080'];
        }

        return ['value' => 'required']; 
    }
}
