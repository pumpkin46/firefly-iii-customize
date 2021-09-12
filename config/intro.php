<?php
/**
 * intro.php
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

/*
 * Always make sure intro is the first element (if any) and outro is the last one.
 */

return [
    // index
    'index'               => [
        'intro'          => [],
        'accounts-chart' => ['element' => '#accounts-chart'],
        'box_out_holder' => ['element' => '#box_out_holder'],
        'help'           => ['element' => '#help', 'position' => 'bottom'],
        'sidebar-toggle' => ['element' => '#sidebar-toggle', 'position' => 'bottom'],
        'cash_account'   => ['element' => '#all_transactions', 'position' => 'left'],
        'outro'          => [],
    ],
    // accounts: create
    'accounts_create'     => [
        'iban' => ['element' => '#ffInput_iban'],
    ],
    // transactions: create
    'transactions_create' => [
        'basic_info'    => ['element' => '#transaction-info', 'position' => 'right'],
        'amount_info'   => ['element' => '#amount-info', 'position' => 'bottom'],
        'optional_info' => ['element' => '#optional-info', 'position' => 'left'],
        'split'         => ['element' => '.split_add_btn','position' => 'top'],
    ],

    'transactions_create_withdrawal' => [
    ],

    'transactions_create_deposit' => [
    ],

    'transactions_create_transfer' => [
    ],

    // extra text for asset account creation.
    'accounts_create_asset'        => [
        'opening_balance' => ['element' => '#ffInput_opening_balance'],
        'currency'        => ['element' => '#ffInput_currency_id'],
        'virtual'         => ['element' => '#ffInput_virtual_balance'],
    ],

    // budgets: index
    'budgets_index'                => [
        'intro'            => [],
        'set_budget'       => ['element' => '#availableBar'],
        'see_expenses_bar' => ['element' => '#spentBar'],
        'navigate_periods' => ['element' => '#periodNavigator'],
        'new_budget'       => ['element' => '#createBudgetBox'],
        'list_of_budgets'  => ['element' => '#budgetList'],
        'outro'            => [],

    ],
    // reports: index, default report, audit, budget, cat, tag
    'reports_index'                => [
        'intro'               => [],
        'inputReportType'     => ['element' => '#inputReportType'],
        'inputAccountsSelect' => ['element' => '#inputAccountsSelect'],
        'inputDateRange'      => ['element' => '#inputDateRange'],
        'extra-options-box'   => ['element' => '#extra-options-box', 'position' => 'top'],
    ],
    'reports_report_default'       => [
        'intro' => [],
    ],
    'reports_report_audit'         => [
        'intro'      => [],
        'optionsBox' => ['element' => '#optionsBox'],
    ],
    'reports_report_category'      => [
        'intro'                  => [],
        'pieCharts'              => ['element' => '#pieCharts'],
        'incomeAndExpensesChart' => ['element' => '#incomeAndExpensesChart', 'position' => 'top'],

    ],
    'reports_report_tag'           => [
        'intro'                  => [],
        'pieCharts'              => ['element' => '#pieCharts'],
        'incomeAndExpensesChart' => ['element' => '#incomeAndExpensesChart', 'position' => 'top'],
    ],
    'reports_report_budget'        => [
        'intro'                  => [],
        'pieCharts'              => ['element' => '#pieCharts'],
        'incomeAndExpensesChart' => ['element' => '#incomeAndExpensesChart', 'position' => 'top'],
    ],

    // piggies: index, create, show
    'piggy-banks_index'            => [
        'saved'         => ['element' => '.piggySaved'],
        'button'        => ['element' => '.piggyBar'],
        'accountStatus' => ['element' => '#accountStatus', 'position' => 'top'],
    ],
    'piggy-banks_create'           => [
        'name' => ['element' => '#ffInput_name'],
        'date' => ['element' => '#ffInput_targetdate'],

    ],
    'piggy-banks_show'             => [
        'piggyChart'   => ['element' => '#piggyChart'],
        'piggyDetails' => ['element' => '#piggyDetails'],
        'piggyEvents'  => ['element' => '#piggyEvents'],
    ],

    // bills: index, create, show
    'bills_index'                  => [
        'rules'              => ['element' => '.rules'],
        'paid_in_period'     => ['element' => '.paid_in_period'],
        'expected_in_period' => ['element' => '.expected_in_period'],
    ],
    'bills_create'                 => [
        'intro'              => [],
        'name'               => ['element' => '#name_holder'],
        //'match'              => ['element' => '#match_holder'],
        'amount_min_holder'  => ['element' => '#amount_min_holder'],
        'repeat_freq_holder' => ['element' => '#repeat_freq_holder'],
        'skip_holder'        => ['element' => '#skip_holder'],
    ],
    'bills_show'                   => [
        'billInfo'    => ['element' => '#billInfo'],
        'billButtons' => ['element' => '#billButtons'],
        'billChart'   => ['element' => '#billChart', 'position' => 'top'],

    ],
    // rules: index, create-rule, edit-rule
    'rules_index'                  => [
        'intro'          => [],
        'new_rule_group' => ['element' => '#new_rule_group'],
        'new_rule'       => ['element' => '.new_rule'],
        'prio_buttons'   => ['element' => '.prio_buttons'],
        'test_buttons'   => ['element' => '.test_buttons'],
        'rule-triggers'  => ['element' => '.rule-triggers'],
        'outro'          => [],
    ],
    'rules_create'                 => [
        'mandatory'          => ['element' => '#mandatory'],
        'ruletriggerholder'  => ['element' => '.rule-trigger-box'],
        'test_rule_triggers' => ['element' => '.test_rule_triggers'],
        'actions'            => ['element' => '.rule-action-box', 'position' => 'top'],
    ],
    // preferences: index
    'preferences_index'            => [
        'tabs' => ['element' => '.nav-tabs'],
    ],
    // currencies: index, create
    'currencies_index'             => [
        'intro'   => [],
        'default' => ['element' => '#default-currency'],
        'buttons' => ['element' => '.buttons'],
    ],
    'currencies_create'            => [
        'code' => ['element' => '#ffInput_code'],
    ],
];
