<?php

/**
 * RequestedNewPassword.php
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
 * Sends user link for new password.
 * Class RequestedNewPassword
 *
 * @codeCoverageIgnore
 */
class RequestedNewPassword extends Mailable
{
    use Queueable, SerializesModels;

    /** @var string IP address of user */
    public $ipAddress;
    /** @var string URI of password change link */
    public $url;

    /**
     * RequestedNewPassword constructor.
     *
     * @param string $url
     * @param string $ipAddress
     */
    public function __construct(string $url, string $ipAddress)
    {
        $this->url       = $url;
        $this->ipAddress = $ipAddress;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): self
    {
        return $this->view('emails.password-html')->text('emails.password-text')->subject((string)trans('email.reset_pw_subject'));
    }
}
