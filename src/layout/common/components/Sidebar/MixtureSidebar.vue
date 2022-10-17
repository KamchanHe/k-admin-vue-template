<template>
  <div ref="MixtureSidebarBoxMenuRef" class="mixture-sidebar-container">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        :unique-opened="false"
        :collapse-transition="false"
        :ellipsis="false"
        style="display: flex"
        @select="handleSelect"
      >
        <SidebarLink
          v-for="route in renderRoutes"
          :key="route.path"
          :to="route.path"
          :redirect="route.redirect"
          :checkRedirect="route.checkRedirect !== false"
        >
          <el-menu-item
            :index="
              route.parentPath === '/'
                ? '/dashboard'
                : route.parentPath || route.path
            "
          >
            <k-icon
              v-if="route.meta && route.meta.icon"
              :name="route.meta.icon"
            ></k-icon>
            <template #title>
              <span>{{ route.meta && route.meta.title }}</span>
            </template>
          </el-menu-item>
        </SidebarLink>
        <el-sub-menu
          v-if="limitIndex >= 0"
          index="more"
          popper-class="h-sidebar-popper"
        >
          <template #title>
            <k-icon name="el-icon-more"></k-icon>
            <span>更多</span>
          </template>
          <SidebarLink
            v-for="route in moreRoutes"
            :key="route.path"
            :to="route.path"
            :redirect="route.redirect"
            :checkRedirect="true"
          >
            <el-menu-item :index="route.path">
              <template #title>
                <k-icon
                  v-if="route.meta && route.meta.icon"
                  :name="route.meta.icon"
                />
                <span>{{ route.meta && route.meta.title }}</span>
              </template>
            </el-menu-item>
          </SidebarLink>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { usePermissionStore } from '@/store';
import { useWindowSize } from '@vueuse/core';
import { constantRoutes } from '@/router/modules/base';
import { isExternal } from '@/utils';
import SidebarLink from './Link.vue';

type MixtureRouteRecordRaw = RouteRecordRaw & {
  checkRedirect?: boolean;
};

const route = useRoute();

// 监听窗口变化
const { width: windowWidth } = useWindowSize();
watch(windowWidth, () => {
  setModuleNavigationView();
});

onMounted(() => {
  calculateModuleNavigationWidth();
});

// 激活的菜单
const activeMenu = computed(() => {
  const { path } = route;
  let activePath = path;
  if (path && path.lastIndexOf('/') > 0) {
    const tmpPath = path.substring(1, path.length);
    activePath = `/${tmpPath.substring(0, tmpPath.indexOf('/'))}`;
  }
  activeRoutes(activePath);
  return activePath;
});

const permissionStore = usePermissionStore();
// 权限路由
const permissionRoutes = computed(() => {
  const { routes } = permissionStore;
  return routes;
});

// 可渲染的路由
const routes = computed(() => {
  const result: MixtureRouteRecordRaw[] = [];
  permissionRoutes.value.forEach((route) => {
    if (!route.meta || route.meta.hidden !== true) {
      const children: MixtureRouteRecordRaw[] =
        route.children as MixtureRouteRecordRaw[];
      if (children?.length === 1 || route.path === '/') {
        children[0].checkRedirect = false;
        result.push(children[0]);
      } else {
        result.push(route);
      }
    }
  });
  return result;
});

// 更多分界线的下标
const limitIndex = ref(-1);
// 渲染的主要路由
const renderRoutes = computed(() => {
  return limitIndex.value >= 0
    ? routes.value.slice(0, limitIndex.value)
    : routes.value;
});
// 渲染的更多路由
const moreRoutes = computed(() => {
  return routes.value.slice(limitIndex.value);
});

// 左侧sidebar渲染的路由
const childrenRoutes = computed(() => {
  const result: MixtureRouteRecordRaw[] = [];
  permissionRoutes.value.forEach((route) => {
    const children: RouteRecordRaw[] = route.children as RouteRecordRaw[];
    children?.forEach((item, index) => {
      if (!children[index].parentPath) {
        if (route.path === '/') {
          children[index].path = `${children[index].path}`;
        } else if (!isExternal(children[index].path)) {
          children[index].path = `${route.path}/${children[index].path}`;
        }
        children[index].parentPath = route.path;
      }
      result.push(children[index]);
    });
  });
  return constantRoutes.concat(result);
});

// 宽度计算结果
const widthData = ref<number[]>([]);
// 导航栏Ref
const MixtureSidebarBoxMenuRef = ref<HTMLDivElement>();
// 计算导航栏的计时器
let calculateTimer: ReturnType<typeof setTimeout>;

/**
 * 计算保存导航栏的item宽度
 * @return {void}
 */
function calculateModuleNavigationWidth() {
  nextTick(() => {
    const elMenu = MixtureSidebarBoxMenuRef.value?.querySelector('.el-menu');
    const { children } = elMenu || {};
    if (!children?.length) {
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

/**
 * 设置显示的数量和更多的控制
 * @return {void}
 */
function setModuleNavigationView() {
  const widthArray = widthData.value;
  const parentWidth = MixtureSidebarBoxMenuRef.value?.clientWidth;
  let total = 0;
  let limit = -1;
  if (!parentWidth) {
    limitIndex.value = limit;
    return;
  }
  for (let index = 0; index < widthArray.length; index += 1) {
    const width = widthArray[index];
    total += width;
    if (total > parentWidth) {
      limit = index - 1 >= 0 ? index - 1 : 0;
      break;
    }
  }
  limitIndex.value = limit;
}

function handleSelect(key: string) {
  activeRoutes(key);
}

function activeRoutes(key: string) {
  const result: MixtureRouteRecordRaw[] = [];
  const childrenRouteArray = childrenRoutes.value;
  if (childrenRouteArray && childrenRouteArray.length > 0) {
    childrenRouteArray.forEach((item) => {
      const { parentPath } = item;
      if (key === parentPath) {
        result.push(item);
      } else if (parentPath === '/' && key === '/dashboard') {
        result.push(item);
      }
    });
  }
  permissionStore.setChildrenRoutes(result);
}
</script>

<script lang="ts">
export default {
  name: 'MixtureSidebar'
};
</script>
