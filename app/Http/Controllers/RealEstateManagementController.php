<?php

namespace FireflyIII\Http\Controllers;

use Illuminate\Http\Request;
use FireflyIII\Models\Apartment;
use FireflyIII\Models\Account;

class RealEstateManagementController extends Controller
{
    public function index() {
        $title = 'Real-Estate Management';
        return prefixView('real-estate-management.index', compact('title'));
    }

    public function create() {
        $title = 'Create Apartment';
        return prefixView('real-estate-management.create', compact('title'));
    }

    public function getApartments() {
        $accounts = Account::all()->load('apartments');
        return response()->json(['accounts' => $accounts]);
    }

    public function store(Request $request) {
        Apartment::create([
            'apartmentNo' => $request->get('apartmentNo'),
            'rawRent' => $request->get('rawRent'),
            'renterName' => $request->get('renterName'),
            'sourceAccount' => $request->get('sourceAccount')['id'],
            'totalRent' => $request->get('totalRent'),
            'utilities' => $request->get('utilities'),
            'utilitiesTotal' => $request->get('utilitiesTotal'),
            'vat' => $request->get('vat'),
        ]);
        return response()->json(['data' => $request->all()]);
    }
}
