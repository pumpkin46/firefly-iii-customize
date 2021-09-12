<?php
/**
 * RecurrenceDestroyService.php
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

namespace FireflyIII\Services\Internal\Destroy;

use Exception;
use FireflyIII\Models\Recurrence;
use FireflyIII\Models\RecurrenceTransaction;
use Log;

/**
 * @codeCoverageIgnore
 * Class RecurrenceDestroyService
 */
class RecurrenceDestroyService
{
    /**
     * Delete recurrence by ID
     *
     * @param int $recurrenceId
     */
    public function destroyById(int $recurrenceId): void
    {
        $recurrence = Recurrence::find($recurrenceId);
        if (null === $recurrence) {
            return;
        }
        $this->destroy($recurrence);

    }

    /**
     * Delete recurrence.
     *
     * @param Recurrence $recurrence
     *
     */
    public function destroy(Recurrence $recurrence): void
    {
        try {
            // delete all meta data
            $recurrence->recurrenceMeta()->delete();
        } catch (Exception $e) { // @phpstan-ignore-line
            // @ignoreException
        }
        // delete all transactions.
        /** @var RecurrenceTransaction $transaction */
        foreach ($recurrence->recurrenceTransactions as $transaction) {
            $transaction->recurrenceTransactionMeta()->delete();
            try {
                $transaction->delete();
            } catch (Exception $e) { // @phpstan-ignore-line
                // @ignoreException
            }
        }
        // delete all repetitions
        $recurrence->recurrenceRepetitions()->delete();

        // delete recurrence
        try {
            $recurrence->delete();
        } catch (Exception $e) { // @phpstan-ignore-line
            // @ignoreException
        }
    }

}
