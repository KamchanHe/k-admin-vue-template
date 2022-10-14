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
  }
];

export const asyncRoutes: RouteRecordRaw[] = [
  ...nestedRoutes,
  ...exampleRoutes,
  { path: '/:path(.*)', redirect: '/404', meta: { hidden: true } }
];

export default {};
