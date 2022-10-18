<template>
  <div class="dashboard-container">
    <div class="dashboard-text">username: {{ username }}</div>
    <div class="dashboard-text">
      roles: <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
    <div class="dashboard-input">
      <el-input v-model="inputValue"></el-input>
    </div>
    <el-button @click="selectDepartmentSingle" type="primary">
      选择部门(单选)
    </el-button>
    <el-button @click="selectDepartmentMultiple" type="primary">
      选择部门(多选)
    </el-button>
    <el-button @click="selectPersonnelSingle" type="primary">
      选择人员(单选)
    </el-button>
    <el-button @click="selectPersonnelMultiple" type="primary">
      选择人员(多选)
    </el-button>
    <KSelectDepartmentSingle
      selectType="single"
      ref="KSelectDepartmentSingleRef"
    ></KSelectDepartmentSingle>
    <KSelectDepartmentMultiple
      selectType="multiple"
      ref="KSelectDepartmentMultipleRef"
    ></KSelectDepartmentMultiple>
    <KSelectPersonnelSingle
      selectType="single"
      ref="KSelectPersonnelSingleRef"
    ></KSelectPersonnelSingle>
    <KSelectPersonnelMultiple
      selectType="multiple"
      ref="KSelectPersonnelMultipleRef"
    ></KSelectPersonnelMultiple>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store';
import KSelectDepartmentSingle from '@/components/KSelectDepartment/Single/index.vue';
import KSelectDepartmentMultiple from '@/components/KSelectDepartment/Multiple/index.vue';
import KSelectPersonnelSingle from '@/components/KSelectPersonnel/Single/index.vue';
import KSelectPersonnelMultiple from '@/components/KSelectPersonnel/Multiple/index.vue';

const userStore = useUserStore();

const username = computed(() => userStore.username);
const roles = computed(() => userStore.roles);
const inputValue = ref('');
const KSelectDepartmentSingleRef =
  ref<InstanceType<typeof KSelectDepartmentSingle>>();
function selectDepartmentSingle() {
  KSelectDepartmentSingleRef.value?.open({});
}
const KSelectDepartmentMultipleRef =
  ref<InstanceType<typeof KSelectDepartmentMultiple>>();
function selectDepartmentMultiple() {
  KSelectDepartmentMultipleRef.value?.open({
    defaultSelection: [
      { id: 'A001', departmentCode: 'A001', departmentName: '董事会' },
      { id: 'A002', departmentCode: 'A002', departmentName: '董事会办公室' }
    ]
  });
}

const KSelectPersonnelSingleRef =
  ref<InstanceType<typeof KSelectPersonnelSingle>>();
function selectPersonnelSingle() {
  KSelectPersonnelSingleRef.value?.open({});
}
const KSelectPersonnelMultipleRef =
  ref<InstanceType<typeof KSelectPersonnelMultiple>>();
function selectPersonnelMultiple() {
  KSelectPersonnelMultipleRef.value?.open({
    defaultSelection: [
      { id: '1', personnelCode: '1', personnelName: '董事会' },
      { id: '2', personnelCode: '2', personnelName: '董事会办公室' }
    ]
  });
}
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
