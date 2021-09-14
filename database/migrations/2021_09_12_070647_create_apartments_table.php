<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->string('apartmentNo')->nullable();
            $table->string('rawRent')->nullable();
            $table->string('sourceAccount')->nullable();
            $table->string('expenseAccount')->nullable();
            $table->string('renterAccount')->nullable();
            $table->string('totalRent')->nullable();
            $table->string('utilities')->nullable();
            $table->string('utilitiesTotal')->nullable();
            $table->string('vat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartments');
    }
}
