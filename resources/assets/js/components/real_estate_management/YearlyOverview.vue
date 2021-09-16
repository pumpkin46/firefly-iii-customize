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
  <div>
    <input name="_token" type="hidden" value="xxx" />
    <div class="box">
      <div class="box-header">
          <div style="width: 400px; max-width: 100%; display: flex; grid-gap: 12px">
              <input type="number" class="form-control" min="1900" max="2999" v-model="year" v-on:keyup.enter="getApartments">
              <select name="account" id="account" class="form-control" @change="selectAccount">
                <option v-for="account in accounts" v-bind:key="account.id" :value="account.id">{{account.name}}</option>
              </select>
          </div>
      </div>
      <div class="box-body">
          <div style="margin: 20px 0px 20px 0px" class="rent_control_list_table_container">
              <div v-if="selectedAccount">
                  <table class="table table-responsive table-hover rent_control_list_table" id="sortable-table">
                  <thead>
                      <th class="text-left" style="width: 10%;">{{$t('firefly.apt')}}</th>
                      <th class="text-left" style="width: 10%;">{{$t('firefly.name')}}</th>
                      <th class="text-left" style="width: 10%;">{{$t('firefly.total_rent')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.jan')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.feb')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.mar')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.apr')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.may')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.jun')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.jul')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.aug')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.sep')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.oct')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.nov')}}</th>
                      <th class="text-center" style="width: 4%;">{{$t('firefly.dec')}}</th>
                  </thead>
                  <tr v-for="apartment in selectedAccount.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                      <td class="text-left">{{apartment.id}}</td>
                      <td class="text-left">{{apartment.renter_account.name}}</td>
                      <td class="text-left">{{apartment.totalRent}}</td>
                      <td class="text-center" v-for="n in 12" v-bind:key="n">
                        <div v-if="isPaidMonth(apartment, n)" style="color:green;cursor:pointer" @click="deleteTransaction(apartment, n)">Ok</div>
                        <div v-else style="color:red;cursor:pointer" @click="addTransaction(apartment, n)">X</div>
                      </td>
                  </tr>
                  </table>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RentControl",
  components: {},
  created() {
    let tempDate = new Date();
    this.year = tempDate.getFullYear()
    this.getApartments();
  },
  watch: {
    year: function() {
      this.getApartments();
    }
  },
  methods: {
    getApartments() {
      axios.get(`/api/v1/real-estate-management/rent-status-yearly?year=${this.year}`).then(({ data }) => {
        this.accounts = data.accounts;
        this.disablePaidAlert = data.disablePaidAlert;
        if(this.accounts.length) {
          this.selectedAccount = this.accounts[0];
        }
      });
    },
    addTransaction(apartment, month) {
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
                      date: `${this.year}-${month}-01`,
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
                  date: 1,
                  month: month,
                  year: this.year,
              };
              axios.post(uri, submitData).then(({ data }) => {
                this.selectedAccount.apartments.forEach((element) => {
                  element.payments.push(data['payment']);
                });
              })
          })
        }
    },
    deleteTransaction(apartment, month) {
      let pay = true;
      if(!this.disablePaidAlert){
        pay = confirm('Do you really want to delete this payments?');
      }
      if(pay){
        let transactionPyments = apartment.payments.filter((e) => new Date(e.date).getMonth() === month - 1);
        if(transactionPyments.length) {
          axios.post(`transactions/destroy-custom/${transactionPyments[0].transaction_id}`, {_token: document.head.querySelector('meta[name="csrf-token"]').content}).then(() => {
            let uri = './api/v1/real-estate-management/delete-apartment-payment?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
            axios.post(uri, {id: transactionPyments[0].id}).then(() => {
              this.selectedAccount.apartments.forEach(apartment => {
                apartment.payments = apartment.payments.filter((e) => e.id !== transactionPyments[0].id);
              });
            })
          })
        }
      }
    },
    isPaidMonth(apartment, month) {
      if(apartment.payments.find((e) => new Date(e.date).getMonth() === month - 1)){
        return true;
      } else {
        return false;
      }
    },
    selectAccount(event) {
      let account = this.accounts.find((e) => e.id == event.target.value);
      this.selectedAccount = account;
    }
  },

  /*
   * The component's data.
   */
  data() {
    return {
      year: new Date(),
      accounts: [],
      selectedAccount: null,
      disablePaidAlert: true,
    };
  },
};
</script>
