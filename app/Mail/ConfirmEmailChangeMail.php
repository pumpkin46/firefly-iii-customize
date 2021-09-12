<?php
/**
 * ConfirmEmailChangeMail.php
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

namespace FireflyIII\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class ConfirmEmailChangeMail
 *
 * Sends message to new address to confirm change.
 *
 * @codeCoverageIgnore
 */
class ConfirmEmailChangeMail extends Mailable
{
    use Queueable, SerializesModels;

    /** @var string IP address of user */
    public $ipAddress;
    /** @var string New email address */
    public $newEmail;
    /** @var string Old email address */
    public $oldEmail;
    /** @var string Confirmation link */
    public $uri;

    /**
     * ConfirmEmailChangeMail constructor.
     *
     * @param string $newEmail
     * @param string $oldEmail
     * @param string $uri
     * @param string $ipAddress
     */
    public function __construct(string $newEmail, string $oldEmail, string $uri, string $ipAddress)
    {
        $this->newEmail  = $newEmail;
        $this->oldEmail  = $oldEmail;
        $this->uri       = $uri;
        $this->ipAddress = $ipAddress;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): self
    {
        return $this->view('emails.confirm-email-change-html')->text('emails.confirm-email-change-text')
                    ->subject((string)trans('email.email_change_subject'));
    }
}
