"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var cookie_1 = require("@/utils/cookie");
var store_1 = require("@/store");
var router_1 = require("@/router");
var qs = require('qs');
var element_plus_1 = require("element-plus");
var service = axios_1["default"].create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, config) {
            if (config['Content-Type'] === 'application/json') {
                return JSON.stringify(data);
            }
            if (!(data instanceof FormData)) {
                data = qs.stringify(data);
            }
            return data;
        }],
    withCredentials: true // 携带cookie
});
service.interceptors.request.use(function (config) {
    if (cookie_1.getToken()) {
        config.headers['X-Access-Token'] = cookie_1.getToken();
    }
    return config;
}, function (error) {
    Promise.reject(error);
});
service.interceptors.response.use(function (response) {
    var res = response.data;
    if (res.code === 200) {
        return res;
    }
    else {
        if (res.code === 405 || res.code === 406) {
            // token失效
            element_plus_1.ElMessageBox.confirm('登录信息过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                store_1["default"].dispatch('user/resetToken').then(function () {
                    router_1["default"].push({
                        path: '/login'
                    });
                    // location.reload()
                });
            });
        }
        else {
            element_plus_1.ElMessage({
                message: res.message,
                type: 'error',
                duration: 1 * 1000
            });
        }
        return Promise.reject();
    }
}, function (error) {
    return Promise.reject(error);
});
exports["default"] = service;
