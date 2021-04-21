"use strict";
exports.__esModule = true;
var vuex_1 = require("vuex");
// modules
var user_1 = require("./modules/user");
var setting_1 = require("./modules/setting");
var app_1 = require("./modules/app");
// getter
var getters_1 = require("./getters");
exports["default"] = vuex_1.createStore({
    modules: {
        user: user_1["default"],
        setting: setting_1["default"],
        app: app_1["default"]
    },
    getters: getters_1["default"],
    devtools: true
});
