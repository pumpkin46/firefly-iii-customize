<?php
/**
 * ReconciliationStoreRequest.php
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

use FireflyIII\Rules\ValidJournals;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;
use Log;

/**
 * Class ReconciliationStoreRequest
 */
class ReconciliationStoreRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Returns the data required by the controller.
     *
     * @return array
     */
    public function getAll(): array
    {
        $transactions = $this->get('journals');
        if (!is_array($transactions)) {
            $transactions = []; 
        }
        $data = [
            'start'         => $this->date('start'),
            'end'           => $this->date('end'),
            'start_balance' => $this->string('startBalance'),
            'end_balance'   => $this->string('endBalance'),
            'difference'    => $this->string('difference'),
            'journals'      => $transactions,
            'reconcile'     => $this->string('reconcile'),
        ];
        Log::debug('In ReconciliationStoreRequest::getAll(). Will now return data.');

        return $data;
    }

    /**
     * Rules for this request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'start'        => 'required|date',
            'end'          => 'required|date',
            'startBalance' => 'numeric|max:1000000000',
            'endBalance'   => 'numeric|max:1000000000',
            'difference'   => 'required|numeric|max:1000000000',
            'journals'     => [new ValidJournals],
            'reconcile'    => 'required|in:create,nothing',
        ];
    }
}
