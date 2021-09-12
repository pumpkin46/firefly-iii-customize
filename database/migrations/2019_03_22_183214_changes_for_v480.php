<?php
/**
 * 2019_03_22_183214_changes_for_v480.php
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
 * Class ChangesForV480.
 *
 * @codeCoverageIgnore
 */
class ChangesForV480 extends Migration
{
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table(
            'transaction_journals',
            static function (Blueprint $table) {
                // drop transaction_group_id + foreign key.
                // cannot drop foreign keys in SQLite:
                if ('sqlite' !== config('database.default')) {
                    $table->dropForeign('transaction_journals_transaction_group_id_foreign');
                }
                $table->dropColumn('transaction_group_id');
            }
        );
        Schema::table(
            'rule_groups', static function (Blueprint $table) {
            $table->dropColumn('stop_processing');
        }
        );

        Schema::table(
            'users', static function (Blueprint $table) {
            $table->dropColumn('mfa_secret');
        }
        );
    }

    /**
     * Run the migrations.
     * @SuppressWarnings(PHPMD.ShortMethodName)
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table(
            'transaction_journals',
            static function (Blueprint $table) {
                $table->integer('transaction_currency_id', false, true)->nullable()->change();

                // add column "group_id" after "transaction_type_id"
                $table->integer('transaction_group_id', false, true)
                      ->nullable()->default(null)->after('transaction_type_id');

                // add foreign key for "transaction_group_id"
                $table->foreign('transaction_group_id')->references('id')->on('transaction_groups')->onDelete('cascade');
            }
        );
        Schema::table(
            'rule_groups', static function (Blueprint $table) {
            $table->boolean('stop_processing')->default(false);
        }
        );
        Schema::table(
            'users', static function (Blueprint $table) {
            $table->string('mfa_secret', 50)->nullable();
        }
        );
    }
}
