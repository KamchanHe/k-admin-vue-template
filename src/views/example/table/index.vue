<template>
  <div class="container-box">
    <KHeaderSearch :searchForm="searchForm">
      <el-form-item label="员工名称" prop="staffName">
        <el-input
          v-model="searchForm.staffName"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="员工工号" prop="staffCode">
        <el-input
          v-model="searchForm.staffCode"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="searchForm.phone" clearable placeholder="请输入" />
      </el-form-item>
    </KHeaderSearch>
  </div>
</template>

<script setup lang="ts">
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';

const searchForm = reactive({
  staffName: null,
  staffCode: null,
  phone: null
});
</script>
<script lang="ts">
export default {
  name: 'ExampleTable'
};
</script>
