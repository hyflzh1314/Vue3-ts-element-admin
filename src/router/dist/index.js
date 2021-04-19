"use strict";
exports.__esModule = true;
exports.asyncRoutes = void 0;
var vue_router_1 = require("vue-router");
var index_vue_1 = require("@/layout/index.vue");
var constantRoutes = [
    {
        path: '/',
        component: index_vue_1["default"],
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'); }); },
                name: 'Dashboard',
                meta: {
                    title: 'dashboard',
                    icon: 'dashboard',
                    affix: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "login" */ '@views/login/login.vue'); }); }
    }
];
exports.asyncRoutes = [
    {
        path: '/data',
        component: index_vue_1["default"],
        redirect: '/data/analysis',
        name: 'data',
        meta: {
            title: 'Data Analysis',
            icon: 'lock',
            roles: ['admin', 'editor'],
            alwaysShow: true
        },
        children: [
            {
                path: 'analysis',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "analysis" */ '@/views/dataAnalys/index.vue'); }); },
                name: 'Analysis',
                meta: {
                    title: 'analysis'
                }
            },
            {
                path: 'visit',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "visit" */ '@/views/dataAnalys/visit.vue'); }); },
                name: 'Visit',
                meta: {
                    title: 'visit'
                }
            }
        ]
    },
    {
        path: '/role',
        component: index_vue_1["default"],
        redirect: '/role/user',
        name: 'role',
        meta: {
            title: 'User Management',
            icon: 'lock',
            roles: ['editor'],
            alwaysShow: true
        },
        children: [
            {
                path: 'user',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "userManagement" */ '@/views/user/index.vue'); }); },
                name: 'UserManagement',
                meta: {
                    title: 'User',
                    roles: ['editor']
                }
            },
            {
                path: 'role',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "roleManagement" */ '@/views/user/role.vue'); }); },
                name: 'RoleManagement',
                meta: {
                    title: 'Role',
                    roles: ['admin']
                }
            }
        ]
    }
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHashHistory(),
    scrollBehavior: function (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        else {
            return { x: 0, y: 0 };
        }
    },
    routes: constantRoutes
});
exports["default"] = router;
