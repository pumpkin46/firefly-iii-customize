<?php
/**
 * ReportController.php
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

namespace FireflyIII\Http\Controllers\Popup;

use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Support\Http\Controllers\RenderPartialViews;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ReportController.
 *
 */
class ReportController extends Controller
{
    use RenderPartialViews;

    /**
     * Generate popup view.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     */
    public function general(Request $request): JsonResponse
    {
        $attributes = $request->get('attributes') ?? [];
        $attributes = $this->parseAttributes($attributes);

        app('view')->share('start', $attributes['startDate']);
        app('view')->share('end', $attributes['endDate']);

        switch ($attributes['location']) {
            default:
                $html = sprintf('Firefly III cannot handle "%s"-popups.', $attributes['location']);
                break;
            case 'budget-spent-amount':
                $html = $this->budgetSpentAmount($attributes);
                break;
            case 'expense-entry':
                $html = $this->expenseEntry($attributes);
                break;
            case 'income-entry':
                $html = $this->incomeEntry($attributes);
                break;
            case 'category-entry':
                $html = $this->categoryEntry($attributes);
                break;
            case 'budget-entry':
                $html = $this->budgetEntry($attributes);
                break;
        }

        return response()->json(['html' => $html]);
    }
}
