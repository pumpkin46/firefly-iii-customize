<?php
/**
 * app.php
 * Copyright (c) 2019 james@firefly-iii.org.
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

use Illuminate\Contracts\View\Factory as ViewFactory;
/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

bcscale(24);

if (!function_exists('envNonEmpty')) {
    /**
     * @param string $key
     * @param null   $default
     *
     * @return mixed|null
     */
    function envNonEmpty(string $key, $default = null)
    {
        $result = env($key, $default);
        if (is_string($result) && '' === $result) {
            $result = $default;
        }

        return $result;
    }
}

if (!function_exists('str_is_equal')) {
    /**
     * @param string $left
     * @param string $right
     *
     * @return bool
     */
    function str_is_equal(string $left, string $right): bool
    {
        return $left === $right;
    }
}

if (!function_exists('prefixView')) {
    /**
     * Get the evaluated view contents for the given view.
     *
     * @param string|null                                   $view
     * @param \Illuminate\Contracts\Support\Arrayable|array $data
     * @param array                                         $mergeData
     *
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    function prefixView($view = null, $data = [], $mergeData = [])
    {
        $factory = app(ViewFactory::class);

        if (func_num_args() === 0) {
            return $factory;
        }
        // original view:
        $prefixView = $view;

        // try to find the view file first:
        if(!$factory->exists($prefixView)) {
            // prepend it with the view in the layout:
            $layout = env('FIREFLY_III_LAYOUT', 'v1');
            $prefixView   = sprintf('%s.%s', $layout, $view);

            // try again:
            if(!$factory->exists($prefixView)) {
                // if does not exist, force v1 and just continue.
                $prefixView   = sprintf('%s.%s', 'v1', $view);
            }
        }

        return $factory->make($prefixView, $data, $mergeData);
    }
}

$app = new Illuminate\Foundation\Application(
    realpath(__DIR__ . '/../')
);

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    FireflyIII\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    FireflyIII\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    FireflyIII\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
