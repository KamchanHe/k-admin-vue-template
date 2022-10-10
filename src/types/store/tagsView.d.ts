import type { RouteLocationNormalized } from 'vue-router';
import type { RolesType } from '@/types/store/user';

/**
 * 标签状态类型声明
 */
export interface VisitedViewsState extends Partial<RouteLocationNormalized> {
  name?: string;
  title?: string;
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

export type CachedViewsState = string;

export interface TagsViewState {
  visitedViews: VisitedViewsState[];
  cachedViews: CachedViewsState[];
}
