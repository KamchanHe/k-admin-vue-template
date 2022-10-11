<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d'
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store';
import { changeTheme } from '@/utils/theme';

const settingsStore = useSettingsStore();
const defaultTheme = computed(() => settingsStore.theme);
const theme = ref('');
theme.value = defaultTheme.value;

watch(defaultTheme, (color: string) => {
  theme.value = color;
});

watch(theme, (color: string) => {
  changeTheme(color);
});
</script>

<script lang="ts">
export default {
  name: 'ThemePicker'
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  width: 26px !important;
  height: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
