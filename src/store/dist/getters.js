"use strict";
exports.__esModule = true;
var getters = {
    sidebar: function (state) { return state.app.sidebar; },
    token: function (state) { return state.user.token; },
    name: function (state) { return state.user.name; },
    menus: function (state) { return state.user.menus; },
    roles: function (state) { return state.user.roles; }
};
exports["default"] = getters;
