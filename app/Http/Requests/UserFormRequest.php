<?php
/**
 * UserFormRequest.php
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
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UserFormRequest.
 *
 * @codeCoverageIgnore
 */
class UserFormRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Get data for controller.
     *
     * @return array
     */
    public function getUserData(): array
    {
        return [
            'email'        => $this->string('email'),
            'blocked'      => 1 === $this->integer('blocked'),
            'blocked_code' => $this->string('blocked_code'),
            'password'     => $this->string('password'),
            'is_owner'     => 1 === $this->integer('is_owner'),
        ];
    }

    /**
     * Rules for this request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'id'           => 'required|exists:users,id',
            'email'        => 'email|required',
            'password'     => 'confirmed|secure_password',
            'blocked_code' => 'between:0,30|nullable',
            'blocked'      => 'between:0,1|numeric',
            'is_owner'     => 'between:0,1|numeric',
        ];
    }
}
