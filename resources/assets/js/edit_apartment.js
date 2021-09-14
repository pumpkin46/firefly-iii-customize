/*
 * create_transactions.js
 * Copyright (c) 2019 james@firefly-iii.org
 *
 * This file is part of Firefly III (https://github.com/firefly-iii).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import CustomInput from "./components/real_estate_management/CustomInput";
import EditApartment from './components/real_estate_management/EditApartment';
import CustomAutocomplete from "./components/real_estate_management/CustomAutocomplete";

/**
 * First we will load Axios via bootstrap.js
 * jquery and bootstrap-sass preloaded in app.js
 * vue, uiv and vuei18n are in app_vue.js
 */

require('./bootstrap');
    
Vue.component('edit-apartment', EditApartment);
Vue.component('custom-input', CustomInput);
Vue.component('custom-autocomplete', CustomAutocomplete);

const i18n = require('./i18n');

let props = {};
new Vue({
    i18n,
    el: "#edit_apartment",
    render: (createElement) => {
        return createElement(EditApartment, {props: props});
    },
});
