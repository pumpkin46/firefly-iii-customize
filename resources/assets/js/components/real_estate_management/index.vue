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
          <a href="real-estate-management/create" class="btn btn-success"><i class="fa fa-plus fa-fw"></i> Add New Apartment</a>
          <div v-for="account in accounts" v-bind:key="account.id" style="margin: 20px 0px 20px 0px">
            <div style="display:flex; align-items:center; margin-bottom: 8px">
                <i class="fa fa-fw fa-bars object-handle" style="margin-right: 30px"></i>
                <span style="color: #87a6eb;font-size: 18px;font-weight: 500;">{{account.name}}</span>
            </div>
            <div>
              <table class="table table-responsive table-hover apartment_list_table" id="sortable-table" style="margin-left:35px">
                <thead>
                  <th class="text-left">Apt</th>
                  <th class="text-left">Name</th>
                  <th class="text-right">Utilities %</th>
                  <th class="text-right">Raw Rent</th>
                  <th class="text-right">Utilities Total</th>
                  <th class="text-center">Vat %</th>
                  <th class="text-right">Total Rent</th>
                </thead>
                <tr v-for="apartment in account.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                  <td class="text-left">{{apartment.id}}</td>
                  <td class="text-left">{{apartment.renterName}}</td>
                  <td class="text-right">{{apartment.utilities}}</td>
                  <td class="text-right">{{apartment.rawRent}}</td>
                  <td class="text-right">{{apartment.utilitiesTotal}}</td>
                  <td class="text-center">{{apartment.vat}}</td>
                  <td class="text-right">{{apartment.totalRent}}</td>
                </tr>
              </table>
            </div>
          </div>
          <a href="real-estate-management/create" class="btn btn-success"><i class="fa fa-plus fa-fw"></i> Add New Apartment</a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: "RealEstateManagement",
  components: {},
  mounted() {
    this.getApartments();
  },
  methods: {
    getApartments() {
      axios.get('/api/v1/real-estate-management').then(({data}) => {
        this.accounts = data.accounts;
      })
    },
  },

  /*
   * The component's data.
   */
  data() {
    return {
      accounts: [],
    };
  },
}
</script>
