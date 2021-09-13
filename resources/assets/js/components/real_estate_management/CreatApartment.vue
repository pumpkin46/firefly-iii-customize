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
          <button class="close" data-dismiss="alert" type="button" v-bind:aria-label="$t('firefly.close')"><span
              aria-hidden="true">&times;</span></button>
          <strong>{{ $t("firefly.flash_error") }}</strong> {{ error }}
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-header">
        <h3 class="box-title splitTitle">Create Apartment</h3>
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
        <custom-input
          v-model="renterName"
          label="Renter Name"
          placeholder="Renter Name"
          value=""
          :error="renterNameError"
          type="text"
        ></custom-input>
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
          :accountTypeFilters="[]"
          :defaultAccountTypeFilters="[]"
          :error="[]"
          transactionType=""
          inputName="name"
          :inputDescription="$t('firefly.destination_account')"
          v-on:clear:value="clearDestination()"
          v-on:select:account="selectedDestinationAccount($event)"
        ></custom-autocomplete>
      </div>
    </div>
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ $t("firefly.submission") }}
        </h3>
      </div>
      <div class="box-body">
        <div class="checkbox">
          <label>
            <input
              v-model="createAnother"
              name="create_another"
              type="checkbox"
            />
            {{ $t("firefly.create_another") }}
          </label>
        </div>
        <div class="checkbox">
          <label v-bind:class="{ 'text-muted': this.createAnother === false }">
            <input
              v-model="resetFormAfter"
              :disabled="this.createAnother === false"
              name="reset_form"
              type="checkbox"
            />
            {{ $t("firefly.reset_after") }}
          </label>
        </div>
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
import axios from 'axios';
export default {
  name: "CreatApartment",
  components: {},
  created() {},
  methods: {
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
    submit(e) {
      const uri =
        "./api/v1/real-estate-management?_token=" +
        document.head.querySelector('meta[name="csrf-token"]').content;
      const data = {
        apartmentNo: this.apartmentNo,
        renterName: this.renterName,
        utilities: this.utilities,
        rawRent: this.rawRent,
        utilitiesTotal: this.utilitiesTotal,
        vat: this.vat,
        totalRent: this.totalRent,
        sourceAccount: this.sourceAccount,
        createAnother: this.createAnother,
        resetFormAfter: this.resetFormAfter,
      };
      let error = false;
      if(this.apartmentNo === '') {
        this.apartmentNoError = 'Apartment No is invalid';
        error = true;
      } else {
        this.apartmentNoError = '';
      }
      if(this.renterName === '') {
        this.renterNameError = 'Renter Name is invalid';
        error = true;
      } else {
        this.renterNameError = '';
      }
      if(this.utilities === '') {
        this.utilitiesError = 'Utilities is invalid';
        error = true;
      } else {
        this.utilitiesError = '';
      }
      if(this.rawRent === '') {
        this.rawRentError = 'Raw Rent is invalid';
        error = true;
      } else {
        this.rawRentError = '';
      }
      if(this.utilitiesTotal === '') {
        this.utilitiesTotalError = 'Utilities Total is invalid';
        error = true;
      } else {
        this.utilitiesTotalError = '';
      }
      if(this.vat === '') {
        this.vatError = 'Vat is invalid';
        error = true;
      } else {
        this.vatError = '';
      }
      if(this.totalRent === '') {
        this.totalRentError = 'Total Rent is invalid';
        error = true;
      } else {
        this.totalRentError = '';
      }
      if(this.sourceAccount === null || !this.sourceAccount.name) {
        this.sourceAccountError = 'Source Account is invalid';
        error = true;
      } else {
        this.sourceAccountError = '';
      }
      if(error) {
        this.error = 'There was something wrong with your submission. Please check out the errors.';
        return;
      }

      let button = $("#submitButton");
      button.prop("disabled", true);

      axios
        .post(uri, data)
        .then(() => {
          button.removeAttr("disabled");
          if (!this.createAnother) {
            location.href = "/real-estate-management/index";
          } else if (this.resetFormAfter) {
            this.apartmentNo = "";
            this.renterName = "";
            this.utilities = 0;
            this.rawRent = "";
            this.utilitiesTotal = "";
            this.vat = "";
            this.totalRent = "";
            this.sourceAccount = null;
            this.createAnother = false;
            this.resetFormAfter = true;
          }
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
      error: '',
      apartmentNo: "",
      apartmentNoError: '',
      renterName: "",
      renterNameError: '',
      utilities: 0,
      utilitiesError: '',
      rawRent: "",
      rawRentError: '',
      utilitiesTotal: "",
      utilitiesTotalError: '',
      vat: "",
      vatError: '',
      totalRent: "",
      totalRentError: '',
      sourceAccount: null,
      sourceAccountError: '',
      createAnother: '',
      resetFormAfter: true,
    };
  },
};
</script>
