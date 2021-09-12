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

namespace FireflyIII\Http\Requests;

use FireflyIII\Support\Request\ChecksLogin;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class ConfigurationRequest.
 *
 * @codeCoverageIgnore
 */
class ConfigurationRequest extends FormRequest
{
    use ChecksLogin;

    /**
     * Returns the data required by the controller.
     *
     * @return array
     */
    public function getConfigurationData(): array
    {
        return [
            'single_user_mode' => $this->boolean('single_user_mode'),
            'is_demo_site'     => $this->boolean('is_demo_site'),
        ];
    }

    /**
     * Rules for this request.
     *
     * @return array
     */
    public function rules(): array
    {
        // fixed
        return [
            'single_user_mode' => 'between:0,1|numeric',
            'is_demo_site'     => 'between:0,1|numeric',
        ];
    }
}
