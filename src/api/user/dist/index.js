"use strict";
exports.__esModule = true;
exports.getUserInfo = exports.loginOut = exports.login = void 0;
var request_1 = require("@/utils/request");
exports.login = function (data) {
    return request_1["default"]({
        url: '/login',
        method: 'post',
        data: data
    });
};
exports.loginOut = function (data) {
    return request_1["default"]({
        url: '/loginOut',
        method: 'post',
        data: data
    });
};
exports.getUserInfo = function (data) {
    return request_1["default"]({
        url: '/getUserInfo',
        method: 'post',
        data: data
    });
};
