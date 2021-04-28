
import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from 'vue-router'
import Layout from '@/layout/index.vue'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@views/login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true
    }
  }
]
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true 
        }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/analysis',
    name: 'data',
    meta: {
      title: '数据概览',
      icon: 'data',
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import(/* webpackChunkName: "data" */ '@/views/dataAnalys/index.vue'),
        name: 'Analysis',
        meta: {
          title: '数据分析',
          isTag: true
        }
      },
      {
        path: 'details',
        component: () => import(/* webpackChunkName: "data" */ '@/views/dataAnalys/ListDetails.vue'),
        name: 'ListDetails',
        meta: {
          hidden: true,
          title: '数据详情',
          isTag: true,
          isSetTagTitle: true
        }
      },
      {
        path: 'visit',
        component: () => import(/* webpackChunkName: "data" */ '@/views/dataAnalys/Visit.vue'),
        name: 'Visit',
        meta: {
          title: '访客数据',
          isTag: true
        }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/user',
    name: 'role',
    meta: {
      title: '用户管理',
      icon: 'role',
      roles: ['editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "role" */ '@/views/user/index.vue'),
        name: 'UserManagement',
        meta: {
          title: '用户',
          isTag: true,
          roles: ['editor'],
        }
      },
      {
        path: 'rolem',
        component: () => import(/* webpackChunkName: "role" */ '@/views/user/Role.vue'),
        name: 'RoleManagement',
        meta: {
          title: '权限',
          roles: ['admin', 'editor']
        }
      }
    ]
  }
]
const routerOptions = {
  history: createWebHashHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes
} as RouterOptions
const router = createRouter(routerOptions)

export function resetRouter() {
  const newRouter = createRouter(routerOptions);
  (router as any).matcher = (newRouter as any).matcher
}
export default router
