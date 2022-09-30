<template>
  <el-config-provider :locale="zhLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
</script>

<script lang="ts">
export default {
  name: 'App'
};
</script>
