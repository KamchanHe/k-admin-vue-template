<template>
  <div class="top-sidebar-container">
    <div
      v-if="showLogo"
      :class="['top-sidebar-container-logo', isCollapse ? 'shrink-width' : '']"
      @transitionend="topSideBarBoxLogoTransitionend"
    >
      <SidebarLogo :collapse="isCollapse" />
    </div>
    <slot />
    <div class="top-sidebar-container-menu" ref="TopSidebarBoxMenuRef">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        mode="horizontal"
        :unique-opened="false"
        :collapse-transition="false"
        :ellipsis="false"
      >
        <SidebarItem
          v-for="route in renderRoutes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :is-collapse="isCollapse"
          popper-class="h-sidebar-popper"
        />
        <el-sub-menu
          v-if="limitIndex >= 0"
          index="more"
          popper-class="h-sidebar-popper"
        >
          <template #title>
            <k-icon v-if="isCollapse" name="el-icon-more"></k-icon>
            <span>更多</span>
          </template>
          <SidebarItem
            v-for="route in moreRoutes"
            :item="route"
            :key="route.path"
            :base-path="route.path"
            :is-collapse="isCollapse"
          />
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { useAppStore, useSettingsStore, usePermissionStore } from '@/store';
import { useWindowSize } from '@vueuse/core';
import SidebarLogo from './Logo.vue';
import SidebarItem from './Item.vue';

const { width: windowWidth } = useWindowSize();
// 计算menu显示的数量
watch(windowWidth, () => {
  setModuleNavigationView();
});

onMounted(() => {
  calculateModuleNavigationWidth();
});

const route = useRoute();
const appStore = useAppStore();
const permissionStore = usePermissionStore();
const settingsStore = useSettingsStore();
const permissionRoutes = computed(() => permissionStore.routes);
const showLogo = computed(() => settingsStore.sidebarLogo);
const isCollapse = computed(() => !appStore.sidebar.opened);

const limitIndex = ref(-1);

function topSideBarBoxLogoTransitionend() {
  limitIndex.value = -1;
  nextTick(() => {
    calculateModuleNavigationWidth();
  });
}

// 过滤展示的routes
const routes = computed(() => {
  const result: RouteRecordRaw[] = [];
  permissionRoutes.value.forEach((route) => {
    if (!route.meta || route.meta.hidden !== true) {
      result.push(route);
    }
  });
  return result;
});

// 当前激活菜单
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});

const moreRoutes = computed(() => {
  return routes.value.slice(limitIndex.value);
});

// menu-item widths
const widthData = ref<number[]>([]);
const TopSidebarBoxMenuRef = ref();

let calculateTimer: ReturnType<typeof setTimeout>;
function calculateModuleNavigationWidth() {
  nextTick(() => {
    const elMenu = TopSidebarBoxMenuRef.value.querySelector('.el-menu');
    const { children } = elMenu;
    if (children.length !== routes.value.length) {
      clearTimeout(calculateTimer);
      calculateTimer = setTimeout(() => {
        calculateModuleNavigationWidth();
      }, 500);
      return;
    }
    const arr = [];
    for (let index = 0; index < children.length; index += 1) {
      const element = children[index];
      const width = element.clientWidth;
      arr.push(width);
    }
    widthData.value = arr;
    setModuleNavigationView();
  });
}

function setModuleNavigationView() {
  const parentWidth = TopSidebarBoxMenuRef.value.clientWidth;
  let total = 0;
  let limit = -1;
  for (let index = 0; index < widthData.value.length; index += 1) {
    const width = widthData.value[index];
    total += width;
    if (total > parentWidth) {
      limit = index - 1 >= 0 ? index - 1 : 0;
      break;
    }
  }
  limitIndex.value = limit;
}

const renderRoutes = computed(() => {
  const index = limitIndex.value;
  return index >= 0 ? routes.value.slice(0, index) : routes.value;
});
</script>

<script lang="ts">
export default {
  name: 'TopSidebar'
};
</script>

<style lang="scss" scoped>
.top-sidebar-container {
  display: flex;
  align-items: center;

  &-logo {
    width: $v-sidebar-width;
    transition: width 0.28s;

    &.shrink-width {
      width: 54px;
    }
  }

  &-menu {
    flex: 1;
    overflow: hidden;
  }
}
</style>
