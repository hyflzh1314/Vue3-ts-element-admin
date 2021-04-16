
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const constantRoutes: Array<RouteRecordRaw> = [
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
    component: () => import(/* webpackChunkName: "login" */ '@views/login/login.vue')
  }
]
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/data',
    component: Layout,
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
      icon: 'lock',
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
        path: 'role',
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
  // scrollBehavior: (to, from, savedPosition) => {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: constantRoutes
})
export default router
