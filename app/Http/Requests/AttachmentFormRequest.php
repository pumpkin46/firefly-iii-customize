<?php
/**
 * AttachmentFormRequest.php
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
 * Class AttachmentFormRequest.
 *
 * @codeCoverageIgnore
 */
class AttachmentFormRequest extends FormRequest
{
    use ConvertsDataTypes, ChecksLogin;

    /**
     * Returns the data required by the controller.
     *
     * @return array
     */
    public function getAttachmentData(): array
    {
        return [
            'title' => $this->string('title'),
            'notes' => $this->string('notes'),
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
            'title' => 'between:1,255|nullable',
            'notes' => 'between:1,65536|nullable',
        ];
    }
}
