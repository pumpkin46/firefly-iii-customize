<?php
/**
 * CategoryList.php
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

namespace FireflyIII\Support\Binder;

use FireflyIII\Models\Category;
use Illuminate\Routing\Route;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class CategoryList.
 */
class CategoryList implements BinderInterface
{
    /**
     * @param string $value
     * @param Route  $route
     *
     * @return Collection
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *
     */
    public static function routeBinder(string $value, Route $route): Collection
    {
        if (auth()->check()) {
            if ('allCategories' === $value) {
                return auth()->user()->categories()
                             ->orderBy('name', 'ASC')
                             ->get();
            }

            $list = array_unique(array_map('\intval', explode(',', $value)));
            if (0 === count($list)) {
                throw new NotFoundHttpException; 
            }

            /** @var \Illuminate\Support\Collection $collection */
            $collection = auth()->user()->categories()
                                ->whereIn('id', $list)
                                ->get();

            // add empty category if applicable.
            if (in_array(0, $list, true)) {
                $collection->push(new Category);
            }

            if ($collection->count() > 0) {
                return $collection;
            }
        }
        throw new NotFoundHttpException;
    }
}
