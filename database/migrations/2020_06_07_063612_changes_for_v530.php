<?php

/**
 * 2020_06_07_063612_changes_for_v530.php
 * Copyright (c) 2020 james@firefly-iii.org
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
 * Class ChangesForV530
 *
 * @codeCoverageIgnore
 */
class ChangesForV530 extends Migration
{
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('object_groupables');
        Schema::dropIfExists('object_groups');
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        if (!Schema::hasTable('object_groups')) {
            Schema::create(
                'object_groups', static function (Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id', false, true);
                $table->timestamps();
                $table->softDeletes();
                $table->string('title', 255);
                $table->mediumInteger('order', false, true)->default(0);
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            }
            );
        }
        if (!Schema::hasTable('object_groupables')) {
            Schema::create(
                'object_groupables', static function (Blueprint $table) {
                $table->integer('object_group_id');
                $table->integer('object_groupable_id', false, true);
                $table->string('object_groupable_type', 255);
            }
            );
        }
    }
}
