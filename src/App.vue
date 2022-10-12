<template>
  <el-config-provider :locale="zhLocale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const size = computed(() => appStore.size);
</script>

<script lang="ts">
export default {
  name: 'App'
};
</script>
