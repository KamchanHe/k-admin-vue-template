import type { RouteRecordRaw } from 'vue-router';

export interface PermissionStoreType {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
  childrenRoutes: RouteRecordRaw[];
}
