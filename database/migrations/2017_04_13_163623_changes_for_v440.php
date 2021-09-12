<?php
/**
 * 2017_04_13_163623_changes_for_v440.php
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

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class ChangesForV440.
 *
 * @codeCoverageIgnore
 */
class ChangesForV440 extends Migration
{
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('currency_exchange_rates')) {
            Schema::drop('currency_exchange_rates');
        }

        Schema::table(
            'transactions',
            static function (Blueprint $table) {
                if (Schema::hasColumn('transactions', 'transaction_currency_id')) {
                    // cannot drop foreign keys in SQLite:
                    if ('sqlite' !== config('database.default')) {
                        $table->dropForeign('transactions_transaction_currency_id_foreign');
                    }
                    $table->dropColumn('transaction_currency_id');
                }
            }
        );
    }

    /**
     * Run the migrations.
     *
     * @SuppressWarnings(PHPMD.ShortMethodName)
     */
    public function up(): void
    {
        if (!Schema::hasTable('currency_exchange_rates')) {
            Schema::create(
                'currency_exchange_rates',
                static function (Blueprint $table) {
                    $table->increments('id');
                    $table->timestamps();
                    $table->softDeletes();
                    $table->integer('user_id', false, true);
                    $table->integer('from_currency_id', false, true);
                    $table->integer('to_currency_id', false, true);
                    $table->date('date');
                    $table->decimal('rate', 36, 24);
                    $table->decimal('user_rate', 36, 24)->nullable();

                    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    $table->foreign('from_currency_id')->references('id')->on('transaction_currencies')->onDelete('cascade');
                    $table->foreign('to_currency_id')->references('id')->on('transaction_currencies')->onDelete('cascade');
                }
            );
        }

        Schema::table(
            'transactions',
            static function (Blueprint $table) {
                if (!Schema::hasColumn('transactions', 'transaction_currency_id')) {
                    $table->integer('transaction_currency_id', false, true)->after('description')->nullable();
                    $table->foreign('transaction_currency_id')->references('id')->on('transaction_currencies')->onDelete('set null');
                }
            }
        );
    }
}
