import {
  TagsViewState,
  VisitedViewsState,
  CachedViewsState
} from '@/types/store/tagsView';
import { defineStore } from 'pinia';

const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: []
  }),
  actions: {
    addVisitedView(view: VisitedViewsState) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      if (view.meta && view.meta.affix) {
        this.visitedViews.unshift({
          ...view,
          title: view.meta?.title || 'no-name'
        });
      } else {
        this.visitedViews.push({
          ...view,
          title: view.meta?.title || 'no-name'
        });
      }
    },
    addCachedView(view: VisitedViewsState) {
      if (this.cachedViews.includes(view.name as string)) return;
      if (view.meta?.noCache) return;
      this.cachedViews.push(view.name as string);
    },
    delVisitedView(view: VisitedViewsState): Promise<VisitedViewsState[]> {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: VisitedViewsState): Promise<CachedViewsState[]> {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string);
        if (index > -1) {
          this.cachedViews.splice(index, 1);
        }
        resolve([...this.cachedViews]);
      });
    },
    delOtherVisitedViews(
      view: VisitedViewsState
    ): Promise<VisitedViewsState[]> {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta?.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    delOtherCachedViews(view: VisitedViewsState): Promise<CachedViewsState[]> {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string);
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1);
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },

    updateVisitedView(view: VisitedViewsState) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    addView(view: VisitedViewsState) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    delView(view: VisitedViewsState): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.delVisitedView(view).then();
        this.delCachedView(view).then();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        });
      });
    },
    delOtherViews(view: VisitedViewsState): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.delOtherVisitedViews(view).then();
        this.delOtherCachedViews(view).then();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        });
      });
    },
    delLeftViews(view: VisitedViewsState): Promise<TagsViewState> {
      return new Promise((resolve) => {
        const currIndex = this.visitedViews.findIndex(
          (v) => v.path === view.path
        );
        if (currIndex === -1) {
          return;
        }
        this.visitedViews = this.visitedViews.filter((item, index) => {
          // affix:true 固定tag，例如“首页”
          if (index >= currIndex || (item.meta && item.meta.affix)) {
            return true;
          }

          const cacheIndex = this.cachedViews.indexOf(item.name as string);
          if (cacheIndex > -1) {
            this.cachedViews.splice(cacheIndex, 1);
          }
          return false;
        });
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        });
      });
    },
    delRightViews(view: VisitedViewsState): Promise<TagsViewState> {
      return new Promise((resolve) => {
        const currIndex = this.visitedViews.findIndex(
          (v) => v.path === view.path
        );
        if (currIndex === -1) {
          return;
        }
        this.visitedViews = this.visitedViews.filter((item, index) => {
          // affix:true 固定tag，例如“首页”
          if (index <= currIndex || (item.meta && item.meta.affix)) {
            return true;
          }

          const cacheIndex = this.cachedViews.indexOf(item.name as string);
          if (cacheIndex > -1) {
            this.cachedViews.splice(cacheIndex, 1);
          }
          return false;
        });
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        });
      });
    },
    delAllViews(): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((tag) => tag.meta?.affix);
        this.cachedViews = [];
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        });
      });
    },
    delAllVisitedViews(): Promise<VisitedViewsState[]> {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((tag) => tag.meta?.affix);
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews(): Promise<CachedViewsState[]> {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    }
  }
});

export default useTagsViewStore;
