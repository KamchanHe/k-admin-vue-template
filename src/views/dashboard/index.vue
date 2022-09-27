<template>
  <div class="dashboard-container">
    <div class="dashboard-text">nickname: {{ nickname }}</div>
    <div class="dashboard-text">
      roles: <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
    <div class="dashboard-input">
      <el-input v-model="inputValue"></el-input>
    </div>
    <el-button type="primary"> Submit </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const nickname = computed(() => userStore.nickname);
const roles = computed(() => userStore.roles);
const inputValue = ref('');
</script>

<script lang="ts">
export default {
  name: 'Dashboard'
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }

  &-input {
    margin: 10px 0;
  }
}
</style>
