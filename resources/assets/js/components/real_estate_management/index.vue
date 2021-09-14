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
          <a href="real-estate-management/create" class="btn btn-success"><i class="fa fa-plus fa-fw"></i>{{ $t('firefly.add_new_apartment') }}</a>
          <div style="margin: 20px 0px 20px 0px">
            <div v-for="account in accounts" v-bind:key="account.id">
              <div style="display:flex; align-items:center; margin-bottom: 8px">
                  <i class="fa fa-fw fa-bars object-handle" style="margin-right: 30px"></i>
                  <span style="color: #87a6eb;font-size: 18px;font-weight: 500;">{{account.name}}</span>
              </div>
              <div>
                <table class="table table-responsive table-hover apartment_list_table" id="sortable-table">
                  <thead>
                    <th class="text-left" style="width: 10%;">{{$t('firefly.apt')}}</th>
                    <th class="text-left" style="width: 20%;">{{$t('firefly.name')}}</th>
                    <th class="text-right" style="width: 10%;">{{$t('firefly.utilities')}}</th>
                    <th class="text-right" style="width: 10%;">{{$t('firefly.raw_rent')}}</th>
                    <th class="text-right" style="width: 10%;">{{$t('firefly.utilities_total')}}</th>
                    <th class="text-center" style="width: 10%;">{{$t('firefly.vat%')}}</th>
                    <th class="text-right" style="width: 10%;">{{$t('firefly.total_rent')}}</th>
                    <th class="text-right" style="width: 15%;">{{$t('firefly.deposit_account')}}</th>
                    <th class="text-right" style="width: 5%;"></th>
                  </thead>
                  <tr v-for="apartment in account.apartments" v-bind:key="apartment.id" class="sortable-object apartment_row">
                    <td class="text-left">{{apartment.id}}</td>
                    <td class="text-left">{{apartment.renter_account.name}}</td>
                    <td class="text-right">{{apartment.utilities}}</td>
                    <td class="text-right">{{apartment.rawRent}}</td>
                    <td class="text-right">{{apartment.utilitiesTotal}}</td>
                    <td class="text-center">{{apartment.vat}}</td>
                    <td class="text-right">{{apartment.totalRent}}</td>
                    <td class="text-right">{{apartment.source_account.name}}</td>
                    <td style="" class="hidden-xs">
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
          </div>
          <a href="real-estate-management/create" class="btn btn-success"><i class="fa fa-plus fa-fw"></i>{{ $t('firefly.add_new_apartment') }}</a>
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
