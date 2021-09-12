<?php
/**
 * EventServiceProvider.php
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

namespace FireflyIII\Providers;

use Exception;
use FireflyIII\Events\AdminRequestedTestMessage;
use FireflyIII\Events\DestroyedTransactionGroup;
use FireflyIII\Events\DetectedNewIPAddress;
use FireflyIII\Events\RegisteredUser;
use FireflyIII\Events\RequestedNewPassword;
use FireflyIII\Events\RequestedReportOnJournals;
use FireflyIII\Events\RequestedSendWebhookMessages;
use FireflyIII\Events\RequestedVersionCheckStatus;
use FireflyIII\Events\StoredTransactionGroup;
use FireflyIII\Events\UpdatedTransactionGroup;
use FireflyIII\Events\UserChangedEmail;
use FireflyIII\Mail\OAuthTokenCreatedMail;
use FireflyIII\Models\PiggyBank;
use FireflyIII\Models\PiggyBankRepetition;
use FireflyIII\Repositories\User\UserRepositoryInterface;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Laravel\Passport\Client;
use Laravel\Passport\Events\AccessTokenCreated;
use Log;
use Mail;
use Request;
use Session;

/**
 * Class EventServiceProvider.
 *
 * @codeCoverageIgnore
 */
class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen
        = [
            // is a User related event.
            RegisteredUser::class               => [
                'FireflyIII\Handlers\Events\UserEventHandler@sendRegistrationMail',
                'FireflyIII\Handlers\Events\UserEventHandler@attachUserRole',
            ],
            // is a User related event.
            Login::class                        => [
                'FireflyIII\Handlers\Events\UserEventHandler@checkSingleUserIsAdmin',
                'FireflyIII\Handlers\Events\UserEventHandler@demoUserBackToEnglish',
                'FireflyIII\Handlers\Events\UserEventHandler@storeUserIPAddress',
            ],
            DetectedNewIPAddress::class         => [
                'FireflyIII\Handlers\Events\UserEventHandler@notifyNewIPAddress',
            ],
            RequestedVersionCheckStatus::class  => [
                'FireflyIII\Handlers\Events\VersionCheckEventHandler@checkForUpdates',
            ],
            RequestedReportOnJournals::class    => [
                'FireflyIII\Handlers\Events\AutomationHandler@reportJournals',
            ],

            // is a User related event.
            RequestedNewPassword::class         => [
                'FireflyIII\Handlers\Events\UserEventHandler@sendNewPassword',
            ],
            // is a User related event.
            UserChangedEmail::class             => [
                'FireflyIII\Handlers\Events\UserEventHandler@sendEmailChangeConfirmMail',
                'FireflyIII\Handlers\Events\UserEventHandler@sendEmailChangeUndoMail',
            ],
            // admin related
            AdminRequestedTestMessage::class    => [
                'FireflyIII\Handlers\Events\AdminEventHandler@sendTestMessage',
            ],
            // is a Transaction Journal related event.
            StoredTransactionGroup::class       => [
                'FireflyIII\Handlers\Events\StoredGroupEventHandler@processRules',
                'FireflyIII\Handlers\Events\StoredGroupEventHandler@triggerWebhooks',
            ],
            // is a Transaction Journal related event.
            UpdatedTransactionGroup::class      => [
                'FireflyIII\Handlers\Events\UpdatedGroupEventHandler@unifyAccounts',
                'FireflyIII\Handlers\Events\UpdatedGroupEventHandler@processRules',
                'FireflyIII\Handlers\Events\UpdatedGroupEventHandler@triggerWebhooks',
            ],
            DestroyedTransactionGroup::class    => [
                'FireflyIII\Handlers\Events\DestroyedGroupEventHandler@triggerWebhooks',
            ],
            // API related events:
            AccessTokenCreated::class           => [
                'FireflyIII\Handlers\Events\APIEventHandler@accessTokenCreated',
            ],

            // Webhook related event:
            RequestedSendWebhookMessages::class => [
                'FireflyIII\Handlers\Events\WebhookEventHandler@sendWebhookMessages',
            ],
        ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        parent::boot();
        $this->registerCreateEvents();
    }

    /**
     *
     */
    protected function registerCreateEvents(): void
    {
        // in case of repeated piggy banks and/or other problems.
        PiggyBank::created(
            static function (PiggyBank $piggyBank) {
                $repetition = new PiggyBankRepetition;
                $repetition->piggyBank()->associate($piggyBank);
                $repetition->startdate     = $piggyBank->startdate;
                $repetition->targetdate    = $piggyBank->targetdate;
                $repetition->currentamount = 0;
                $repetition->save();
            }
        );
        Client::created(
            static function (Client $oauthClient) {
                /** @var UserRepositoryInterface $repository */
                $repository = app(UserRepositoryInterface::class);
                $user       = $repository->findNull((int)$oauthClient->user_id);
                if (null === $user) {
                    Log::info('OAuth client generated but no user associated.');

                    return;
                }

                $email     = $user->email;
                $ipAddress = Request::ip();

                // see if user has alternative email address:
                $pref = app('preferences')->getForUser($user, 'remote_guard_alt_email', null);
                if (null !== $pref) {
                    $email = $pref->data;
                }

                Log::debug(sprintf('Now in EventServiceProvider::registerCreateEvents. Email is %s, IP is %s', $email, $ipAddress));
                try {
                    Log::debug('Trying to send message...');
                    Mail::to($email)->send(new OAuthTokenCreatedMail($email, $ipAddress, $oauthClient));
                } catch (Exception $e) { // @phpstan-ignore-line
                    Log::debug('Send message failed! :(');
                    Log::error($e->getMessage());
                    Log::error($e->getTraceAsString());
                    Session::flash('error', 'Possible email error: ' . $e->getMessage());
                }
                Log::debug('If no error above this line, message was sent.');
            }
        );
    }

}
