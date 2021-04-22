
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
          title: 'Dashboard',
          icon: 'dashboard',
          affix: true  // 控制首页一直在tags-view中显示
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
        component: () => import(/* webpackChunkName: "data" */ '@/views/dataAnalys/index.vue'),
        name: 'Analysis',
        meta: {
          title: 'Analysis',
          isTag: true
        }
      },
      {
        path: 'visit',
        component: () => import(/* webpackChunkName: "data" */ '@/views/dataAnalys/Visit.vue'),
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
        component: () => import(/* webpackChunkName: "role" */ '@/views/user/index.vue'),
        name: 'UserManagement',
        meta: {
          title: 'User',
          isTag: true,
          roles: ['editor'], 
        }
      },
      {
        path: 'rolem',
        component: () => import(/* webpackChunkName: "role" */ '@/views/user/Role.vue'),
        name: 'RoleManagement',
        meta: {
          title: 'Role',
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
