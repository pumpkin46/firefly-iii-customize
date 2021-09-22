<!--
  - CreateTransaction.vue
  - Copyright (c) 2019 james@firefly-iii.org
  -
  - This file is part of Firefly III (https://github.com/firefly-iii).
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <form
    accept-charset="UTF-8"
    class="form-horizontal"
    enctype="multipart/form-data"
  >
    <input name="_token" type="hidden" value="xxx" />
    <div>
      <div class="box">
        <div class="box-header">
            <div style="width: 400px; max-width: 100%;display:flex;align-items:center; gap:4px">
                <custom-date :error="[]" v-model="date" type="month" ></custom-date>
                
                <select name="account" id="account" class="form-control" @change="selectAccount" v-model="selectedAccountId">
                  <option value="" label="All"></option>
                  <option v-for="account in accounts" v-bind:key="account.id" :value="account.id">{{account.name}}</option>
                </select>
            </div>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-sm-6">

                    <div style="margin: 20px 0px 20px 0px" v-if="isFilter">
                      <div style="display:flex; align-items:center; margin-bottom: 8px">
                          <span style="color: #87a6eb;font-size: 18px;font-weight: 500; padding-left: 10px;">{{selectedAccount.name}}</span>
                      </div>
                      <div>
                          <table class="table table-responsive table-hover apartment_list_table" id="sortable-table">
                          <thead>
                              <th class="text-left" style="width: 15%;">{{$t('firefly.apt')}}</th>
                              <th class="text-left" style="width: 25%;">{{$t('firefly.name')}}</th>
                              <th class="text-left" style="width: 20%;">{{$t('firefly.total_rent')}}</th>
                              <th class="text-left" style="width: 25%;">{{$t('firefly.deposit_account')}}</th>
                              <th class="text-center" style="width: 15%;">{{$t('firefly.paid_rent')}}</th>
                          </thead>
                          <tr v-for="apartment in selectedAccount.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                              <td class="text-left">{{apartment.id}}</td>
                              <td class="text-left"><a :href="'/accounts/show/' + apartment.renter_account.id">{{apartment.renter_account.name}}</a></td>
                              <td class="text-left">{{apartment.totalRent}}</td>
                              <td class="text-left"><a :href="'/accounts/show/' + apartment.source_account.id">{{apartment.source_account.name}}</a></td>
                              <td class="text-center">
                                  <div v-if="isPaidMonth(apartment)" style="color:green;cursor:pointer" @click="deleteTransaction(apartment)">Ok</div>
                                  <div v-else style="color:red;cursor:pointer" @click="addTransaction(apartment, account.id)">X</div>
                              </td>
                          </tr>
                          </table>
                      </div>
                    </div>
                    <div style="margin: 20px 0px 20px 0px" v-else>
                        <div v-for="account in accounts" v-bind:key="account.id">
                            <div style="display:flex; align-items:center; margin-bottom: 8px">
                                <span style="color: #87a6eb;font-size: 18px;font-weight: 500;cursor:pointer;padding-left: 10px;" @click="selectAccountByAsset(account.id)">{{account.name}}</span>
                            </div>
                            <div>
                                <table class="table table-responsive table-hover apartment_list_table" id="sortable-table">
                                <thead>
                                    <th class="text-left" style="width: 15%;">{{$t('firefly.apt')}}</th>
                                    <th class="text-left" style="width: 25%;">{{$t('firefly.name')}}</th>
                                    <th class="text-left" style="width: 20%;">{{$t('firefly.total_rent')}}</th>
                                    <th class="text-left" style="width: 25%;">{{$t('firefly.deposit_account')}}</th>
                                    <th class="text-center" style="width: 15%;">{{$t('firefly.paid_rent')}}</th>
                                </thead>
                                <tr v-for="apartment in account.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                                    <td class="text-left">{{apartment.id}}</td>
                                    <td class="text-left"><a :href="'/accounts/show/' + apartment.renter_account.id">{{apartment.renter_account.name}}</a></td>
                                    <td class="text-left">{{apartment.totalRent}}</td>
                                    <td class="text-left"><a :href="'/accounts/show/' + apartment.source_account.id">{{apartment.source_account.name}}</a></td>
                                    <td class="text-center">
                                        <div v-if="isPaidMonth(apartment)" style="color:green;cursor:pointer" @click="deleteTransaction(apartment)">Ok</div>
                                        <div v-else style="color:red;cursor:pointer" @click="addTransaction(apartment, account.id)">X</div>
                                    </td>
                                </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "RentControl",
  components: {},
  created() {
    let tempDate = new Date();
    let month = (tempDate.getMonth() + 1) + '';
    month = month.padStart(2,'0')
    this.date = tempDate.getFullYear() + '-' + month;
    this.getApartments();
  },
  watch: {
      date: function () {
          this.getApartments();
      }
  },
  methods: {
    getApartments() {
      axios.get(`/api/v1/real-estate-management/rent-status?month=${this.date}`).then(({ data }) => {
        this.accounts = data.accounts;
        this.disablePaidAlert = data.disablePaidAlert;
      });
    },
    selectAccount() {
      if(event.target.value === '') {
        this.selectedAccount = null;
        this.selectedAccountId = '';
        this.isFilter = false;
      } else {
        let account = this.accounts.find((e) => e.id == event.target.value);
        this.selectedAccountId = account.id;
        this.selectedAccount = account;
        this.isFilter = true;
      }
    },
    selectAccountByAsset(id) {
      let account = this.accounts.find((e) => e.id == id);
      this.selectedAccountId = account.id;
      this.selectedAccount = account;
      this.isFilter = true;
    },
    addTransaction(apartment, account_id) {
        let pay = true;
        if(!this.disablePaidAlert){
          pay = confirm('Do you really want to do paid rent?');
        }
        if(pay){
          let uri = './api/v1/transactions?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
          let data = {
              transactions:
              [
                  {
                      amount: apartment.totalRent,
                      vat_percent: 0,
                      vat: 0,
                      netto: apartment.totalRent,
                      book_date: "",
                      category_name: "",
                      currency_id: undefined,
                      date: this.date+"-01",
                      description: apartment.renter_account.name,
                      destination_id: apartment.source_account.id,
                      destination_name: apartment.source_account.name,
                      due_date: "",
                      interest_date: "",
                      internal_reference: "",
                      invoice_date: "",
                      notes: "",
                      payment_date: "",
                      process_date: "",
                      source_id: apartment.renter_account.id,
                      source_name: apartment.renter_account.name,
                      type: "deposit",
                  }
              ]
          };
          axios.post(uri, data).then(({data}) => {
              uri = './api/v1/real-estate-management/apartment-payment?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
              let submitData = {
                  apartment_id: apartment.id,
                  account_id: apartment.renter_account.id,
                  transaction_id: parseInt(data.data.id),
                  date: new Date().getDate(),
                  month: parseInt(this.date.split('-')[1]),
                  year: parseInt(this.date.split('-')[0]),
              };
              axios.post(uri, submitData).then(({data}) => {
                let updatedAccount = this.accounts.find((e) => e.id === account_id);
                updatedAccount.apartments.forEach((element) => {
                  element.payments.push(data['payment']);
                });
                this.accounts = this.accounts.map((e) => e.id === updatedAccount.id ? updatedAccount : e);
              })
          })
        }
    },
    deleteTransaction(apartment) {
      let pay = true;
      if(!this.disablePaidAlert){
        pay = confirm('Do you really want to delete this payments?');
      }
      if(pay){
        let transactionPyments = apartment.payments.filter((e) => new Date(e.date).getMonth() === parseInt(this.date.split('-')[1]) - 1);
        if(transactionPyments.length) {
          axios.post(`transactions/destroy-custom/${transactionPyments[0].transaction_id}`, {_token: document.head.querySelector('meta[name="csrf-token"]').content}).then(() => {
            let uri = './api/v1/real-estate-management/delete-apartment-payment?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
            axios.post(uri, {id: transactionPyments[0].id}).then(() => {
              this.accounts.forEach((account) => {
                account.apartments.forEach(apartment => {
                  apartment.payments = apartment.payments.filter((e) => e.id !== transactionPyments[0].id);
                });
              });
            })
          })
        }
      }
    },
    isPaidMonth(apartment) {
      if(apartment.payments.find((e) => e.apartment_id === apartment.id)) {
        return true;
      } else {
        return false;
      }
    }
  },

  /*
   * The component's data.
   */
  data() {
    return {
      date: new Date(),
      accounts: [],
      disablePaidAlert: true,
      selectedAccount: null,
      isFilter: false,
      selectedAccountId: '',
    };
  },
};
</script>
