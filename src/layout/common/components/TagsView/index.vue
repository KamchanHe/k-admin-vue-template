<template>
  <div class="tags-view-container">
    <scroll-pane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title || tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <k-icon name="local-icon-close" />
        </span>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="tags-view-menu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <k-icon name="local-icon-refresh" />
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <k-icon name="local-icon-close" />
        关闭
      </li>
      <li @click="closeOtherTags">
        <k-icon name="local-icon-close-other" />
        关闭其它
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <k-icon name="local-icon-close-left" />
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <k-icon name="local-icon-close-right" />
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <k-icon name="local-icon-close-all" />
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue';
import path from 'path-browserify';
import { useTagsViewStore, usePermissionStore } from '@/store';
import type { RouteRecordRaw } from 'vue-router';
import type { VisitedViewsState } from '@/types/store/tagsView';
import ScrollPane from './ScrollPane.vue';

const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();

const visitedViews = computed<VisitedViewsState[]>(
  () => tagsViewStore.visitedViews
);
const routes = computed(() => permissionStore.routes);

const affixTags = ref<VisitedViewsState[]>([]);
const visible = ref(false);
const selectedTag = ref<VisitedViewsState>({});
const scrollPaneRef = ref();
const left = ref(0);
const top = ref(0);

watch(
  route,
  () => {
    addTags();
    moveToCurrentTag();
  },
  {
    immediate: true
  }
);

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});

function filterAffixTags(targetRoutes: RouteRecordRaw[], basePath = '/') {
  let tags: VisitedViewsState[] = [];

  targetRoutes.forEach((routeItem) => {
    if (routeItem.meta && routeItem.meta.affix) {
      const tagPath = path.resolve(basePath, routeItem.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: routeItem.name as string,
        meta: { ...routeItem.meta }
      });
    }

    if (routeItem.children) {
      const childTags = filterAffixTags(routeItem.children, routeItem.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });
  return tags;
}

function initTags() {
  const res = filterAffixTags(routes.value);
  affixTags.value = res;
  for (const tag of res) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
}

function addTags() {
  if (route.name) {
    tagsViewStore.addView(route as VisitedViewsState);
  }
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const r of visitedViews.value) {
      if (r.path === route.path) {
        scrollPaneRef.value.moveToTarget(r);
        if (r.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route as VisitedViewsState);
        }
      }
    }
  });
}

function isActive(tag: VisitedViewsState) {
  return tag.path === route.path;
}

function isAffix(tag: VisitedViewsState) {
  return tag.meta && tag.meta.affix;
}

function isFirstView() {
  try {
    return (
      selectedTag.value.fullPath === visitedViews.value[1].fullPath ||
      selectedTag.value.fullPath === '/index'
    );
  } catch (err) {
    return false;
  }
}

function isLastView() {
  try {
    return (
      selectedTag.value.fullPath ===
      visitedViews.value[visitedViews.value.length - 1].fullPath
    );
  } catch (err) {
    return false;
  }
}

function refreshSelectedTag(view: VisitedViewsState) {
  tagsViewStore.delCachedView(view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace({ path: `/redirect${fullPath}` }).catch((err) => {
      console.warn(err);
    });
  });
}

function toLastView(
  targetVisitedViews: VisitedViewsState[] = [],
  view?: VisitedViewsState
) {
  const latestView = targetVisitedViews.slice(-1)[0];
  if (latestView && latestView.fullPath) {
    router.push(latestView.fullPath);
  } else if (view?.name === 'Dashboard') {
    router.replace({ path: `/redirect${view.fullPath}` });
  } else {
    router.push('/');
  }
}

function closeSelectedTag(view: VisitedViewsState) {
  tagsViewStore.delView(view).then((res) => {
    if (isActive(view)) {
      toLastView(res.visitedViews, view);
    }
  });
}

function closeLeftTags() {
  tagsViewStore.delLeftViews(selectedTag.value).then((res) => {
    if (!res.visitedViews.find((item) => item.fullPath === route.fullPath)) {
      toLastView(res.visitedViews);
    }
  });
}
function closeRightTags() {
  tagsViewStore.delRightViews(selectedTag.value).then((res) => {
    if (!res.visitedViews.find((item) => item.fullPath === route.fullPath)) {
      toLastView(res.visitedViews);
    }
  });
}

function closeOtherTags() {
  router.push(selectedTag.value);
  tagsViewStore.delOtherViews(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
}

function closeAllTags(view: VisitedViewsState) {
  tagsViewStore.delAllViews().then((res) => {
    toLastView(res.visitedViews, view);
  });
}

function openMenu(tag: VisitedViewsState, e: MouseEvent) {
  const menuMinWidth = 105;
  const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy?.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const l = e.clientX - offsetLeft + 15; // 15: margin right

  if (l > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = l;
  }

  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
}

function closeMenu() {
  visible.value = false;
}

function handleScroll() {
  closeMenu();
}

onMounted(() => {
  initTags();
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

  .tags-view-wrapper {
    .tags-view-item {
      position: relative;
      display: inline-block;
      height: 26px;
      padding: 0 8px;
      margin-top: 4px;
      margin-left: 5px;
      font-size: 12px;
      line-height: 26px;
      color: #495060;
      cursor: pointer;
      background: #fff;
      border: 1px solid #d8dce5;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &:hover {
        color: var(--el-color-primary);
      }

      &.active {
        color: var(--el-color-primary-light-9);
        background-color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        &::before {
          position: relative;
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 5px;
          content: '';
          background: #fff;
          border-radius: 50%;
        }
      }

      .icon-close {
        height: 12px;
        overflow: hidden;
        text-align: center;
        border-radius: 50%;

        &:hover {
          color: #fff;
          background-color: #ccc;
        }
      }
    }
  }

  .tags-view-menu {
    position: absolute;
    z-index: 3000;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    list-style-type: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

    li {
      display: flex;
      align-items: center;
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;

      .icon {
        margin-right: 5px;
      }

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
