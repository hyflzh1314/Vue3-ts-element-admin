"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.filterAsyncRoutes = void 0;
var hasPermission = function (roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(function (role) { return route.meta.roles.includes(role); });
    }
    else {
        return true;
    }
};
exports.filterAsyncRoutes = function (routes, roles) {
    var res = [];
    routes.forEach(function (route) {
        var r = __assign({}, route);
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = exports.filterAsyncRoutes(r.children, roles);
            }
            res.push(r);
        }
    });
    return res;
};
