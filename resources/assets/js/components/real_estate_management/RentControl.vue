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
            <div style="width: 200px; max-width: 100%">
                <custom-date :error="[]" v-model="date" type="month" ></custom-date>
            </div>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-sm-6">
                    <div style="margin: 20px 0px 20px 0px">
                        <div v-for="account in accounts" v-bind:key="account.id">
                            <div style="display:flex; align-items:center; margin-bottom: 8px">
                                <i class="fa fa-fw fa-bars object-handle" style="margin-right: 30px"></i>
                                <span style="color: #87a6eb;font-size: 18px;font-weight: 500;">{{account.name}}</span>
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
                                    <td class="text-left">{{apartment.renter_account.name}}</td>
                                    <td class="text-left">{{apartment.totalRent}}</td>
                                    <td class="text-left">{{apartment.source_account.name}}</td>
                                    <td class="text-center">
                                        <div v-if="isPaidMonth(apartment)" style="color:green;cursor:pointer">Ok</div>
                                        <div v-else style="color:red;cursor:pointer" @click="addTransaction(apartment)">X</div>
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
      });
    },
    addTransaction(apartment) {
        if(confirm('Do you really want to do paid rent?')){
          let uri = './api/v1/transactions?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
          let data = {
              transactions:
              [
                  {
                      amount: apartment.totalRent,
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
          axios.post(uri, data).then(() => {
              uri = './api/v1/real-estate-management/apartment-payment?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
              let submitData = {
                  apartment_id: apartment.id,
                  account_id: apartment.renter_account.id,
                  date: new Date().getDate(),
                  month: parseInt(this.date.split('-')[1]),
                  year: parseInt(this.date.split('-')[0]),
              };
              axios.post(uri, submitData).then(() => {
                  location.reload();
              })
          })
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
    };
  },
};
</script>
