import type { RouteRecordRaw } from 'vue-router';
import CommonLayout from '@/layout/common/index.vue';

export const exampleRoutes: RouteRecordRaw[] = [
  {
    path: '/example',
    component: CommonLayout,
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'TablePage',
        component: () => import('@/views/example/table/index.vue'),
        meta: { title: 'Table', icon: 'el-icon-grid' }
      }
    ]
  }
];

export default {};
