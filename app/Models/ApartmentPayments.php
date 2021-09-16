<?php

namespace FireflyIII\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use FireflyIII\Models\Apartment;

class ApartmentPayments extends Model
{
    use HasFactory;

    protected $fillable = ['apartment_id', 'account_id', 'date', 'transaction_id'];

    public function apartment() {
        return $this->belongsTo(Apartment::class, 'apartment_id', 'id');
    }
}
