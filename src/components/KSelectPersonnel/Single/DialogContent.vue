<template>
  <div class="container-box page-box">
    <KDepartmentTree
      class="tree-box"
      :departmentSelectType="departmentSelectType"
      @selectionChange="departmentTreeSelectionChange"
    ></KDepartmentTree>
    <div class="table-box">
      <div class="search">
        <KHeaderSearch :searchForm="searchForm" :actionCount="4">
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
          <template #search>
            <el-button
              :disabled="searchAllButtonDisabled"
              @click="handleSearchAll"
              type="primary"
            >
              全部
            </el-button>
          </template>
          <template #action>
            <el-form-item>
              <el-button
                :disabled="searchButtonDisabled"
                @click="handleSearch"
                type="primary"
              >
                部门下
              </el-button>
            </el-form-item>
          </template>
        </KHeaderSearch>
      </div>
      <div class="table">
        <KTable
          ref="KTableRef"
          v-model:table-header="tableHeader"
          :table-data="tableData"
          height="100%"
        >
          <el-table-column width="120" align="center">
            <template #header>
              <span>操作</span>
            </template>
            <template #default="scope">
              <el-button plain type="primary" @click="confirm(scope.row)">
                选择
              </el-button>
            </template>
          </el-table-column>
        </KTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KDepartmentTree from '@/components/KDepartmentTree/index.vue';
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';
import KTable from '@/components/KTable/index.vue';
import { withLoading } from '@/utils/with-loading';
import { getSelectPersonnelList as apiGetTableData } from '@/api/organization-select';
import type { SelectPersonnelListItemType } from '@/types/api/organization-select';
import { $selectPersonnelItemMap } from '@/constant/bi-map/organization-select';
import { $selectPersonnelTableHeader as $tableHeader } from '@/constant/table-header/organization-select';
import { BiMapConversion } from '@/utils/bi-map';
import { isEmpty as _isEmpty, map as _map } from 'lodash-es';

defineProps({
  departmentSelectType: {
    type: String
  }
});
const emits = defineEmits(['confirm']);

const departmentSelection = ref<string[]>([]);

interface SearchFormType {
  personnelName?: string;
  personnelCode?: string;
}
const searchForm = reactive<SearchFormType>({
  personnelName: '',
  personnelCode: ''
});
const tableHeader = ref($tableHeader);
const tableData = ref<SelectPersonnelListItemType[]>([]);

const searchButtonDisabled = computed(() => {
  return _isEmpty(departmentSelection.value);
});

const searchAllButtonDisabled = computed(() => {
  const { personnelName, personnelCode } = searchForm;
  return !personnelName && !personnelCode;
});

function departmentTreeSelectionChange(
  selection: SelectPersonnelListItemType[]
) {
  departmentSelection.value = _map(selection, 'id');
  handleGetTableData();
}

function handleGetTableData(event?: Event, searchAll = false) {
  const { personnelName, personnelCode } = searchForm;
  withLoading(apiGetTableData)({
    multiDeptIds: searchAll ? [] : departmentSelection.value,
    name: personnelName,
    code: personnelCode
  }).then((res) => {
    const { data } = res;
    tableData.value = BiMapConversion(data || [], $selectPersonnelItemMap);
  });
}

function handleSearch() {
  handleGetTableData();
}
function handleSearchAll(event: Event) {
  handleGetTableData(event, true);
}

function confirm(row: SelectPersonnelListItemType) {
  emits('confirm', row);
}
</script>

<script lang="ts">
export default {
  name: 'DialogContent'
};
</script>

<style scoped lang="scss">
.page-box {
  flex-direction: row;
  padding: 0;

  .tree-box {
    padding-top: 10px;
    padding-right: 10px;
  }

  .table-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;

    .search {
      padding-top: 10px;
    }

    .table {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
