<?php

namespace FireflyIII\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use FireflyIII\Models\Apartment;
use FireflyIII\Models\Account;
use FireflyIII\Models\ApartmentPayments;

class RealEstateManagementController extends Controller
{
    public function index()
    {
        $title = 'Real-Estate Management';
        $expenseId      = (int)request()->get('expense');
        return prefixView('real-estate-management.index', compact('title', 'expenseId'));
    }

    public function create()
    {
        $title = 'Create Apartment';
        return prefixView('real-estate-management.create', compact('title'));
    }

    public function edit(Apartment $apartment)
    {
        $title = 'Edit Apartment';
        return prefixView('real-estate-management.edit', compact('title', 'apartment'));
    }

    public function getApartments()
    {
        $accounts = Account::has('apartments')->get()->load(['apartments.source_account', 'apartments.renter_account']);
        return response()->json(['accounts' => $accounts]);
    }

    public function get_apartment_by_id(Request $request)
    {
        $apartment =  Apartment::with(['source_account', 'renter_account', 'expense_account'])->where('id', $request->get('id'))->first();
        return response()->json(['apartment' => $apartment]);
    }

    public function store(Request $request)
    {
        $apartment = Apartment::create([
            'apartmentNo' => $request->get('apartmentNo'),
            'rawRent' => $request->get('rawRent'),
            'sourceAccount' => $request->get('sourceAccount')['id'],
            'expenseAccount' => $request->get('expenseAccount')['id'],
            'renterAccount' => $request->get('renterAccount')['id'],
            'totalRent' => $request->get('totalRent'),
            'utilities' => $request->get('utilities'),
            'utilitiesTotal' => $request->get('utilitiesTotal'),
            'vat' => $request->get('vat'),
        ]);
        $account = Account::find($request->get('renterAccount')['id']);
        if(!$account->rent_start_date){
            $account->rent_start_date = $apartment->created_at;
            $account->save();
        }
        return response()->json(['data' => $request->all()]);
    }

    public function update(Request $request)
    {
        $apartment = Apartment::find($request->get('id'));
        $account = Account::find($apartment->renterAccount);
        Apartment::where('id', $request->get('id'))
            ->update([
                'apartmentNo' => $request->get('apartmentNo'),
                'rawRent' => $request->get('rawRent'),
                'sourceAccount' => $request->get('sourceAccount')['id'],
                'expenseAccount' => $request->get('expenseAccount')['id'],
                'renterAccount' => $request->get('renterAccount')['id'],
                'totalRent' => $request->get('totalRent'),
                'utilities' => $request->get('utilities'),
                'utilitiesTotal' => $request->get('utilitiesTotal'),
                'vat' => $request->get('vat'),
            ]);
        $apartments = Apartment::where('renterAccount', $account->id)->get();
        if(count($apartments) == 0){
            $account->rent_end_date = Carbon::now()->toTimeString();
            $account->save();
        }
        return response()->json(['data' => $apartments]);
    }

    public function rent_control()
    {
        $title = 'Rent Control';
        return prefixView('real-estate-management.rent-control', compact('title'));
    }

    public function getRentStatus(Request $request)
    {
        global $request;
        $accounts = Account::has('apartments')->get()->load(['apartments' => function ($query) {
            $query->with(['source_account', 'expense_account', 'renter_account', 'payments' => function ($subQuery) {
                global $request;
                $date = Carbon::createFromFormat('Y-m', $request->get('month'));
                $subQuery->whereMonth('date', $date->month)
                    ->whereYear('date', $date->year);
            }]);
        }]);
        return response()->json(['accounts' => $accounts, 'disablePaidAlert' => app('preferences')->get('disablePaidAlert', 0)->data]);
    }

    public function getRentStatusYearly(Request $request)
    {
        global $request;
        $accounts = Account::has('apartments')->get()->load(['apartments' => function ($query) {
            $query->with(['source_account', 'expense_account', 'renter_account', 'payments' => function ($subQuery) {
                global $request;
                $subQuery->whereYear('date', $request->get('year'));
            }]);
        }]);
        return response()->json(['accounts' => $accounts, 'disablePaidAlert' => app('preferences')->get('disablePaidAlert', 0)->data]);
    }

    public function addApartmentPayment(Request $request)
    {
        $payment = ApartmentPayments::create([
            'apartment_id' => $request->get('apartment_id'),
            'transaction_id' => $request->get('transaction_id'),
            'account_id' => $request->get('account_id'),
            'date' => date('Y-m-d H:i:s', mktime(0, 0, 0, $request->get('month'), $request->get('date'), $request->get('year'))),
        ]);
        
        return response()->json(['payment' => $payment]);
    }

    public function deleteApartmentPayment(Request $request)
    {
        ApartmentPayments::destroy($request->get('id'));
        return response()->json(['success' => true]);
    }

    public function yearly_overview()
    {
        $title = 'Rent Control';
        return prefixView('real-estate-management.yearly-overview', compact('title'));
    }
}
