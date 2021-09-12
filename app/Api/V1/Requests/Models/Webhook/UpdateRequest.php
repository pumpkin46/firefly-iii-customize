<?php
/*
 * UpdateRequest.php
 * Copyright (c) 2021 james@firefly-iii.org
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

namespace FireflyIII\Api\V1\Requests\Models\Webhook;

use FireflyIII\Rules\IsBoolean;
use FireflyIII\Support\Request\ChecksLogin;
use FireflyIII\Support\Request\ConvertsDataTypes;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateRequest
 */
class UpdateRequest extends FormRequest
{
    use ChecksLogin, ConvertsDataTypes;

    /**
     * @return array
     */
    public function getData(): array
    {
        $triggers   = array_flip(config('firefly.webhooks.triggers'));
        $responses  = array_flip(config('firefly.webhooks.responses'));
        $deliveries = array_flip(config('firefly.webhooks.deliveries'));

        $fields = [
            'title'    => ['title', 'string'],
            'active'   => ['active', 'boolean'],
            'trigger'  => ['trigger', 'string'],
            'response' => ['response', 'string'],
            'delivery' => ['delivery', 'string'],
            'url'      => ['url', 'string'],
        ];

        // this is the way.
        $return = $this->getAllData($fields);
        if (array_key_exists('trigger', $return)) {
            $return['trigger'] = $triggers[$return['trigger']] ?? 0;
        }
        if (array_key_exists('response', $return)) {
            $return['response'] = $responses[$return['response']] ?? 0;
        }
        if (array_key_exists('delivery', $return)) {
            $return['delivery'] = $deliveries[$return['delivery']] ?? 0;
        }
        $return['secret'] = null !== $this->get('secret');
        if (null !== $this->get('title')) {
            $return['title'] = $this->string('title');
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
        $triggers   = implode(',', array_values(config('firefly.webhooks.triggers')));
        $responses  = implode(',', array_values(config('firefly.webhooks.responses')));
        $deliveries = implode(',', array_values(config('firefly.webhooks.deliveries')));
        $webhook    = $this->route()->parameter('webhook');

        return [
            'title'    => sprintf('between:1,512|uniqueObjectForUser:webhooks,title,%d', $webhook->id),
            'active'   => [new IsBoolean],
            'trigger'  => sprintf('in:%s', $triggers),
            'response' => sprintf('in:%s', $responses),
            'delivery' => sprintf('in:%s', $deliveries),
            'url'      => ['url', 'starts_with:https://', sprintf('uniqueExistingWebhook:%d', $webhook->id)],
        ];
    }
}
