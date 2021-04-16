"use strict";
exports.__esModule = true;
var user_1 = require("@/api/user");
var cookie_1 = require("@/utils/cookie");
var router_1 = require("@/router");
var filterAsyncRoutes_1 = require("@/router/filterAsyncRoutes");
var getDefaultState = function () {
    return {
        token: cookie_1.getToken(),
        name: '',
        menus: [],
        roles: []
    };
};
var state = getDefaultState();
var mutations = {
    RESET_STATE: function (state) {
        Object.assign(state, getDefaultState());
    },
    SET_TOKEN: function (state, token) {
        state.token = token;
    },
    SET_NAME: function (state, name) {
        state.name = name;
    },
    SET_MENUS: function (state, menus) {
        state.menus = menus;
    },
    SET_ROLES: function (state, roles) {
        state.roles = roles;
    }
};
var actions = {
    login: function (_a, query) {
        var commit = _a.commit;
        return new Promise(function (resolve, reject) {
            user_1.login(query).then(function (response) {
                var data = response.data;
                commit('SET_TOKEN', data.token);
                commit('SET_NAME', data.name);
                cookie_1.setToken(data.token);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    },
    logout: function (_a) {
        var commit = _a.commit, state = _a.state;
        return new Promise(function (resolve, reject) {
            user_1.loginOut({ token: state.token }).then(function (response) {
                cookie_1.removeToken(); // must remove  token  first
                // resetRouter()
                commit('RESET_STATE');
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    },
    resetToken: function (_a) {
        var commit = _a.commit;
        return new Promise(function (resolve) {
            cookie_1.removeToken(); // must remove  token  first
            commit('RESET_STATE');
            resolve('');
        });
    },
    getUserInfo: function (_a, query) {
        var commit = _a.commit, state = _a.state;
        return new Promise(function (resolve, reject) {
            user_1.getUserInfo({ token: state.token }).then(function (response) {
                var data = response.data;
                var accessedRoutes;
                if (data.roles.includes('admin')) {
                    accessedRoutes = router_1.asyncRoutes;
                }
                else {
                    accessedRoutes = filterAsyncRoutes_1.filterAsyncRoutes(router_1.asyncRoutes, data.roles);
                }
                commit('SET_MENUS', accessedRoutes);
                commit('SET_ROLES', data.roles);
                resolve(accessedRoutes);
            })["catch"](function (err) {
            });
        });
    }
};
exports["default"] = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
};
