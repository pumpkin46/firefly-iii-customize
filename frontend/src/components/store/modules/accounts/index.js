/*
 * index.js
 * Copyright (c) 2021 james@firefly-iii.org
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

// initial state
const state = () => (
    {
        orderMode: false,
        activeFilter: 1
    }
)


// getters
const getters = {
    orderMode: state => {
        return state.orderMode;
    },
    activeFilter: state => {
        return state.activeFilter;
    }
}

// actions
const actions = {}

// mutations
const mutations = {
    setOrderMode(state, payload) {
        state.orderMode = payload;
    },
    setActiveFilter(state, payload) {
        state.activeFilter = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
