
import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from 'vue-router'
import Layout from '@/layout/index.vue'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    roles?: string[]
  }
}
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@views/login/login.vue'),
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
          title: 'Dashboard',
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
      title: 'Data Analysis',
      icon: 'data',
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import(/* webpackChunkName: "analysis" */ '@/views/dataAnalys/index.vue'),
        name: 'Analysis',
        meta: {
          title: 'analysis',
        }
      },
      {
        path: 'visit',
        component: () => import(/* webpackChunkName: "visit" */ '@/views/dataAnalys/visit.vue'),
        name: 'Visit',
        meta: {
          title: 'visit',
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
      title: 'User Management',
      icon: 'role',
      roles: ['editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "userManagement" */ '@/views/user/index.vue'),
        name: 'UserManagement',
        meta: {
          title: 'User',
          roles: ['editor'], 
        }
      },
      {
        path: 'rolem',
        component: () => import(/* webpackChunkName: "roleManagement" */ '@/views/user/role.vue'),
        name: 'RoleManagement',
        meta: {
          title: 'Role',
          roles: ['admin']
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes
} as RouterOptions)
export default router
