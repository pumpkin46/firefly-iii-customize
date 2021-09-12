<?php
/**
 * 2016_11_24_210552_changes_for_v420.php
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
 * Class ChangesForV420.
 *
 * @codeCoverageIgnore
 */
class ChangesForV420 extends Migration
{
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(
            'journal_meta',
            static function (Blueprint $table) {
                $table->dropSoftDeletes();
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
        Schema::table(
            'journal_meta',
            static function (Blueprint $table) {
                $table->softDeletes();
            }
        );
    }
}
