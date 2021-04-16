"use strict";
exports.__esModule = true;
var getters = {
    token: function (state) { return state.user.token; },
    name: function (state) { return state.user.name; },
    menus: function (state) { return state.user.menus; }
};
exports["default"] = getters;
