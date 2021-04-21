"use strict";
var _this = this;
exports.__esModule = true;
var setting_1 = require("@/setting");
var showTagsView = setting_1["default"].showTagsView, fixedHeader = setting_1["default"].fixedHeader, showSidebarLogo = setting_1["default"].showSidebarLogo;
var state = {
    showTagsView: showTagsView,
    showSidebarLogo: showSidebarLogo,
    fixedHeader: fixedHeader
};
var mutations = {
    CHANGE_SETTING: function (state, payload) {
        var key = payload.key, value = payload.value;
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            _this[key] = value;
        }
    }
};
var actions = {
    ChangeSetting: function (_a, payload) {
        var commit = _a.commit;
        commit('CHANGE_SETTING', payload);
    }
};
exports["default"] = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
};
