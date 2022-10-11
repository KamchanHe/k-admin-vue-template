<template>
  <div class="app-wrapper" :class="dynamicClass">
    <div
      v-if="device === 'mobile' && sidebar.opened && navigationType !== 'top'"
      class="drawer-bg"
      @click="handleClickOutside"
    />

    <Sidebar class="sidebar-container" />

    <div :class="{ 'has-tags-view': needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavBar />
        <TagsView v-if="needTagsView" />
      </div>

      <AppMain />

      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import RightPanel from '@/components/RightPanel/index.vue';

import { useAppStore, useSettingsStore } from '@/store';
import { useWindowSize } from '@vueuse/core';
import Settings from './components/Settings/index.vue';
import AppMain from './components/AppMain/index.vue';
import NavBar from './components/NavBar/index.vue';
import TagsView from './components/TagsView/index.vue';
import Sidebar from './components/Sidebar/index.vue';

const { width } = useWindowSize();
const WIDTH = 992;

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const sidebar = computed(() => appStore.sidebar);
const device = computed(() => appStore.device);
const needTagsView = computed(() => settingsStore.tagsView);
const fixedHeader = computed(() => settingsStore.fixedHeader);
const showSettings = computed(() => settingsStore.showSettings);
const navigationType = computed(() => settingsStore.navigationType);

const dynamicClass = computed(() => ({
  'hide-sidebar': !sidebar.value.opened,
  'open-sidebar': sidebar.value.opened,
  'without-animation': sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile',
  'top-side': navigationType.value === 'top'
}));

watchEffect(() => {
  if (width.value < WIDTH) {
    appStore.toggleDevice('mobile');
    appStore.closeSideBar(true);
  } else {
    appStore.toggleDevice('desktop');
  }
});

function handleClickOutside() {
  appStore.closeSideBar(false);
}
</script>

<script lang="ts">
export default {
  name: 'CommonLayout'
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.open-sidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$v-sidebar-width});
  transition: width 0.28s;
}

.hide-sidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header,
.top-side .fixed-header {
  width: 100%;
}
</style>
