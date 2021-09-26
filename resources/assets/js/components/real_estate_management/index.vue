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
  <form accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
    <input name="_token" type="hidden" value="xxx">
    <div>
      <div class="box">
        <div class="box-body">
          
          <div style="width: 400px; max-width: 100%; display: flex; grid-gap: 12px">
            <a href="real-estate-management/create" class="btn btn-success"><i class="fa fa-plus fa-fw"></i>{{ $t('firefly.add_new_apartment') }}</a>
            <select name="account" id="account" class="form-control" @change="selectAccount" v-model="selectedAccountId">
              <option value="" label="All"></option>
              <option v-for="account in accounts" v-bind:key="account.id" :value="account.id">{{account.name}}</option>
            </select>
          </div>
          <div style="margin: 20px 0px 20px 0px" v-if="isFilter">
              <div style="display:flex; align-items:center; margin-bottom: 8px">
                  <span style="color: #87a6eb;font-size: 18px;font-weight: 500;cursor:pointer;padding-left: 10px;" @click="selectAccountByAsset(selectedAccount.id)">{{selectedAccount.name}}</span>
              </div>
              <div class="apartment_list_table_container">
                <table class="table table-responsive table-hover apartment_list_table" id="sortable-table">
                  <thead>
                    <th class="text-left" style="width: 11%;">{{$t('firefly.apt')}}</th>
                    <th class="text-left" style="width: 12%;">{{$t('firefly.name')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.utilities')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.raw_rent')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.utilities_total')}}</th>
                    <th class="text-center" style="width: 11%;">{{$t('firefly.vat%')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.total_rent')}}</th>
                    <th class="text-right" style="width: 12%;">{{$t('firefly.deposit_account')}}</th>
                    <th class="text-right" style="width: 10%;"></th>
                  </thead>
                  <tr v-for="(apartment, index) in selectedAccount.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                    <td class="text-left">{{index + 1}}</td>
                    <td class="text-left"><a :href="'/accounts/show/' + apartment.renter_account.id">{{apartment.renter_account.name}}</a></td>
                    <td class="text-right">{{apartment.utilities}}</td>
                    <td class="text-right">{{apartment.rawRent}}</td>
                    <td class="text-right">{{apartment.utilitiesTotal}}</td>
                    <td class="text-center">{{apartment.vat}}</td>
                    <td class="text-right">{{apartment.totalRent}}</td>
                    <td class="text-right"><a :href="'/accounts/show/' + apartment.source_account.id">{{apartment.source_account.name}}</a></td>
                    <td style="text-right">
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {{ $t('firefly.actions') }} <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" role="menu">
                                <li>
                                  <a v-bind:href="'real-estate-management/edit/' + apartment.id">
                                    <i class="fa fa-fw fa-pencil"></i> 
                                    {{ $t('firefly.edit') }}
                                  </a>
                                </li>
                            </ul>
                        </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          <div style="margin: 20px 0px 20px 0px" v-else>
            <div v-for="account in accounts" v-bind:key="account.id">
              <div style="display:flex; align-items:center; margin-bottom: 8px">
                  <span style="color: #87a6eb;font-size: 18px;font-weight: 500;cursor:pointer; padding-left: 10px;" @click="selectAccountByAsset(account.id)">{{account.name}}</span>
              </div>
              <div class="apartment_list_table_container">
                <table class="table table-responsive table-hover apartment_list_table" id="sortable-table">
                  <thead>
                    <th class="text-left" style="width: 11%;">{{$t('firefly.apt')}}</th>
                    <th class="text-left" style="width: 12%;">{{$t('firefly.name')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.utilities')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.raw_rent')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.utilities_total')}}</th>
                    <th class="text-center" style="width: 11%;">{{$t('firefly.vat%')}}</th>
                    <th class="text-right" style="width: 11%;">{{$t('firefly.total_rent')}}</th>
                    <th class="text-right" style="width: 12%;">{{$t('firefly.deposit_account')}}</th>
                    <th class="text-right" style="width: 10%;"></th>
                  </thead>
                  <tr v-for="(apartment, index) in account.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                    <td class="text-left">{{index + 1}}</td>
                    <td class="text-left"><a :href="'/accounts/show/' + apartment.renter_account.id">{{apartment.renter_account.name}}</a></td>
                    <td class="text-right">{{apartment.utilities}}</td>
                    <td class="text-right">{{apartment.rawRent}}</td>
                    <td class="text-right">{{apartment.utilitiesTotal}}</td>
                    <td class="text-center">{{apartment.vat}}</td>
                    <td class="text-right">{{apartment.totalRent}}</td>
                    <td class="text-right"><a :href="'/accounts/show/' + apartment.source_account.id">{{apartment.source_account.name}}</a></td>
                    <td style="text-right">
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {{ $t('firefly.actions') }} <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" role="menu">
                                <li>
                                  <a v-bind:href="'real-estate-management/edit/' + apartment.id">
                                    <i class="fa fa-fw fa-pencil"></i> 
                                    {{ $t('firefly.edit') }}
                                  </a>
                                </li>
                                <li>
                                  <a @click="generateWarning(apartment)">
                                    <i class="fa fa-fw fa-file"></i> 
                                    {{ $t('firefly.create_warning') }}
                                  </a>
                                </li>
                            </ul>
                        </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <a href="real-estate-management/create" class="btn btn-success"><i class="fa fa-plus fa-fw"></i>{{ $t('firefly.add_new_apartment') }}</a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default {
  name: "RealEstateManagement",
  components: {},
  mounted() {
    this.getApartments();
  },
  watch: {
    accounts: function (value) {
      if(window.expenseId !== 0) {
        let account = this.accounts.find((e) => e.id == window.expenseId);
        if(account) {
          this.selectedAccountId = account.id;
          this.selectedAccount = account;
          this.isFilter = true;
        }
      }
    },
  },
  methods: {
    getApartments() {
      axios.get('/api/v1/real-estate-management').then(({data}) => {
        this.accounts = data.accounts;
      })
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
    generateWarning(apartment) {
      let accounts = this.accounts;
      loadFile("v1/simple2.docx", function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        let text_input = window.prompt("Please enter date");
        let expense_account = accounts.find((e) => e.id == apartment.expenseAccount);
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        doc.setData({
          "expense.headline": expense_account.headline?expense_account.headline:'',
          "expense.iban": expense_account.iban?expense_account.iban:'',
          "expense.bic": expense_account.bic?expense_account.bic:'',
          "expense.zipcode": expense_account.zip_code?expense_account.zip_code:'',
          "expense.city": expense_account.city?expense_account.city:'',
          "revenue.name": apartment.renter_account.name,
          "revenue.street": expense_account.street?expense_account.street:'',
          "doc.signature": expense_account.signature,
          "doc.text_input": text_input,
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function(error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // Output the document using Data-URI
        saveAs(out, "output.docx");
      });
    }
  },

  /*
   * The component's data.
   */
  data() {
    return {
      accounts: [],
      selectedAccount: null,
      isFilter: false,
      selectedAccountId: '',
    };
  },
}
</script>
