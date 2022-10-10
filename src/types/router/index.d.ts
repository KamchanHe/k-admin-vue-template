import { defineComponent } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _RouteRecordBase, RouteMeta } from 'vue-router';
import type { RolesType } from '@/types/store/user';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-shadow
  interface _RouteRecordBase {
    parentPath?: string;
    meta?: {
      hidden?: boolean;
      alwaysShow?: boolean;
      roles?: RolesType;
      title?: string;
      icon?: string;
      affix?: boolean;
      noCache?: boolean;
      breadcrumb?: boolean;
      activeMenu?: string;
    };
  }
}

export type Component<T> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw {
  path: string;
  name?: string;
  meta?: RouteMeta;
  redirect?: string;
  component?: Component | string;
  children?: AppRouteRecordRaw[];
  fullPath?: string;
}

export default {};
