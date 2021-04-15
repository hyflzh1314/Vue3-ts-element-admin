"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
var app = vue_1.createApp(App_vue_1["default"]);
// 引入 element plus
var element_plus_1 = require("element-plus");
require("element-plus/lib/theme-chalk/index.css");
// 全局样式
require("@/styles/index.scss");
// svg-icon
var req = require.context('@/icons/svg', false, /\.svg$/);
var requireAll = function (requireContext) { return requireContext.keys().map(requireContext); };
requireAll(req);
var index_vue_1 = require("@/components/SvgIcon/index.vue");
app.component('svg-icon', index_vue_1["default"]);
app.use(element_plus_1["default"]);
app.use(store_1["default"]).use(router_1["default"]).mount('#app');
