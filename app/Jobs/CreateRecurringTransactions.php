<?php

/**
 * CreateRecurringTransactions.php
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

namespace FireflyIII\Jobs;

use Carbon\Carbon;
use FireflyIII\Events\RequestedReportOnJournals;
use FireflyIII\Events\StoredTransactionGroup;
use FireflyIII\Models\Recurrence;
use FireflyIII\Models\RecurrenceRepetition;
use FireflyIII\Models\RecurrenceTransaction;
use FireflyIII\Models\TransactionGroup;
use FireflyIII\Repositories\Journal\JournalRepositoryInterface;
use FireflyIII\Repositories\Recurring\RecurringRepositoryInterface;
use FireflyIII\Repositories\TransactionGroup\TransactionGroupRepositoryInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Log;

/**
 * Class CreateRecurringTransactions.
 *
 */
class CreateRecurringTransactions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int                                  $created;
    public int                                  $executed;
    public int                                  $submitted;
    private Carbon                              $date;
    private bool                                $force;
    private TransactionGroupRepositoryInterface $groupRepository;
    private JournalRepositoryInterface          $journalRepository;
    private RecurringRepositoryInterface        $repository;

    /**
     * Create a new job instance.
     *
     * @codeCoverageIgnore
     *
     * @param Carbon $date
     */
    public function __construct(?Carbon $date)
    {
        if (null !== $date) {
            $newDate = clone $date;
            $newDate->startOfDay();
            $this->date = $newDate;
        }
        if (null === $date) {
            $newDate = new Carbon;
            $newDate->startOfDay();
            $this->date = $newDate;
        }
        $this->repository        = app(RecurringRepositoryInterface::class);
        $this->journalRepository = app(JournalRepositoryInterface::class);
        $this->groupRepository   = app(TransactionGroupRepositoryInterface::class);
        $this->force             = false;
        $this->submitted         = 0;
        $this->executed          = 0;
        $this->created           = 0;

        Log::debug(sprintf('Created new CreateRecurringTransactions("%s")', $this->date->format('Y-m-d')));
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::debug(sprintf('Now at start of CreateRecurringTransactions() job for %s.', $this->date->format('D d M Y')));
        $recurrences     = $this->repository->getAll();
        $result          = [];
        $count           = $recurrences->count();
        $this->submitted = $count;
        Log::debug(sprintf('Count of collection is %d', $count));

        // filter recurrences:
        $filtered = $this->filterRecurrences($recurrences);
        Log::debug(sprintf('Left after filtering is %d', $filtered->count()));
        /** @var Recurrence $recurrence */
        foreach ($filtered as $recurrence) {
            if (!array_key_exists($recurrence->user_id, $result)) {
                $result[$recurrence->user_id] = new Collection;
            }
            $this->repository->setUser($recurrence->user);
            $this->journalRepository->setUser($recurrence->user);
            $this->groupRepository->setUser($recurrence->user);

            // clear cache for user
            app('preferences')->setForUser($recurrence->user, 'lastActivity', microtime());

            Log::debug(sprintf('Now at recurrence #%d of user #%d', $recurrence->id, $recurrence->user_id));
            $createdReps = $this->handleRepetitions($recurrence);
            Log::debug(sprintf('Done with recurrence #%d', $recurrence->id));
            $result[$recurrence->user_id] = $result[$recurrence->user_id]->merge($createdReps);
            $this->executed++;
        }

        Log::debug('Now running report thing.');
        // will now send email to users.
        foreach ($result as $userId => $journals) {
            event(new RequestedReportOnJournals($userId, $journals));
        }

        Log::debug('Done with handle()');

        // clear cache:
        app('preferences')->mark();
    }

    /**
     * @param Collection $recurrences
     *
     * @return Collection
     */
    private function filterRecurrences(Collection $recurrences): Collection
    {
        return $recurrences->filter(
            function (Recurrence $recurrence) {
                return $this->validRecurrence($recurrence);
            }
        );
    }

    /**
     * Is the info in the recurrence valid?
     *
     * @param Recurrence $recurrence
     *
     * @return bool
     *
     */
    private function validRecurrence(Recurrence $recurrence): bool
    {
        Log::debug(sprintf('Now filtering recurrence #%d, owned by user #%d', $recurrence->id, $recurrence->user_id));
        // is not active.
        if (!$this->active($recurrence)) {
            Log::info(sprintf('Recurrence #%d is not active. Skipped.', $recurrence->id));

            return false;
        }

        // has repeated X times.
        $journalCount = $this->repository->getJournalCount($recurrence);
        if (0 !== $recurrence->repetitions && $journalCount >= $recurrence->repetitions && false === $this->force) {
            Log::info(sprintf('Recurrence #%d has run %d times, so will run no longer.', $recurrence->id, $recurrence->repetitions));

            return false;
        }
        // is no longer running
        if ($this->repeatUntilHasPassed($recurrence)) {
            Log::info(
                sprintf(
                    'Recurrence #%d was set to run until %s, and today\'s date is %s. Skipped.',
                    $recurrence->id,
                    $recurrence->repeat_until->format('Y-m-d'),
                    $this->date->format('Y-m-d')
                )
            );

            return false;
        }

        // first_date is in the future
        if ($this->hasNotStartedYet($recurrence)) {
            Log::info(
                sprintf(
                    'Recurrence #%d is set to run on %s, and today\'s date is %s. Skipped.',
                    $recurrence->id,
                    $recurrence->first_date->format('Y-m-d'),
                    $this->date->format('Y-m-d')
                )
            );

            return false;
        }

        // already fired today (with success):
        if (false === $this->force && $this->hasFiredToday($recurrence)) {
            Log::info(sprintf('Recurrence #%d has already fired today. Skipped.', $recurrence->id));

            return false;
        }
        Log::debug('Will be included.');

        return true;
    }

    /**
     * Return recurring transaction is active.
     *
     * @param Recurrence $recurrence
     *
     * @return bool
     */
    private function active(Recurrence $recurrence): bool
    {
        return $recurrence->active;
    }

    /**
     * Return true if the $repeat_until date is in the past.
     *
     * @param Recurrence $recurrence
     *
     * @return bool
     */
    private function repeatUntilHasPassed(Recurrence $recurrence): bool
    {
        // date has passed
        return null !== $recurrence->repeat_until && $recurrence->repeat_until->lt($this->date);
    }

    /**
     * Has the recurrence started yet?
     *
     * @param Recurrence $recurrence
     *
     * @return bool
     */
    private function hasNotStartedYet(Recurrence $recurrence): bool
    {
        $startDate = $this->getStartDate($recurrence);

        return $startDate->gt($this->date);
    }

    /**
     * Get the start date of a recurrence.
     *
     * @param Recurrence $recurrence
     *
     * @return Carbon
     */
    private function getStartDate(Recurrence $recurrence): Carbon
    {
        $startDate = clone $recurrence->first_date;
        if (null !== $recurrence->latest_date && $recurrence->latest_date->gte($startDate)) {
            $startDate = clone $recurrence->latest_date;
        }

        return $startDate;
    }

    /**
     * Has the recurrence fired today.
     *
     * @param Recurrence $recurrence
     *
     * @return bool
     */
    private function hasFiredToday(Recurrence $recurrence): bool
    {
        return null !== $recurrence->latest_date && $recurrence->latest_date->eq($this->date);
    }

    /**
     * Separate method that will loop all repetitions and do something with it. Will return
     * all created transaction journals.
     *
     * @param Recurrence $recurrence
     *
     * @return Collection
     */
    private function handleRepetitions(Recurrence $recurrence): Collection
    {
        $collection = new Collection;
        /** @var RecurrenceRepetition $repetition */
        foreach ($recurrence->recurrenceRepetitions as $repetition) {
            Log::debug(
                sprintf(
                    'Now repeating %s with value "%s", skips every %d time(s)',
                    $repetition->repetition_type,
                    $repetition->repetition_moment,
                    $repetition->repetition_skip
                )
            );

            // start looping from $startDate to today perhaps we have a hit?
            // add two days to $this->date so we always include the weekend.
            $includeWeekend = clone $this->date;
            $includeWeekend->addDays(2);
            $occurrences = $this->repository->getOccurrencesInRange($repetition, $recurrence->first_date, $includeWeekend);

            unset($includeWeekend);

            $result     = $this->handleOccurrences($recurrence, $repetition, $occurrences);
            $collection = $collection->merge($result);
        }

        return $collection;
    }

    /**
     * Check if the occurences should be executed.
     *
     * @param Recurrence           $recurrence
     * @param RecurrenceRepetition $repetition
     * @param array                $occurrences
     *
     * @return Collection
     */
    private function handleOccurrences(Recurrence $recurrence, RecurrenceRepetition $repetition, array $occurrences): Collection
    {
        $collection = new Collection;
        /** @var Carbon $date */
        foreach ($occurrences as $date) {
            $result = $this->handleOccurrence($recurrence, $repetition, $date);
            if (null !== $result) {
                $collection->push($result);
            }
        }

        return $collection;
    }

    /**
     * @param Recurrence           $recurrence
     * @param RecurrenceRepetition $repetition
     * @param Carbon               $date
     *
     * @return TransactionGroup|null
     */
    private function handleOccurrence(Recurrence $recurrence, RecurrenceRepetition $repetition, Carbon $date): ?TransactionGroup
    {
        $date->startOfDay();
        if ($date->ne($this->date)) {

            return null;
        }
        Log::debug(sprintf('%s IS today (%s)', $date->format('Y-m-d'), $this->date->format('Y-m-d')));

        // count created journals on THIS day.
        $journalCount = $this->repository->getJournalCount($recurrence, $date, $date);
        if ($journalCount > 0 && false === $this->force) {
            Log::info(sprintf('Already created %d journal(s) for date %s', $journalCount, $date->format('Y-m-d')));

            return null;
        }

        if ($journalCount > 0 && true === $this->force) {
            Log::warning(sprintf('Already created %d groups for date %s but FORCED to continue.', $journalCount, $date->format('Y-m-d')));
        }

        // create transaction array and send to factory.
        $groupTitle = null;
        if ($recurrence->recurrenceTransactions->count() > 1) {
            /** @var RecurrenceTransaction $first */

            $first      = $recurrence->recurrenceTransactions()->first();
            $groupTitle = $first->description;

        }

        $array = [
            'user'         => $recurrence->user_id,
            'group_title'  => $groupTitle,
            'transactions' => $this->getTransactionData($recurrence, $repetition, $date),
        ];
        /** @var TransactionGroup $group */
        $group = $this->groupRepository->store($array);
        $this->created++;
        Log::info(sprintf('Created new transaction group #%d', $group->id));

        // trigger event:
        event(new StoredTransactionGroup($group, $recurrence->apply_rules));

        // update recurring thing:
        $recurrence->latest_date = $date;
        $recurrence->save();

        return $group;
    }

    /**
     * Get transaction information from a recurring transaction.
     *
     * @param Recurrence           $recurrence
     * @param RecurrenceRepetition $repetition
     * @param Carbon               $date
     *
     * @return array
     *
     */
    private function getTransactionData(Recurrence $recurrence, RecurrenceRepetition $repetition, Carbon $date): array
    {
        // total transactions expected for this recurrence:
        $total        = $this->repository->totalTransactions($recurrence, $repetition);
        $count        = $this->repository->getJournalCount($recurrence) + 1;
        $transactions = $recurrence->recurrenceTransactions()->get();
        $return       = [];
        /** @var RecurrenceTransaction $transaction */
        foreach ($transactions as $index => $transaction) {
            $single   = [
                'type'                  => strtolower($recurrence->transactionType->type),
                'date'                  => $date,
                'user'                  => $recurrence->user_id,
                'currency_id'           => (int)$transaction->transaction_currency_id,
                'currency_code'         => null,
                'description'           => $recurrence->recurrenceTransactions()->first()->description,
                'amount'                => $transaction->amount,
                'budget_id'             => $this->repository->getBudget($transaction),
                'budget_name'           => null,
                'category_id'           => null,
                'category_name'         => $this->repository->getCategory($transaction),
                'source_id'             => $transaction->source_id,
                'source_name'           => null,
                'destination_id'        => $transaction->destination_id,
                'destination_name'      => null,
                'foreign_currency_id'   => $transaction->foreign_currency_id,
                'foreign_currency_code' => null,
                'foreign_amount'        => $transaction->foreign_amount,
                'reconciled'            => false,
                'identifier'            => $index,
                'recurrence_id'         => (int)$recurrence->id,
                'order'                 => $index,
                'notes'                 => (string)trans('firefly.created_from_recurrence', ['id' => $recurrence->id, 'title' => $recurrence->title]),
                'tags'                  => $this->repository->getTags($transaction),
                'piggy_bank_id'         => $this->repository->getPiggyBank($transaction),
                'piggy_bank_name'       => null,
                'bill_id'               => null,
                'bill_name'             => null,
                'recurrence_total'      => $total,
                'recurrence_count'      => $count,
            ];
            $return[] = $single;
        }

        return $return;
    }

    /**
     * @param Carbon $date
     */
    public function setDate(Carbon $date): void
    {
        $newDate = clone $date;
        $newDate->startOfDay();
        $this->date = $newDate;
    }

    /**
     * @param bool $force
     */
    public function setForce(bool $force): void
    {
        $this->force = $force;
    }
}
