<?php
/**
 * ConfigurationController.php
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
/** @noinspection PhpUndefinedClassInspection */
declare(strict_types=1);

namespace FireflyIII\Http\Controllers\Admin;

use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Http\Middleware\IsDemoUser;
use FireflyIII\Http\Requests\ConfigurationRequest;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Log;

/**
 * Class ConfigurationController.
 */
class ConfigurationController extends Controller
{
    /**
     * ConfigurationController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            static function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.administration'));
                app('view')->share('mainTitleIcon', 'fa-hand-spock-o');

                return $next($request);
            }
        );
        $this->middleware(IsDemoUser::class)->except(['index']);
    }

    /**
     * Show configuration index.
     *
     * @return Factory|View
     */
    public function index()
    {
        $subTitle     = (string)trans('firefly.instance_configuration');
        $subTitleIcon = 'fa-wrench';

        Log::channel('audit')->info('User visits admin config index.');

        // all available configuration and their default value in case
        // they don't exist yet.
        $singleUserMode = app('fireflyconfig')->get('single_user_mode', config('firefly.configuration.single_user_mode'))->data;
        $isDemoSite     = app('fireflyconfig')->get('is_demo_site', config('firefly.configuration.is_demo_site'))->data;
        $siteOwner      = config('firefly.site_owner');

        return prefixView(
            'admin.configuration.index',
            compact('subTitle', 'subTitleIcon', 'singleUserMode', 'isDemoSite', 'siteOwner')
        );
    }

    /**
     * Store new configuration values.
     *
     * @param ConfigurationRequest $request
     *
     * @return RedirectResponse
     */
    public function postIndex(ConfigurationRequest $request): RedirectResponse
    {
        // get config values:
        $data = $request->getConfigurationData();

        Log::channel('audit')->info('User updates global configuration.', $data);

        // store config values
        app('fireflyconfig')->set('single_user_mode', $data['single_user_mode']);
        app('fireflyconfig')->set('is_demo_site', $data['is_demo_site']);

        // flash message
        session()->flash('success', (string)trans('firefly.configuration_updated'));
        app('preferences')->mark();

        return redirect()->route('admin.configuration.index');
    }
}
