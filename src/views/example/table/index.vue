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
    <KTable
      class="table-box"
      v-model:table-header="tableHeader"
      :table-data="tableData"
      height="100%"
      :show-summary="true"
      :checkbox="true"
    ></KTable>
    <KPagination
      :total="total"
      :limit="pageSize"
      :page="pageNum"
      @pagination="paginationChange"
    ></KPagination>
  </div>
</template>

<script setup lang="ts">
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';
import KTable from '@/components/KTable/index.vue';
import KPagination from '@/components/KPagination/index.vue';
import { getTablePage } from '@/api/table';
import type { TablePageItemType } from '@/types/api/table';
import { withLoading } from '@/utils/with-loading';
import { $tableHeader } from '@/constant/table-header/table';

const searchForm = reactive({
  staffName: null,
  staffCode: null,
  phone: null
});

const tableHeader = ref($tableHeader);
const tableData = ref<TablePageItemType[]>([]);
const pageSize = ref(10);
const pageNum = ref(1);
const total = ref(0);

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  withLoading(getTablePage)({
    pageSize: pageSize.value,
    pageNum: pageNum.value
  }).then((response) => {
    const { list, total: totalNum } = response.data;
    tableData.value = list;
    total.value = totalNum;
  });
};
const paginationChange = (params: { page: number; limit: number }) => {
  pageNum.value = params.page;
  pageSize.value = params.limit;
  // 使用防抖函数 防止多次请求
  fetchData();
};
</script>
<script lang="ts">
export default {
  name: 'TablePage'
};
</script>

<style lang="scss" scoped>
.container-box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-box {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
</style>
