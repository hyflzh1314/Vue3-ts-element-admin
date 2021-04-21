"use strict";
exports.__esModule = true;
var state = {
    sidebar: {
        opened: true
    }
};
var mutations = {
    TOGGLE_SIDEBAR: function (state) {
        state.sidebar.opened = !state.sidebar.opened;
    }
};
var actions = {
    toggleSideBar: function (_a) {
        var commit = _a.commit;
        commit('TOGGLE_SIDEBAR');
    }
};
exports["default"] = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
};
