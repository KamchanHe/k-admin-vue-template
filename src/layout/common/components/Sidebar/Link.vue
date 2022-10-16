<template>
  <a v-if="isExternal(to)" :href="to" rel="noopener" target="_blank">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { RouteRecordRedirectOption } from 'vue-router';

import { useAppStore } from '@/store';
import { isExternal } from '@/utils';

const appStore = useAppStore();

const sidebar = computed(() => appStore.sidebar);
const device = computed(() => appStore.device);

interface PropsState {
  to?: string;
  checkRedirect?: boolean;
  redirect?: RouteRecordRedirectOption | string;
}

const props = defineProps<PropsState>();
const router = useRouter();
const push = () => {
  const staticFlag =
    props.checkRedirect &&
    (!props.redirect || props.redirect === 'noRedirect') &&
    !props.to?.includes('dashboard');
  if (staticFlag) return;
  if (device.value === 'mobile' && sidebar.value.opened) {
    appStore.closeSideBar(false);
  }
  if (!props.to) return;
  router.push(props.to).catch((err) => {
    console.log(err);
  });
};
</script>

<script lang="ts">
export default {
  name: 'SidebarLink'
};
</script>
