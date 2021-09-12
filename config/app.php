<?php
/**
 * app.php
 * Copyright (c) 2019 james@firefly-iii.org.
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

use FireflyIII\Support\Facades\Telemetry;

return [
    'name'            => envNonEmpty('APP_NAME', 'Firefly III'),
    'env'             => envNonEmpty('APP_ENV', 'local'),
    'debug'           => env('APP_DEBUG', false),
    'url'             => envNonEmpty('APP_URL', 'http://localhost'),
    'timezone'        => envNonEmpty('TZ', 'UTC'),
    'locale'          => envNonEmpty('DEFAULT_LANGUAGE', 'en_US'),
    'fallback_locale' => 'en_US',
    'key'             => env('APP_KEY'),
    'cipher'          => 'AES-256-CBC',
    'providers'       => [

        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        FireflyIII\Providers\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        FireflyIII\Providers\AppServiceProvider::class,
        FireflyIII\Providers\AuthServiceProvider::class,
        // FireflyIII\Providers\BroadcastServiceProvider::class,
        FireflyIII\Providers\EventServiceProvider::class,
        FireflyIII\Providers\RouteServiceProvider::class,

        // own stuff:
        PragmaRX\Google2FALaravel\ServiceProvider::class,
        TwigBridge\ServiceProvider::class,

        /*
         * More service providers.
        */
        FireflyIII\Providers\AccountServiceProvider::class,
        FireflyIII\Providers\AttachmentServiceProvider::class,
        FireflyIII\Providers\BillServiceProvider::class,
        FireflyIII\Providers\BudgetServiceProvider::class,
        FireflyIII\Providers\CategoryServiceProvider::class,
        FireflyIII\Providers\CurrencyServiceProvider::class,
        FireflyIII\Providers\FireflyServiceProvider::class,
        FireflyIII\Providers\JournalServiceProvider::class,
        FireflyIII\Providers\PiggyBankServiceProvider::class,
        FireflyIII\Providers\RuleServiceProvider::class,
        FireflyIII\Providers\RuleGroupServiceProvider::class,
        FireflyIII\Providers\SearchServiceProvider::class,
        FireflyIII\Providers\TagServiceProvider::class,
        FireflyIII\Providers\AdminServiceProvider::class,
        FireflyIII\Providers\RecurringServiceProvider::class,
    ],
    'aliases'         => [
        'App'           => Illuminate\Support\Facades\App::class,
        'Artisan'       => Illuminate\Support\Facades\Artisan::class,
        'Auth'          => Illuminate\Support\Facades\Auth::class,
        'Blade'         => Illuminate\Support\Facades\Blade::class,
        'Broadcast'     => Illuminate\Support\Facades\Broadcast::class,
        'Bus'           => Illuminate\Support\Facades\Bus::class,
        'Cache'         => Illuminate\Support\Facades\Cache::class,
        'Config'        => Illuminate\Support\Facades\Config::class,
        'Cookie'        => Illuminate\Support\Facades\Cookie::class,
        'Crypt'         => Illuminate\Support\Facades\Crypt::class,
        'DB'            => Illuminate\Support\Facades\DB::class,
        'Eloquent'      => Illuminate\Database\Eloquent\Model::class,
        'Event'         => Illuminate\Support\Facades\Event::class,
        'File'          => Illuminate\Support\Facades\File::class,
        'Gate'          => Illuminate\Support\Facades\Gate::class,
        'Hash'          => Illuminate\Support\Facades\Hash::class,
        'Lang'          => Illuminate\Support\Facades\Lang::class,
        'Log'           => Illuminate\Support\Facades\Log::class,
        'Mail'          => Illuminate\Support\Facades\Mail::class,
        'Notification'  => Illuminate\Support\Facades\Notification::class,
        'Password'      => Illuminate\Support\Facades\Password::class,
        'Queue'         => Illuminate\Support\Facades\Queue::class,
        'Redirect'      => Illuminate\Support\Facades\Redirect::class,
        'Redis'         => Illuminate\Support\Facades\Redis::class,
        'Request'       => Illuminate\Support\Facades\Request::class,
        'Response'      => Illuminate\Support\Facades\Response::class,
        'Route'         => Illuminate\Support\Facades\Route::class,
        'Schema'        => Illuminate\Support\Facades\Schema::class,
        'Session'       => Illuminate\Support\Facades\Session::class,
        'Storage'       => Illuminate\Support\Facades\Storage::class,
        'URL'           => Illuminate\Support\Facades\URL::class,
        'Validator'     => Illuminate\Support\Facades\Validator::class,
        'View'          => Illuminate\Support\Facades\View::class,
        'Form'          => Collective\Html\FormFacade::class,
        'Html'          => Collective\Html\HtmlFacade::class,
        'Preferences'   => \FireflyIII\Support\Facades\Preferences::class,
        'FireflyConfig' => \FireflyIII\Support\Facades\FireflyConfig::class,
        'Navigation'    => \FireflyIII\Support\Facades\Navigation::class,
        'Amount'        => \FireflyIII\Support\Facades\Amount::class,
        'Steam'         => \FireflyIII\Support\Facades\Steam::class,
        'ExpandedForm'  => \FireflyIII\Support\Facades\ExpandedForm::class,
        'CurrencyForm'  => \FireflyIII\Support\Facades\CurrencyForm::class,
        'AccountForm'   => \FireflyIII\Support\Facades\AccountForm::class,
        'PiggyBankForm' => \FireflyIII\Support\Facades\PiggyBankForm::class,
        'RuleForm'      => \FireflyIII\Support\Facades\RuleForm::class,
        'Telemetry'     => Telemetry::class,
        'Google2FA'     => PragmaRX\Google2FALaravel\Facade::class,
        'Twig'          => TwigBridge\Facade\Twig::class,

        'Arr' => Illuminate\Support\Arr::class,
        'Http' => Illuminate\Support\Facades\Http::class,
        'Str' => Illuminate\Support\Str::class,
    ],

    'asset_url' => env('ASSET_URL', null),

    /*
    |--------------------------------------------------------------------------
    | Faker Locale
    |--------------------------------------------------------------------------
    |
    | This locale will be used by the Faker PHP library when generating fake
    | data for your database seeds. For example, this will be used to get
    | localized telephone numbers, street address information and more.
    |
    */

    'faker_locale' => 'en_US',

];
