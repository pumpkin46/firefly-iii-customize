<?php
/**
 * MailError.php
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

use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Log;
use Mail;

/**
 * Class MailError.
 *
 * @codeCoverageIgnore
 */
class MailError extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected string $destination;
    protected array $exception;
    protected string $ipAddress;
    protected array $userData;

    /**
     * MailError constructor.
     *
     * @param array  $userData
     * @param string $destination
     * @param string $ipAddress
     * @param array  $exceptionData
     */
    public function __construct(array $userData, string $destination, string $ipAddress, array $exceptionData)
    {
        $this->userData    = $userData;
        $this->destination = $destination;
        $this->ipAddress   = $ipAddress;
        $this->exception   = $exceptionData;
        $debug             = $exceptionData;
        unset($debug['stackTrace']);
        Log::error('Exception is: ' . json_encode($debug));
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $email            = config('firefly.site_owner');
        $args             = $this->exception;
        $args['loggedIn'] = $this->userData['id'] > 0;
        $args['user']     = $this->userData;
        $args['ip']       = $this->ipAddress;
        $args['token']    = config('firefly.ipinfo_token');
        if ($this->attempts() < 3) {
            try {
                Mail::send(
                    ['emails.error-html', 'emails.error-text'],
                    $args,
                    function (Message $message) use ($email) {
                        if ('mail@example.com' !== $email) {
                            $message->to($email, $email)->subject((string)trans('email.error_subject'));
                        }
                    }
                );
            } catch (Exception $e) { // @phpstan-ignore-line
                Log::error('Exception when mailing: ' . $e->getMessage());
            }
        }
    }
}
