<template>
  <el-config-provider :locale="zhLocale">
    <div>123</div>
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhLocale from 'element-plus/es/locale/lang/zh-cn';
</script>

<script lang="ts">
export default {
  name: 'App'
};
</script>
