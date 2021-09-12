<?php
/**
 * GetConfigurationData.php
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

namespace FireflyIII\Support\Http\Controllers;
use Carbon\Carbon;
use Log;

/**
 * Trait GetConfigurationData
 *
 */
trait GetConfigurationData
{
    /**
     * Some common combinations.
     *
     * @param int $value
     *
     * @return string
     */
    protected function errorReporting(int $value): string // get configuration
    {
        $array = [
            -1                                                             => 'ALL errors',
            E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED                  => 'E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED',
            E_ALL                                                          => 'E_ALL',
            E_ALL & ~E_DEPRECATED & ~E_STRICT                              => 'E_ALL & ~E_DEPRECATED & ~E_STRICT',
            E_ALL & ~E_NOTICE                                              => 'E_ALL & ~E_NOTICE',
            E_ALL & ~E_NOTICE & ~E_STRICT                                  => 'E_ALL & ~E_NOTICE & ~E_STRICT',
            E_COMPILE_ERROR | E_RECOVERABLE_ERROR | E_ERROR | E_CORE_ERROR => 'E_COMPILE_ERROR|E_RECOVERABLE_ERROR|E_ERROR|E_CORE_ERROR',
        ];

        return $array[$value] ?? (string)$value;
    }

    /**
     * Get the basic steps from config.
     *
     * @param string $route
     *
     * @return array
     */
    protected function getBasicSteps(string $route): array // get config values
    {
        $routeKey = str_replace('.', '_', $route);
        $elements = config(sprintf('intro.%s', $routeKey));
        $steps    = [];
        if (is_array($elements) && count($elements) > 0) {
            foreach ($elements as $key => $options) {
                $currentStep = $options;

                // get the text:
                $currentStep['intro'] = (string)trans('intro.' . $route . '_' . $key);

                // save in array:
                $steps[] = $currentStep;
            }
        }
        Log::debug(sprintf('Total basic steps for %s is %d', $routeKey, count($steps)));

        return $steps;
    }

    /**
     * Get config for date range.
     *
     * @return array
     *
     */
    protected function getDateRangeConfig(): array // get configuration + get preferences.
    {
        $viewRange = (string)app('preferences')->get('viewRange', '1M')->data;
        /** @var Carbon $start */
        $start = session('start');
        /** @var Carbon $end */
        $end = session('end');
        /** @var Carbon $first */
        $first    = session('first');
        $title    = sprintf('%s - %s', $start->formatLocalized($this->monthAndDayFormat), $end->formatLocalized($this->monthAndDayFormat));
        $isCustom = true === session('is_custom_range', false);
        $today    = today(config('app.timezone'));
        $ranges   = [
            // first range is the current range:
            $title => [$start, $end],
        ];

        // when current range is a custom range, add the current period as the next range.
        if ($isCustom) {
            $index             = app('navigation')->periodShow($start, $viewRange);
            $customPeriodStart = app('navigation')->startOfPeriod($start, $viewRange);
            $customPeriodEnd   = app('navigation')->endOfPeriod($customPeriodStart, $viewRange);
            $ranges[$index]    = [$customPeriodStart, $customPeriodEnd];
        }
        // then add previous range and next range
        $previousDate   = app('navigation')->subtractPeriod($start, $viewRange);
        $index          = app('navigation')->periodShow($previousDate, $viewRange);
        $previousStart  = app('navigation')->startOfPeriod($previousDate, $viewRange);
        $previousEnd    = app('navigation')->endOfPeriod($previousStart, $viewRange);
        $ranges[$index] = [$previousStart, $previousEnd];

        $nextDate       = app('navigation')->addPeriod($start, $viewRange, 0);
        $index          = app('navigation')->periodShow($nextDate, $viewRange);
        $nextStart      = app('navigation')->startOfPeriod($nextDate, $viewRange);
        $nextEnd        = app('navigation')->endOfPeriod($nextStart, $viewRange);
        $ranges[$index] = [$nextStart, $nextEnd];

        // today:
        /** @var Carbon $todayStart */
        $todayStart = app('navigation')->startOfPeriod($today, $viewRange);
        /** @var Carbon $todayEnd */
        $todayEnd = app('navigation')->endOfPeriod($todayStart, $viewRange);
        if ($todayStart->ne($start) || $todayEnd->ne($end)) {
            $ranges[ucfirst((string)trans('firefly.today'))] = [$todayStart, $todayEnd];
        }

        // last seven days:
        $seven          = Carbon::now()->subDays(7);
        $index          = (string)trans('firefly.last_seven_days');
        $ranges[$index] = [$seven, new Carbon];

        // last 30 days:
        $thirty         = Carbon::now()->subDays(30);
        $index          = (string)trans('firefly.last_thirty_days');
        $ranges[$index] = [$thirty, new Carbon];

        // everything
        $index          = (string)trans('firefly.everything');
        $ranges[$index] = [$first, new Carbon];

        return [
            'title'         => $title,
            'configuration' => [
                'apply'       => (string)trans('firefly.apply'),
                'cancel'      => (string)trans('firefly.cancel'),
                'from'        => (string)trans('firefly.from'),
                'to'          => (string)trans('firefly.to'),
                'customRange' => (string)trans('firefly.customRange'),
                'start'       => $start->format('Y-m-d'),
                'end'         => $end->format('Y-m-d'),
                'ranges'      => $ranges,
            ],
        ];
    }

    /**
     * Get specific info for special routes.
     *
     * @param string $route
     * @param string $specificPage
     *
     * @return array
     *
     */
    protected function getSpecificSteps(string $route, string $specificPage): array // get config values
    {
        $steps    = [];
        $routeKey = '';

        // user is on page with specific instructions:
        if ('' !== $specificPage) {
            $routeKey = str_replace('.', '_', $route);
            $elements = config(sprintf('intro.%s', $routeKey . '_' . $specificPage));
            if (is_array($elements) && count($elements) > 0) {
                foreach ($elements as $key => $options) {
                    $currentStep = $options;

                    // get the text:
                    $currentStep['intro'] = (string)trans('intro.' . $route . '_' . $specificPage . '_' . $key);

                    // save in array:
                    $steps[] = $currentStep;
                }
            }
        }
        Log::debug(sprintf('Total specific steps for route "%s" and page "%s" (routeKey is "%s") is %d', $route, $specificPage, $routeKey, count($steps)));

        return $steps;
    }

    /**
     *
     */
    protected function verifyRecurringCronJob(): void
    {
        $config   = app('fireflyconfig')->get('last_rt_job', 0);
        $lastTime = (int)$config->data;
        $now      = time();
        Log::debug(sprintf('verifyRecurringCronJob: last time is %d ("%s"), now is %d', $lastTime, $config->data, $now));
        if (0 === $lastTime) {
            request()->session()->flash('info', trans('firefly.recurring_never_cron'));

            return;
        }
        if ($now - $lastTime > 129600) {
            request()->session()->flash('warning', trans('firefly.recurring_cron_long_ago'));
        }
    }
}
