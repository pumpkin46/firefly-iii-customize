<?php

/**
 * Controller.php
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

namespace FireflyIII\Api\V1\Controllers;

use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use League\Fractal\Manager;
use League\Fractal\Serializer\JsonApiSerializer;
use Log;
use Symfony\Component\HttpFoundation\ParameterBag;

/**
 * Class Controller.
 *
 * @codeCoverageIgnore
 */
abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected const CONTENT_TYPE = 'application/vnd.api+json';
    protected ParameterBag $parameters;

    /**
     * Controller constructor.
     */
    public function __construct()
    {
        // get global parameters
        $this->parameters = $this->getParameters();
        $this->middleware(
            function ($request, $next) {
                if (auth()->check()) {
                    $language = app('steam')->getLanguage();
                    app()->setLocale($language);
                }

                return $next($request);
            }
        );

    }

    /**
     * Method to grab all parameters from the URI.
     *
     * @return ParameterBag
     */
    private function getParameters(): ParameterBag
    {
        $bag  = new ParameterBag;
        $page = (int)request()->get('page');
        if (0 === $page) {
            $page = 1;
        }
        $bag->set('page', $page);

        // some date fields:
        $dates = ['start', 'end', 'date'];
        foreach ($dates as $field) {
            $date = request()->query->get($field);
            $obj  = null;
            if (null !== $date) {
                try {
                    $obj = Carbon::parse($date);
                } catch (InvalidDateException $e) {
                    // don't care
                    Log::error(sprintf('Invalid date exception in API controller: %s', $e->getMessage()));
                }
            }
            $bag->set($field, $obj);
        }

        // integer fields:
        $integers = ['limit'];
        foreach ($integers as $integer) {
            $value = request()->query->get($integer);
            if (null !== $value) {
                $bag->set($integer, (int)$value);
            }
        }

        return $bag;

    }

    /**
     * Method to help build URI's.
     *
     * @return string
     */
    final protected function buildParams(): string
    {
        $return = '?';
        $params = [];
        foreach ($this->parameters as $key => $value) {
            if ('page' === $key) {
                continue;
            }
            if ($value instanceof Carbon) {
                $params[$key] = $value->format('Y-m-d');
                continue;
            }
            $params[$key] = $value;
        }

        return $return . http_build_query($params);
    }

    /**
     * @return Manager
     */
    final protected function getManager(): Manager
    {
        // create some objects:
        $manager = new Manager;
        $baseUrl = request()->getSchemeAndHttpHost() . '/api/v1';
        $manager->setSerializer(new JsonApiSerializer($baseUrl));

        return $manager;
    }
}
