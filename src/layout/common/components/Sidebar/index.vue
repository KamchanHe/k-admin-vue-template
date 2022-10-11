<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, usePermissionStore, useSettingsStore } from '@/store';
import { RouteRecordRaw } from 'vue-router';
import SidebarLogo from './Logo.vue';
import SidebarItem from './Item.vue';

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const route = useRoute();
const routes = computed<RouteRecordRaw[]>(() => {
  if (settingsStore.navigationType === 'mix') {
    return permissionStore.childrenRoutes;
  }
  return permissionStore.routes;
});
const showLogo = computed(() => settingsStore.sidebarLogo);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
</script>

<script lang="ts">
export default {
  name: 'Sidebar'
};
</script>
