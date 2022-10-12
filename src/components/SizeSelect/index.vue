<template>
  <el-dropdown class="size-select" trigger="click" @command="handleSetSize">
    <div class="size-select-icon">
      <k-icon name="local-icon-size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="(size || 'default') === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';

import { useAppStore } from '@/store';

const appStore = useAppStore();
const size = computed(() => appStore.size);

const sizeOptions = ref([
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' }
]);

function handleSetSize(size: string) {
  appStore.setSize(size);
  ElMessage.success('切换布局大小成功');
}
</script>

<script lang="ts">
export default {
  name: 'SizeSelect'
};
</script>

<style lang="scss" scoped>
.size-select-icon {
  line-height: 50px;
}
</style>
