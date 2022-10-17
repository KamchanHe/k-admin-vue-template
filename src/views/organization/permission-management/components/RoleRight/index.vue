<template>
  <div class="page-box">
    <div class="tip" v-if="!activeId">
      <span>当前无角色可编辑，请先新建角色</span>
    </div>
    <el-tabs style="height: 100%" v-model="menuType">
      <el-tab-pane
        v-for="item in menus"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      >
        <component :is="item.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 账号列表组件
import AccountList from '../AccountList/index.vue';
// 功能权限组件
import PermissionList from '../PermissionList/index.vue';
import { controlDataKey } from '../../utils';

const controlData = inject(controlDataKey);

const activeId = computed(() => {
  const { activeId: targetActiveId } = controlData || {};
  return targetActiveId;
});

const menuType = ref('permission');

const menus = [
  {
    value: 'account',
    label: '账号列表',
    component: AccountList
  },
  {
    value: 'permission',
    label: '功能权限',
    component: PermissionList
  }
];
</script>

<script lang="ts">
export default {
  name: 'RoleRight'
};
</script>

<style lang="scss" scoped>
.page-box {
  height: 100%;

  :deep(.el-tabs__nav) {
    padding: 10.5px 0;
  }

  :deep(.el-tabs__nav-wrap) {
    padding-left: 30px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }

  :deep(.el-tabs__content) {
    height: calc(100% - 76px);

    .el-tab-pane {
      height: 100%;
    }
  }

  .tip {
    height: 40px;
    padding: 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 40px;
  }
}
</style>
