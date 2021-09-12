<?php
/**
 * AutomationHandler.php
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

namespace FireflyIII\Handlers\Events;

use Exception;
use FireflyIII\Events\RequestedReportOnJournals;
use FireflyIII\Mail\ReportNewJournalsMail;
use FireflyIII\Repositories\User\UserRepositoryInterface;
use Log;
use Mail;

/**
 * Class AutomationHandler
 */
class AutomationHandler
{

    /**
     * Respond to the creation of X journals.
     *
     * @param RequestedReportOnJournals $event
     *
     * @return bool
     */
    public function reportJournals(RequestedReportOnJournals $event): bool
    {
        $sendReport = config('firefly.send_report_journals');

        if (false === $sendReport) {
            return true; 
        }

        Log::debug('In reportJournals.');
        /** @var UserRepositoryInterface $repository */
        $repository = app(UserRepositoryInterface::class);
        $user       = $repository->findNull($event->userId);
        if (null !== $user && 0 !== $event->groups->count()) {

            $email = $user->email;

            // see if user has alternative email address:
            $pref = app('preferences')->getForUser($user, 'remote_guard_alt_email', null);
            if (null !== $pref) {
                $email = $pref->data;
            }

            // if user is demo user, send to owner:
            if ($user->hasRole('demo')) {
                $email = config('firefly.site_owner');
            }

            try {
                Log::debug('Trying to mail...');
                Mail::to($user->email)->send(new ReportNewJournalsMail($email, '127.0.0.1', $event->groups));

            } catch (Exception $e) { // @phpstan-ignore-line
                Log::debug('Send message failed! :(');
                Log::error($e->getMessage());
                Log::error($e->getTraceAsString());
            }

            Log::debug('Done!');
        }

        return true;
    }
}
