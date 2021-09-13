<?php

namespace FireflyIII\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use FireflyIII\Models\Account;

class Apartment extends Model
{
    use HasFactory;
    protected $fillable = [
        'apartmentNo',
        'rawRent',
        'renterName',
        'sourceAccount',
        'totalRent',
        'utilities',
        'utilitiesTotal',
        'vat',
    ];

    public function accounts()
    {
        return $this->belongsTo(Account::class, 'sourceAccount', 'id');
    }
}
