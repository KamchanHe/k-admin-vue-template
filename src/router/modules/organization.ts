import type { RouteRecordRaw } from 'vue-router';
import CommonLayout from '@/layout/common/index.vue';

export const organizationRoutes: RouteRecordRaw[] = [
  {
    path: '/organization',
    component: CommonLayout,
    redirect: 'noRedirect',
    name: 'Organization',
    meta: {
      title: '组织架构',
      icon: 'fa-solid fa-user-group'
    },
    children: [
      {
        path: '/department-management',
        name: 'DepartmentManagement',
        component: () =>
          import('@/views/organization/department-management/index.vue'),
        meta: {
          title: '部门管理'
        }
      }
    ]
  }
];

export default {};
