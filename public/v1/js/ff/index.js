/*
 * index.js
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

/** global: accountFrontpageUri, today, piggyInfoUri, token, billCount, accountExpenseUri, accountRevenueUri */

$(function () {
    "use strict";
    // do chart JS stuff.
    drawChart();

});

function drawChart() {
    "use strict";
    lineChart(accountFrontpageUri, 'accounts-chart');

    if (billCount > 0) {
        multiCurrencyPieChart('chart/bill/frontpage', 'bills-chart');
    }
    stackedColumnChart('chart/budget/frontpage', 'budgets-chart');
    columnChart('chart/category/frontpage', 'categories-chart');
    columnChart(accountExpenseUri, 'expense-accounts-chart');
    columnChart(accountRevenueUri, 'revenue-accounts-chart');

    // get balance box:
    getBalanceBox();
    getBillsBox();
    getAvailableBox();
    getNetWorthBox();
    getPiggyBanks();

    //getBoxAmounts();
}

/**
 *
 */
function getPiggyBanks() {
    $.getJSON(piggyInfoUri).done(function (data) {
        if (data.html.length > 0) {
            $('#piggy_bank_overview').html(data.html);
        }
    });
}

function getNetWorthBox() {
    // box-net-worth
    $.getJSON('json/box/net-worth').done(function (data) {
        $('#box-net-worth').html(data.net_worths.join(', '));
    });
}

/**
 *
 */
function getAvailableBox() {
    // box-left-to-spend
    // box-left-per-day
    //     * 0) If the user has available amount this period and has overspent: overspent box.
    //      * 1) If the user has available amount this period and has NOT overspent: left to spend box.
    //      * 2) if the user has no available amount set this period: spent per day
    $.getJSON('json/box/available').done(function (data) {
        $('#box-left-to-spend-text').text(data.title);
        if (0 === data.display) {
            $('#box-left-to-spend-box').removeClass('bg-green-gradient').addClass('bg-red-gradient');
            $('#box-left-to-spend').html(data.left_to_spend);
            $('#box-left-per-day').html(data.left_per_day);
        }
        if (1 === data.display) {
            $('#box-left-to-spend').html(data.left_to_spend);
            $('#box-left-per-day').html(data.left_per_day);
        }
        if (2 === data.display) {
            $('#box-left-to-spend').html(data.spent_total);
            $('#box-left-per-day').html(data.spent_per_day);
        }
    });
}

/**
 *
 */
function getBillsBox() {
    // box-bills-unpaid
    // box-bills-paid

    // get summary.

    $.getJSON('api/v1/summary/basic?start=' + sessionStart + '&end=' + sessionEnd).done(function (data) {
        var key;
        var unpaid = [];
        var paid = [];
        for (key in data) {
            //console.log(key);
            if (key.substr(0, 16) === 'bills-unpaid-in-') {
                // only when less than 3.
                if (unpaid.length < 3) {
                    unpaid.push(data[key].value_parsed);
                }
            }
            if (key.substr(0, 14) === 'bills-paid-in-') {
                // only when less than 5.
                if (paid.length < 3) {
                    paid.push(data[key].value_parsed);
                }
            }
        }
        $('#box-bills-unpaid').html(unpaid.join(', '));
        $('#box-bills-paid').html(paid.join(', '));
    });
}

/**
 *
 */
function getBalanceBox() {
    // box-balance-sums
    // box-balance-list
    $.getJSON('json/box/balance').done(function (data) {
        if (data.size === 1) {
            // show balance in "sums", show single entry in list.
            for (var x in data.sums) {
                $('#box-balance-sums').html(data.sums[x]);
                $('#box-balance-list').html(data.incomes[x] + ' + ' + data.expenses[x]);
            }
            return;
        }
        // do not use "sums", only use list.
        $('#box-balance-progress').remove();
        var expense, string, sum, income, current;

        // first loop, echo only "preferred".
        for (x in data.sums) {
            current = $('#box-balance-list').html();
            sum = data.sums[x];
            expense = data.expenses[x];
            income = data.incomes[x];
            string = income + ' + ' + expense + ': ' + sum;
            if (data.preferred == x) {
                $('#box-balance-list').html(current + '<span title="' + string + '">' + string + '</span>' + '<br>');
            }
        }
        // then list the others (only 1 space)

        var count = 0;
        for (x in data.sums) {
            if (count > 2) {
                return;
            }
            current = $('#box-balance-list').html();
            sum = data.sums[x];
            expense = data.expenses[x];
            income = data.incomes[x];
            string = income + ' + ' + expense + ': ' + sum;
            if (data.preferred != x) {
                $('#box-balance-list').html(current + '<span title="' + string + '">' + string + '</span>' + '<br>');
            }
            count++;

        }
    });
}