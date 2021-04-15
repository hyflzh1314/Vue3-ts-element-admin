"use strict";
exports.__esModule = true;
exports.removeToken = exports.getToken = exports.setToken = void 0;
var js_cookie_1 = require("js-cookie");
// User
var tokenKey = 'vue_typescript_admin_access_token';
exports.setToken = function (token) { return js_cookie_1["default"].set(tokenKey, token, { expires: 7 }); };
exports.getToken = function () { return js_cookie_1["default"].get(tokenKey); };
exports.removeToken = function () { return js_cookie_1["default"].remove(tokenKey); };
