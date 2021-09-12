<?php

/**
 * BillStoreRequest.php
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

namespace FireflyIII\Api\V1\Requests\Models\Bill;

use FireflyIII\Rules\IsBoolean;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Log;

/**
 * Class StoreRequest
 *
 * @codeCoverageIgnore
 */
class StoreRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Get all data from the request.
     *
     * @return array
     */
    public function getAll(): array
    {
        Log::debug('Raw fields in Bill StoreRequest', $this->all());
        $fields = [
            'name'               => ['name', 'string'],
            'amount_min'         => ['amount_min', 'string'],
            'amount_max'         => ['amount_max', 'string'],
            'currency_id'        => ['currency_id', 'integer'],
            'currency_code'      => ['currency_code', 'string'],
            'date'               => ['date', 'date'],
            'repeat_freq'        => ['repeat_freq', 'string'],
            'skip'               => ['skip', 'integer'],
            'active'             => ['active', 'boolean'],
            'order'              => ['order', 'integer'],
            'notes'              => ['notes', 'stringWithNewlines'],
            'object_group_id'    => ['object_group_id', 'integer'],
            'object_group_title' => ['object_group_title', 'string'],
        ];

        return $this->getAllData($fields);
    }

    /**
     * The rules that the incoming request must be matched against.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name'          => 'between:1,255|uniqueObjectForUser:bills,name',
            'amount_min'    => 'numeric|gt:0',
            'amount_max'    => 'numeric|gt:0',
            'currency_id'   => 'numeric|exists:transaction_currencies,id',
            'currency_code' => 'min:3|max:3|exists:transaction_currencies,code',
            'date'          => 'date',
            'repeat_freq'   => 'in:weekly,monthly,quarterly,half-year,yearly',
            'skip'          => 'between:0,31',
            'active'        => [new IsBoolean],
            'notes'         => 'between:1,65536',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param Validator $validator
     *
     * @return void
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(
            static function (Validator $validator) {
                $data = $validator->getData();
                $min  = (float)($data['amount_min'] ?? 0);
                $max  = (float)($data['amount_max'] ?? 0);
                if ($min > $max) {
                    $validator->errors()->add('amount_min', (string)trans('validation.amount_min_over_max'));
                }
            }
        );
    }
}
