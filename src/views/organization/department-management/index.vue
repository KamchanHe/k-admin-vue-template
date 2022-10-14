<template>
  <div class="container-box">
    <KHeaderSearch
      :searchForm="searchForm"
      @handleSearch="handleSearch"
      :actionCount="5"
    >
      <el-form-item label="部门名称" prop="departmentName">
        <el-input
          v-model.trim="searchForm.departmentName"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="departmentCode">
        <el-input
          v-model.trim="searchForm.departmentCode"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
      <template #action>
        <el-form-item>
          <el-button plain type="primary" @click="handleToggleUnFold(true)">
            展开
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="handleToggleUnFold(false)">
            收起
          </el-button>
        </el-form-item>
      </template>
    </KHeaderSearch>
    <KTable
      ref="KTableRef"
      class="table-box"
      v-model:table-header="tableHeader"
      :table-data="tableData"
      height="100%"
    >
    </KTable>
  </div>
</template>

<script setup lang="ts">
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';
import KTable from '@/components/KTable/index.vue';
import { withLoading } from '@/utils/with-loading';
import { getDepartmentTree as apiGetTableData } from '@/api/organization';
import type { DepartmentTreeItemType } from '@/types/api/organization';
import { $departmentManagementTableHeader as $tableHeader } from '@/constant/table-header/organization';
import { $departmentItemMap } from '@/constant/bi-map/organization';
import { BiMapConversion } from '@/utils/bi-map';

import {
  map as _map,
  forEach as _forEach,
  cloneDeep as _cloneDeep,
  filter as _filter,
  isEmpty as _isEmpty,
  keys as _keys,
  values as _values,
  every as _every
} from 'lodash-es';

const tableHeader = ref($tableHeader); // 表头
const tableData = ref<DepartmentTreeItemType[]>([]); // 表体
// 搜索参数
interface SearchFormType {
  departmentName?: string;
  departmentCode?: string;
}
const searchForm = reactive<SearchFormType>({
  departmentName: '',
  departmentCode: ''
});

onMounted(() => {
  handleGetTableData();
});

function handleSearch() {
  handleGetTableData();
}

function handleGetTableData() {
  withLoading(apiGetTableData)().then((res) => {
    const { data } = res;
    const conversionData = recursionConversion(data || []);
    tableData.value = tableDataRecursionFilter(conversionData, searchForm);
  });
}

function recursionConversion(
  data: DepartmentTreeItemType[],
  map = $departmentItemMap
) {
  const biMapData = BiMapConversion(data || [], map);
  return _map(biMapData, (item) => {
    const { children } = item;
    if (children) {
      item.children = recursionConversion(children, map);
    }
    return item;
  });
}

const KTableRef = ref();
function handleToggleUnFold(flag: boolean, data = tableData.value) {
  _forEach(data, (item) => {
    KTableRef.value?.toggleRowExpansion(item, flag);
    const { children } = item;
    if (children) {
      handleToggleUnFold(flag, children);
    }
  });
}

function tableDataRecursionFilter(
  data: DepartmentTreeItemType[],
  conditions: SearchFormType = {}
) {
  const copyData = _cloneDeep(data);
  const keys = _keys(conditions);
  const values = _values(conditions);
  const noFilter = _every(values, (item) => !item);
  if (noFilter) return copyData;
  return _filter(copyData, (item) => {
    const { children } = item;
    if (!_isEmpty(children)) {
      item.children = tableDataRecursionFilter(children, conditions);
    }
    const flags = [];
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index] as keyof typeof conditions;
      const value = conditions[key];
      if (!value) {
        flags.push(true);
      } else {
        const flag = item[key].indexOf(value) > -1;
        flags.push(flag);
      }
    }
    const isTarget = _every(flags, Boolean);
    return isTarget || !_isEmpty(item.children);
  });
}
</script>

<script lang="ts">
export default {
  name: 'DepartmentManagement'
};
</script>

<style scoped lang="scss">
.container-box {
  display: flex;
  flex-direction: column;
}

.table-box {
  flex: 1;
  width: 100%;
  overflow: hidden;

  :deep(.el-table__placeholder) {
    display: inline;
  }
}
</style>
