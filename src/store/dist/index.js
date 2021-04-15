"use strict";
exports.__esModule = true;
var vuex_1 = require("vuex");
var user_1 = require("./modules/user");
exports["default"] = vuex_1.createStore({
    modules: {
        user: user_1["default"]
    }
});
