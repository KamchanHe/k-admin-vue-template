<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template v-if="isMenuItem">
      <SidebarLink
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'sub-menu-title-no-drop-down': !isNest }"
        >
          <k-icon
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :name="onlyOneChild.meta.icon"
          />
          <template #title>
            {{ onlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </SidebarLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <k-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        ></k-icon>
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import path from 'path-browserify';
import { isExternal } from '@/utils';
import type { RouteRecordRaw } from 'vue-router';
import SidebarLink from './Link.vue';

interface PropsState {
  item: RouteRecordRaw;
  isNest?: boolean;
  basePath?: string;
}
const props = withDefaults(defineProps<PropsState>(), {});

const onlyOneChild = ref();

function hasOneShowingChild(
  children: RouteRecordRaw[] | undefined,
  parent: RouteRecordRaw
) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item) => {
    if (item.meta && item.meta.hidden) {
      return false;
    }
    // Temp set(will be used if only has one showing child)
    onlyOneChild.value = item;
    return true;
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
}

const isMenuItem = computed(() => {
  const isOneShowingChild = hasOneShowingChild(props.item.children, props.item);
  const subLevelNoChild =
    !onlyOneChild.value.children || onlyOneChild.value.noShowingChildren;
  const noAlwaysShow = !props.item.meta || !props.item.meta.alwaysShow;
  return isOneShowingChild && subLevelNoChild && noAlwaysShow;
});

function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  const basePath = String(props.basePath);
  if (isExternal(basePath)) {
    return props.basePath;
  }
  return path.resolve(basePath, routePath);
}
</script>

<script lang="ts">
export default {
  name: 'SidebarItem'
};
</script>