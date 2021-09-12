<?php
/**
 * PiggyBankUpdateRequest.php
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

use FireflyIII\Models\PiggyBank;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class PiggyBankFormRequest.
 */
class PiggyBankUpdateRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Returns the data required by the controller.
     *
     * @return array
     */
    public function getPiggyBankData(): array
    {
        return [
            'name'               => $this->string('name'),
            'startdate'          => $this->date('startdate'),
            'account_id'         => $this->integer('account_id'),
            'targetamount'       => $this->string('targetamount'),
            'targetdate'         => $this->date('targetdate'),
            'notes'              => $this->stringWithNewlines('notes'),
            'object_group_title' => $this->string('object_group'),
        ];
    }

    /**
     * Rules for this request.
     *
     * @return array
     */
    public function rules(): array
    {
        /** @var PiggyBank $piggy */
        $piggy = $this->route()->parameter('piggyBank');

        return [
            'name'         => sprintf('required|between:1,255|uniquePiggyBankForUser:%d', $piggy->id),
            'account_id'   => 'required|belongsToUser:accounts',
            'targetamount' => 'required|numeric|gte:0.01|max:1000000000',
            'startdate'    => 'date',
            'targetdate'   => 'date|nullable',
            'order'        => 'integer|min:1',
            'object_group' => 'min:0|max:255',
        ];
    }
}
