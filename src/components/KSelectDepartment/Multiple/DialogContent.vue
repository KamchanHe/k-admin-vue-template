<template>
  <div class="container-box page-box">
    <KDepartmentTree
      class="tree-box"
      ref="KDepartmentTreeRef"
      departmentSelectType="multiple"
      @selectionChange="departmentTreeSelectionChange"
    ></KDepartmentTree>
    <div class="table-box">
      <div class="search">
        <KHeaderSearch :searchForm="searchForm" @handleSearch="handleSearch">
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
        </KHeaderSearch>
      </div>
      <div class="table">
        <KTable
          ref="KTableRef"
          v-model:table-header="tableHeader"
          :table-data="tableData"
          height="100%"
          :tree-props="{ children: 'null' }"
        >
          >
          <el-table-column width="120" align="center">
            <template #header>
              <span>操作</span>
            </template>
            <template #default="scope">
              <el-button plain type="danger" @click="handleRemove(scope)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </KTable>
      </div>
      <div class="action">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KDepartmentTree from '@/components/KDepartmentTree/index.vue';
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';
import KTable from '@/components/KTable/index.vue';
import { $selectDepartmentTableHeader as $tableHeader } from '@/constant/table-header/organization-select';
import type { SelectDepartmentTreeItemType } from '@/types/api/organization-select';
import type { ScopeType } from '@/types/element-plus/el-table';
import {
  map as _map,
  cloneDeep as _cloneDeep,
  filter as _filter,
  keys as _keys,
  values as _values,
  every as _every,
  isEmpty as _isEmpty
} from 'lodash-es';
import type { ElTree } from 'element-plus';

interface Props {
  defaultSelection?: SelectDepartmentTreeItemType[];
}
const props = withDefaults(defineProps<Props>(), {
  defaultSelection: () => []
});

const emits = defineEmits(['cancel', 'confirm']);

const KDepartmentTreeRef = ref<InstanceType<typeof ElTree>>();

watch(
  () => props.defaultSelection,
  (selection) => {
    setDefaultSelection(selection);
  }
);

onMounted(() => {
  setDefaultSelection(props.defaultSelection);
});

function setDefaultSelection(selection: SelectDepartmentTreeItemType[]) {
  const isEmpty = _isEmpty(selection);
  if (!isEmpty) {
    const ids = _map(selection, 'id');
    KDepartmentTreeRef?.value?.setCheckedKeys(ids);
    departmentTreeSelectionChange(selection);
  }
}

function departmentTreeSelectionChange(
  selection: SelectDepartmentTreeItemType[]
) {
  temporaryTableData.value = selection;
  handleSearch();
}

const tableHeader = ref($tableHeader);
const tableData = ref<SelectDepartmentTreeItemType[]>([]);
const temporaryTableData = ref<SelectDepartmentTreeItemType[]>([]);
interface SearchFormType {
  departmentName?: string;
  departmentCode?: string;
}
const searchForm = reactive<SearchFormType>({
  departmentName: '',
  departmentCode: ''
});

function handleSearch() {
  handleGetTableData();
}

function handleGetTableData() {
  tableData.value = tableDataFilter(temporaryTableData.value, searchForm);
}

function tableDataFilter(
  data: SelectDepartmentTreeItemType[],
  conditions: SearchFormType = {}
) {
  const copyData = _cloneDeep(data);
  const keys = _keys(conditions);
  const values = _values(conditions);
  const noFilter = _every(values, (item) => !item);
  if (noFilter) return copyData;
  return _filter(copyData, (item) => {
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
    return _every(flags, Boolean);
  });
}

function handleRemove(scope: ScopeType<SelectDepartmentTreeItemType>) {
  const { row } = scope;
  const { id } = row;
  KDepartmentTreeRef.value?.setChecked(id, false, false);
  const checkedNodes = KDepartmentTreeRef.value?.getCheckedNodes();
  departmentTreeSelectionChange(
    (checkedNodes || []) as unknown as SelectDepartmentTreeItemType[]
  );
}

function cancel() {
  emits('cancel');
}

function confirm() {
  emits('confirm', temporaryTableData.value);
}
</script>

<script lang="ts">
export default {
  name: 'DialogContent'
};
</script>

<style lang="scss" scoped>
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
    padding-top: 10px;
    overflow: hidden;

    .search {
      flex-basis: 60px;
    }

    .table {
      flex: 1;
      overflow: hidden;
    }

    .action {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
    }
  }
}
</style>
