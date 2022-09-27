import type { _RouteRecordBase } from 'vue-router';
import type { RolesType } from '@/types/store/user';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-shadow
  interface _RouteRecordBase {
    parentPath?: string;
    meta?: {
      roles?: RolesType;
      title?: string;
      icon?: string;
      affix?: boolean;
      hidden?: boolean;
      noCache?: boolean;
    };
  }
}

export default {
  _RouteRecordBase
};
