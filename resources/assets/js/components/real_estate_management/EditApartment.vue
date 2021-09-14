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
    <div v-if="error !== ''" class="row">
      <div class="col-lg-12">
        <div class="alert alert-danger alert-dismissible" role="alert">
          <button
            class="close"
            data-dismiss="alert"
            type="button"
            v-bind:aria-label="$t('firefly.close')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{{ $t("firefly.flash_error") }}</strong> {{ error }}
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-header">
        <h3 class="box-title splitTitle">Edit Apartment</h3>
      </div>
      <div class="box-body">
        <custom-input
          v-model="apartmentNo"
          label="Apartment No"
          placeholder="Apartment No"
          value=""
          type="text"
          :error="apartmentNoError"
        ></custom-input>
        <custom-autocomplete
          accountName=""
          :accountTypeFilters="['Revenue account']"
          :defaultAccountTypeFilters="[]"
          :error="renterAccountError"
          transactionType=""
          :inputDescription="$t('firefly.renter_name')"
          v-on:clear:value="clearRevenue()"
          v-on:select:account="selectedRevenueAccount($event)"
          :defaultValue="renterAccount ?  renterAccount.name : ''"
        ></custom-autocomplete>
        <custom-input
          v-model="utilities"
          label="Utilities %"
          placeholder="Utilities %"
          value=""
          :error="utilitiesError"
          type="text"
        ></custom-input>
        <custom-input
          v-model="rawRent"
          label="Raw Rent"
          placeholder="Raw Rent"
          value=""
          :error="rawRentError"
          type="text"
        ></custom-input>
        <custom-input
          v-model="utilitiesTotal"
          label="Utilities Total"
          placeholder="Utilities Total"
          value=""
          :error="utilitiesTotalError"
          type="text"
        ></custom-input>
        <custom-input
          v-model="vat"
          label="Vat %"
          placeholder="Vat %"
          value=""
          :error="vatError"
          type="text"
        ></custom-input>
        <custom-input
          v-model="totalRent"
          label="Total Rent"
          placeholder="Total Rent"
          value=""
          :error="totalRentError"
          type="text"
        ></custom-input>
        <custom-autocomplete
          accountName=""
          :accountTypeFilters="['Asset account']"
          :defaultAccountTypeFilters="[]"
          :error="sourceAccountError"
          transactionType=""
          :inputDescription="$t('firefly.diposit_account')"
          v-on:clear:value="clearDestination()"
          v-on:select:account="selectedDestinationAccount($event)"
          :defaultValue="sourceAccount ?  sourceAccount.name : ''"
        ></custom-autocomplete>
        <custom-autocomplete
          accountName=""
          :accountTypeFilters="['Expense account']"
          :defaultAccountTypeFilters="[]"
          :error="expenseAccountError"
          transactionType=""
          :inputDescription="$t('firefly.expense_account')"
          v-on:clear:value="clearExpense()"
          v-on:select:account="selectedExpenseAccount($event)"
          :defaultValue="expenseAccount ?  expenseAccount.name : ''"
        ></custom-autocomplete>
      </div>
    </div>
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ $t("firefly.submission") }}
        </h3>
      </div>
      <div class="box-footer">
        <div class="btn-group">
          <button
            id="submitButton"
            class="btn btn-success"
            type="button"
            @click="submit"
          >
            {{ $t("firefly.submit") }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "EditApartment",
  components: {},
  created() {
    this.id = location.href.substring(location.href.lastIndexOf('/') + 1).split('?')[0];
    if(this.id) {
      this.getApartmentData(this.id);
    }
  },
  methods: {
    getApartmentData(id) {
      axios.get(`./api/v1/real-estate-management/apartment?id=${id}`).then(({data}) => {
        this.id =  data.apartment?.id;
        this.apartmentNo =  data.apartment?.apartmentNo;
        this.utilities =  data.apartment?.utilities;
        this.rawRent =  data.apartment?.rawRent;
        this.utilitiesTotal =  data.apartment?.utilitiesTotal;
        this.vat =  data.apartment?.vat;
        this.totalRent =  data.apartment?.totalRent;
        this.sourceAccount =  data.apartment?.source_account;
        this.renterAccount =  data.apartment?.renter_account;
        this.expenseAccount =  data.apartment?.expense_account;
      })
    },
    clearDestination() {
      this.sourceAccount = null;
    },
    selectedDestinationAccount(model) {
      if (typeof model === "string") {
        this.sourceAccount = { name: model };
      } else {
        this.sourceAccount = model;
      }
    },
    clearRevenue() {
      this.renterAccount = null;
    },
    selectedRevenueAccount(model) {
      if (typeof model === "string") {
        this.renterAccount = { name: model };
      } else {
        this.renterAccount = model;
      }
    },
    clearExpense() {
      this.expenseAccount = null;
    },
    selectedExpenseAccount(model) {
      if (typeof model === "string") {
        this.expenseAccount = { name: model };
      } else {
        this.expenseAccount = model;
      }
    },
    submit(e) {
      const uri =
        "./api/v1/real-estate-management?_token=" +
        document.head.querySelector('meta[name="csrf-token"]').content;
      const data = {
        id: this.id,
        apartmentNo: this.apartmentNo,
        utilities: this.utilities,
        rawRent: this.rawRent,
        utilitiesTotal: this.utilitiesTotal,
        vat: this.vat,
        totalRent: this.totalRent,
        sourceAccount: this.sourceAccount,
        renterAccount: this.renterAccount,
        expenseAccount: this.expenseAccount,
        createAnother: this.createAnother,
        resetFormAfter: this.resetFormAfter,
      };
      let error = false;
      if (this.apartmentNo === "") {
        this.apartmentNoError = "Apartment No is invalid";
        error = true;
      } else {
        this.apartmentNoError = "";
      }
      if (this.utilities === "") {
        this.utilitiesError = "Utilities is invalid";
        error = true;
      } else {
        this.utilitiesError = "";
      }
      if (this.rawRent === "") {
        this.rawRentError = "Raw Rent is invalid";
        error = true;
      } else {
        this.rawRentError = "";
      }
      if (this.utilitiesTotal === "") {
        this.utilitiesTotalError = "Utilities Total is invalid";
        error = true;
      } else {
        this.utilitiesTotalError = "";
      }
      if (this.vat === "") {
        this.vatError = "Vat is invalid";
        error = true;
      } else {
        this.vatError = "";
      }
      if (this.totalRent === "") {
        this.totalRentError = "Total Rent is invalid";
        error = true;
      } else {
        this.totalRentError = "";
      }
      
      if (this.sourceAccount === null) {
        this.sourceAccountError = "Source Account is invalid";
        error = true;
      } else {
        this.sourceAccountError = "";
      }
      if (this.renterAccount === null) {
        this.renterAccountError = "Source Account is invalid";
        error = true;
      } else {
        this.renterAccountError = "";
      }
      if (this.expenseAccount === null) {
        this.expenseAccountError = "Source Account is invalid";
        error = true;
      } else {
        this.expenseAccountError = "";
      }
      if (error) {
        this.error =
          "There was something wrong with your submission. Please check out the errors.";
        return;
      }

      let button = $("#submitButton");
      button.prop("disabled", true);

      axios
        .put(uri, data)
        .then(() => {
          button.removeAttr("disabled");
          location.href = "/real-estate-management/index";
        })
        .catch((error) => {
          console.error(error);
          this.parseErrors(error.response.data);
          button.removeAttr("disabled");
        });

      if (e) {
        e.preventDefault();
      }
    },
  },

  /*
   * The component's data.
   */
  data() {
    return {
      id: '',
      error: "",
      apartmentNo: "",
      apartmentNoError: "",
      utilities: 0,
      utilitiesError: "",
      rawRent: "",
      rawRentError: "",
      utilitiesTotal: "",
      utilitiesTotalError: "",
      vat: "",
      vatError: "",
      totalRent: "",
      totalRentError: "",
      sourceAccount: null,
      sourceAccountError: "",
      renterAccount: null,
      renterAccountError: "",
      expenseAccount: null,
      expenseAccountError: "",
      createAnother: "",
      resetFormAfter: true,
    };
  },
};
</script>
