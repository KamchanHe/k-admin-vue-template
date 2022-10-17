<template>
  <div class="container-box page-box">
    <div class="left">
      <RoleLeft></RoleLeft>
    </div>
    <div class="right">
      <RoleRight></RoleRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoleLeft from './components/RoleLeft/index.vue';
import RoleRight from './components/RoleRight/index.vue';
import { controlDataKey } from './utils';

const controlData = reactive({
  activeId: null
});

provide(controlDataKey, controlData);
</script>

<script lang="ts">
export default {
  name: 'PermissionManagement'
};
</script>

<style lang="scss" scoped>
.page-box {
  flex-direction: row;
  height: 100%;

  .left {
    flex-basis: 200px;
    overflow: hidden;
    border-right: 1px solid #ebeef5;
  }

  .right {
    flex: 1;
    overflow: hidden;
  }
}
</style>
