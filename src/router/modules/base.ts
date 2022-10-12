import type { RouteRecordRaw } from 'vue-router';
import CommonLayout from '@/layout/common/index.vue';
import { nestedRoutes } from './nested';
import { exampleRoutes } from './example';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: CommonLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'el-icon-home-filled', affix: true }
      }
    ]
  },
  {
    path: '/error',
    component: CommonLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: {
      title: 'Error Page',
      icon: 'el-icon-home-filled'
    },
    children: [
      {
        path: '404Parent',
        name: '404Parent',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          title: '404Parent',
          icon: 'el-icon-link'
        },
        children: [
          {
            path: '404Children',
            name: '404',
            component: () => import('@/views/error-page/404.vue'),
            meta: {
              title: '404Children',
              icon: 'el-icon-link'
            }
          },
          {
            path: '401Children',
            name: '401Children',
            component: () => import('@/views/error-page/401.vue'),
            meta: {
              title: '401Children',
              icon: 'el-icon-link'
            }
          }
        ]
      },
      {
        path: '401Parent',
        name: '401Parent',
        component: () => import('@/views/error-page/401.vue'),
        meta: {
          title: '401Parent',
          icon: 'el-icon-link'
        }
      }
    ]
  }
];

export const asyncRoutes: RouteRecordRaw[] = [
  ...nestedRoutes,
  ...exampleRoutes
];

export default {};
