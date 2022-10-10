import type { RouteRecordRaw } from 'vue-router';
import CommonLayout from '@/layout/common/index.vue';

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
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      },
      {
        name: '404',
        path: '/test-404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        name: '401',
        path: '/test-401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
];

export const asyncRoutes: RouteRecordRaw[] = [];
