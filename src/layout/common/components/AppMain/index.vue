<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useTagsViewStore } from '@/store';

const tagsViewStore = useTagsViewStore();

const cachedViews = computed(() => tagsViewStore.cachedViews);
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;

  /* 50 = navbar = 50  */
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
}

.fixed-header + .app-main {
  min-height: 100vh;
  padding-top: 50px;
  overflow-y: auto;
}

.has-tags-view {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 84px);
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    min-height: 100vh;
    padding-top: 84px;
    overflow-y: auto;
  }
}
</style>
