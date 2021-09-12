<?php
/**
 * FrontpageController.php
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

namespace FireflyIII\Http\Controllers\Json;

use FireflyIII\Http\Controllers\Controller;
use FireflyIII\Models\PiggyBank;
use FireflyIII\Repositories\PiggyBank\PiggyBankRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Log;
use Throwable;

/**
 * Class FrontpageController.
 */
class FrontpageController extends Controller
{
    /**
     * Piggy bank pie chart.
     *
     * @param PiggyBankRepositoryInterface $repository
     *
     * @return JsonResponse
     */
    public function piggyBanks(PiggyBankRepositoryInterface $repository): JsonResponse
    {
        $set  = $repository->getPiggyBanks();
        $info = [];
        /** @var PiggyBank $piggyBank */
        foreach ($set as $piggyBank) {
            $amount = $repository->getCurrentAmount($piggyBank);
            if (1 === bccomp($amount, '0')) {
                // percentage!
                $pct = round(($amount / $piggyBank->targetamount) * 100);

                $entry = [
                    'id'         => $piggyBank->id,
                    'name'       => $piggyBank->name,
                    'amount'     => $amount,
                    'target'     => $piggyBank->targetamount,
                    'percentage' => $pct,
                ];

                $info[] = $entry;
            }
        }
        $html = '';
        if (0!==count($info)) {
            try {
                $html = prefixView('json.piggy-banks', compact('info'))->render();

            } catch (Throwable $e) { // @phpstan-ignore-line
                Log::error(sprintf('Cannot render json.piggy-banks: %s', $e->getMessage()));
                $html = 'Could not render view.';
            }

        }

        return response()->json(['html' => $html]);
    }
}
