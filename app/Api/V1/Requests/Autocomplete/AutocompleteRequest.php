<?php
/**
 * AutocompleteRequest.php
 * Copyright (c) 2020 james@firefly-iii.org
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

namespace FireflyIII\Api\V1\Requests\Autocomplete;

use FireflyIII\Models\AccountType;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class AutocompleteRequest
 */
class AutocompleteRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * @return array
     */
    public function getData(): array
    {
        $types = $this->string('types');
        $array = [];
        if ('' !== $types) {
            $array = explode(',', $types);
        }
        $limit = $this->integer('limit');
        $limit = 0 === $limit ? 10 : $limit;

        // remove 'initial balance' from allowed types. its internal
        $array = array_diff($array, [AccountType::INITIAL_BALANCE, AccountType::RECONCILIATION]);

        return [
            'types' => $array,
            'query' => $this->string('query'),
            'date'  => $this->date('date'),
            'limit' => $limit,
        ];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'limit' => 'min:0|max:1337',
        ];
    }
}
