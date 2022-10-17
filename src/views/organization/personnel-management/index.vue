<template>
  <div class="container-box">
    <KHeaderSearch :searchForm="searchForm" @handleSearch="handleSearch">
      <el-form-item label="人员名称" prop="personnelName">
        <el-input
          v-model.trim="searchForm.personnelName"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="人员工号" prop="personnelCode">
        <el-input
          v-model.trim="searchForm.personnelCode"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
    </KHeaderSearch>
    <div class="flex-box">
      <KDepartmentTree
        class="tree-box"
        departmentSelectType="multiple"
        @selectionChange="departmentTreeSelectionChange"
      ></KDepartmentTree>
      <div class="flex-column-box">
        <KTable
          ref="KTableRef"
          class="table-box"
          v-model:table-header="tableHeader"
          :table-data="tableData"
          height="100%"
        >
        </KTable>
        <KPagination
          class="pagination-box"
          :total="total"
          :limit="pageSize"
          :page="pageNum"
          @pagination="paginationChange"
        ></KPagination>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';
import KTable from '@/components/KTable/index.vue';
import KPagination from '@/components/KPagination/index.vue';
import KDepartmentTree from '@/components/KDepartmentTree/index.vue';
import { withLoading } from '@/utils/with-loading';
import { getPersonnelPage as apiGetTableData } from '@/api/organization';
import type { PersonnelListItemType } from '@/types/api/organization';
import type { SelectDepartmentTreeItemType } from '@/types/api/organization-select';
import type { KPaginationParamType } from '@/types/components/k-pagination';
import { $personnelManagementTableHeader as $tableHeader } from '@/constant/table-header/organization';
import {
  $personnelItemMap,
  $departmentItemMap
} from '@/constant/bi-map/organization';
import { BiMapConversion } from '@/utils/bi-map';
import { forEach as _forEach, map as _map } from 'lodash-es';

onMounted(() => {
  handleSearch();
});

const departmentSelection = ref<string[]>([]);

interface SearchFormType {
  personnelName?: string;
  personnelCode?: string;
}
const searchForm = reactive<SearchFormType>({
  personnelName: '',
  personnelCode: ''
});

const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const tableHeader = ref($tableHeader);
const tableData = ref<PersonnelListItemType[]>([]);
const KTableRef = ref<InstanceType<typeof KTable>>();

function departmentTreeSelectionChange(
  selection: SelectDepartmentTreeItemType[]
) {
  departmentSelection.value = _map(selection, 'id');
  handleSearch();
}

function handleSearch() {
  pageNum.value = 1;
  handleGetTableData();
}

function handleGetTableData() {
  const { personnelName, personnelCode } = searchForm;
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    multiDeptIds: departmentSelection.value,
    name: personnelName,
    code: personnelCode
  };
  withLoading(apiGetTableData)(params).then((res) => {
    const { data } = res;
    if (!data) return;
    const { total: resTotal, list } = data;
    const conversionData = BiMapConversion(list || [], $personnelItemMap);
    _forEach(conversionData, (item) => {
      const { departmentInfo } = item;
      const deptConversion = BiMapConversion(
        departmentInfo || {},
        $departmentItemMap
      );
      const { departmentName } = deptConversion;
      item.departmentInfo = deptConversion;
      item.departmentName = departmentName;
    });
    tableData.value = conversionData;
    total.value = resTotal;
  });
}

function paginationChange(params: KPaginationParamType) {
  const { page, limit } = params;
  pageSize.value = limit;
  pageNum.value = page;
  handleGetTableData();
}
</script>
<script lang="ts">
export default {
  name: 'PersonnelManagement'
};
</script>

<style scoped lang="scss">
.flex-box {
  display: flex;
  flex: 1;
  overflow: hidden;

  .tree-box {
    padding-right: 10px;
  }

  .flex-column-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .table-box {
      flex: 1;
      overflow: hidden;
    }

    .pagination-box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
