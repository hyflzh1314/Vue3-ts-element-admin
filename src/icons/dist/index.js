"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("@/App.vue");
var app = vue_1.createApp(App_vue_1["default"]);
var index_vue_1 = require("@/components/SvgIcon/index.vue");
app.component('svg-icon', index_vue_1["default"]);
var req = require.context('./svg', false, /\.svg$/);
var requireAll = function (requireContext) { return requireContext.keys().map(requireContext); };
requireAll(req);
