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
        'sourceAccount',
        'expenseAccount',
        'renterAccount',
        'totalRent',
        'utilities',
        'utilitiesTotal',
        'vat',
    ];

    public function accounts()
    {
        return $this->belongsTo(Account::class, 'expenseAccount', 'id');
    }

    public function source_account() {
        return $this->hasOne(Account::class, 'id', 'sourceAccount');
    }

    public function renter_account() {
        return $this->hasOne(Account::class, 'id', 'renterAccount');
    }

    public function expense_account() {
        return $this->hasOne(Account::class, 'id', 'expenseAccount');
    }

    public function payments() {
        return $this->hasMany(ApartmentPayments::class, 'apartment_id', 'id');
    }
}
