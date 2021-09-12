<?php
/**
 * PreferencesController.php
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

namespace FireflyIII\Http\Controllers;

use FireflyIII\Models\Account;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\Preference;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use JsonException;
use Log;

/**
 * Class PreferencesController.
 */
class PreferencesController extends Controller
{
    /**
     * PreferencesController constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        parent::__construct();

        $this->middleware(
            function ($request, $next) {
                app('view')->share('title', (string)trans('firefly.preferences'));
                app('view')->share('mainTitleIcon', 'fa-gear');

                return $next($request);
            }
        );
    }

    /**
     * Show overview of preferences.
     *
     * @param AccountRepositoryInterface $repository
     *
     * @return Factory|View
     */
    public function index(AccountRepositoryInterface $repository)
    {
        $accounts = $repository->getAccountsByType([AccountType::DEFAULT, AccountType::ASSET, AccountType::LOAN, AccountType::DEBT, AccountType::MORTGAGE]);
        $isDocker = env('IS_DOCKER', false);

        // group accounts
        $groupedAccounts = [];
        /** @var Account $account */
        foreach ($accounts as $account) {
            $type = $account->accountType->type;
            $role = sprintf('opt_group_%s', $repository->getMetaValue($account, 'account_role'));

            if (in_array($type, [AccountType::MORTGAGE, AccountType::DEBT, AccountType::LOAN], true)) {
                $role = sprintf('opt_group_l_%s', $type);
            }

            if ('' === $role || 'opt_group_' === $role) {
                $role = 'opt_group_defaultAsset';
            }
            $groupedAccounts[trans(sprintf('firefly.%s', $role))][$account->id] = $account->name;
        }
        ksort($groupedAccounts);

        $accountIds    = $accounts->pluck('id')->toArray();
        $viewRangePref = app('preferences')->get('viewRange', '1M');

        $viewRange          = $viewRangePref->data;
        $frontPageAccounts  = app('preferences')->get('frontPageAccounts', $accountIds);
        $language           = app('steam')->getLanguage();
        $languages          = config('firefly.languages');
        $locale             = app('preferences')->get('locale', config('firefly.default_locale', 'equal'))->data;
        $listPageSize       = app('preferences')->get('listPageSize', 50)->data;
        $customFiscalYear   = app('preferences')->get('customFiscalYear', 0)->data;
        $fiscalYearStartStr = app('preferences')->get('fiscalYearStart', '01-01')->data;
        $fiscalYearStart    = date('Y') . '-' . $fiscalYearStartStr;
        $tjOptionalFields   = app('preferences')->get('transaction_journal_optional_fields', [])->data;

        ksort($languages);

        // list of locales also has "equal" which makes it equal to whatever the language is.

        try {
            $locales = json_decode(file_get_contents(resource_path(sprintf('lang/%s/locales.json', $language))), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            Log::error($e->getMessage());
            $locales = [];
        }
        $locales = ['equal' => (string)trans('firefly.equal_to_language')] + $locales;
        // an important fallback is that the frontPageAccount array gets refilled automatically
        // when it turns up empty.
        if (0 === count($frontPageAccounts->data)) {
            $frontPageAccounts = $accountIds;
        }

        return prefixView(
            'preferences.index',
            compact(
                'language',
                'groupedAccounts',
                'isDocker',
                'frontPageAccounts',
                'languages',
                'locales',
                'locale',
                'tjOptionalFields',
                'viewRange',
                'customFiscalYear',
                'listPageSize',
                'fiscalYearStart'
            )
        );
    }

    /**
     * Store new preferences.
     *
     * @param Request $request
     *
     * @return RedirectResponse|Redirector
     *
     */
    public function postIndex(Request $request)
    {
        // front page accounts
        $frontPageAccounts = [];
        if (is_array($request->get('frontPageAccounts')) && count($request->get('frontPageAccounts')) > 0) {
            foreach ($request->get('frontPageAccounts') as $id) {
                $frontPageAccounts[] = (int)$id;
            }
            app('preferences')->set('frontPageAccounts', $frontPageAccounts);
        }

        // view range:
        app('preferences')->set('viewRange', $request->get('viewRange'));
        // forget session values:
        session()->forget('start');
        session()->forget('end');
        session()->forget('range');

        // custom fiscal year
        $customFiscalYear = 1 === (int)$request->get('customFiscalYear');
        $fiscalYearStart  = date('m-d', strtotime((string)$request->get('fiscalYearStart')));
        app('preferences')->set('customFiscalYear', $customFiscalYear);
        app('preferences')->set('fiscalYearStart', $fiscalYearStart);

        // save page size:
        app('preferences')->set('listPageSize', 50);
        $listPageSize = (int)$request->get('listPageSize');
        if ($listPageSize > 0 && $listPageSize < 1337) {
            app('preferences')->set('listPageSize', $listPageSize);
        }

        // language:
        /** @var Preference $currentLang */
        $currentLang = app('preferences')->get('language', 'en_US');
        $lang        = $request->get('language');
        if (array_key_exists($lang, config('firefly.languages'))) {
            app('preferences')->set('language', $lang);
        }
        if ($currentLang->data !== $lang) {
            // this string is untranslated on purpose.
            session()->flash('info', 'All translations are supplied by volunteers. There might be errors and mistakes. I appreciate your feedback.');
        }

        // same for locale:
        if (!auth()->user()->hasRole('demo')) {
            /** @var Preference $locale */
            $locale = $request->get('locale');
            app('preferences')->set('locale', $locale);
        }

        // optional fields for transactions:
        $setOptions = $request->get('tj') ?? [];
        $optionalTj = [
            'interest_date'      => array_key_exists('interest_date', $setOptions),
            'book_date'          => array_key_exists('book_date', $setOptions),
            'process_date'       => array_key_exists('process_date', $setOptions),
            'due_date'           => array_key_exists('due_date', $setOptions),
            'payment_date'       => array_key_exists('payment_date', $setOptions),
            'invoice_date'       => array_key_exists('invoice_date', $setOptions),
            'internal_reference' => array_key_exists('internal_reference', $setOptions),
            'notes'              => array_key_exists('notes', $setOptions),
            'attachments'        => array_key_exists('attachments', $setOptions),
            'external_uri'       => array_key_exists('external_uri', $setOptions),
            'location'           => array_key_exists('location', $setOptions),
            'links'              => array_key_exists('links', $setOptions),
        ];
        app('preferences')->set('transaction_journal_optional_fields', $optionalTj);

        session()->flash('success', (string)trans('firefly.saved_preferences'));
        app('preferences')->mark();

        // telemetry: user language preference + default language.
        app('telemetry')->feature('config.firefly.default_language', config('firefly.default_language', 'en_US'));
        app('telemetry')->feature('user.preferences.language', app('steam')->getLanguage());
        app('telemetry')->feature('user.preferences.locale', app('steam')->getLocale());

        return redirect(route('preferences.index'));
    }
}
