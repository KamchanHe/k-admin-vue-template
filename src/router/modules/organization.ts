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
      },
      {
        path: '/personnel-management',
        name: 'PersonnelManagement',
        component: () =>
          import('@/views/organization/personnel-management/index.vue'),
        meta: {
          title: '人员管理'
        }
      },
      {
        path: '/permission-management',
        name: 'PermissionManagement',
        component: () =>
          import('@/views/organization/permission-management/index.vue'),
        meta: {
          title: '权限管理'
        }
      }
    ]
  }
];

export default {};
