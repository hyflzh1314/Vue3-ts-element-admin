"use strict";
exports.__esModule = true;
exports.resetRouter = exports.asyncRoutes = void 0;
var vue_router_1 = require("vue-router");
var index_vue_1 = require("@/layout/index.vue");
var constantRoutes = [
    {
        path: '/login',
        component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "login" */ '@views/login/Login.vue'); }); },
        name: 'Login',
        meta: {
            hidden: true
        }
    }
];
exports.asyncRoutes = [
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
                    title: 'Dashboard',
                    icon: 'dashboard',
                    affix: true // 控制首页一直在tags-view中显示
                }
            }
        ]
    },
    {
        path: '/data',
        component: index_vue_1["default"],
        redirect: '/data/analysis',
        name: 'data',
        meta: {
            title: 'Data Analysis',
            icon: 'data',
            roles: ['admin', 'editor'],
            alwaysShow: true
        },
        children: [
            {
                path: 'analysis',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "data" */ '@/views/dataAnalys/index.vue'); }); },
                name: 'Analysis',
                meta: {
                    title: 'Analysis',
                    isTag: true
                }
            },
            {
                path: 'visit',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "data" */ '@/views/dataAnalys/Visit.vue'); }); },
                name: 'Visit',
                meta: {
                    title: 'Visit',
                    isTag: true
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
            icon: 'role',
            roles: ['editor'],
            alwaysShow: true
        },
        children: [
            {
                path: 'user',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "role" */ '@/views/user/index.vue'); }); },
                name: 'UserManagement',
                meta: {
                    title: 'User',
                    isTag: true,
                    roles: ['editor']
                }
            },
            {
                path: 'rolem',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "role" */ '@/views/user/Role.vue'); }); },
                name: 'RoleManagement',
                meta: {
                    title: 'Role',
                    roles: ['admin', 'editor']
                }
            }
        ]
    }
];
var routerOptions = {
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
};
var router = vue_router_1.createRouter(routerOptions);
function resetRouter() {
    var newRouter = vue_router_1.createRouter(routerOptions);
    router.matcher = newRouter.matcher;
}
exports.resetRouter = resetRouter;
exports["default"] = router;
