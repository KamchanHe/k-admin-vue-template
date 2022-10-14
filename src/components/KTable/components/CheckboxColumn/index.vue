<template>
  <el-table-column :fixed="'left'" align="center" width="60">
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <template #header="scope">
      <el-checkbox
        :disabled="checkAllDisabled"
        :model-value="isCheckAll"
        :indeterminate="isIndeterminate"
        @change="checkAllChange"
      />
    </template>
    <template #default="scope">
      <el-tooltip
        :disabled="!scope.row[checkboxTooltipKey]"
        effect="dark"
        :content="scope.row[checkboxTooltipKey]"
        placement="right"
      >
        <el-checkbox
          :model-value="checkboxItemIsSelect(scope.row)"
          :disabled="!selectable(scope.row)"
          @change="(flag) => checkboxRowChange(flag, scope.row)"
        />
      </el-tooltip>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import type { GetArrayElementType } from '@/types';
import type { SelectableMethodType } from '@/types/element-plus/el-table';

type RowType = GetArrayElementType<Props['tableData']>;

interface Props {
  tableData: unknown[];
  rowKey?: string;
  selectable?: SelectableMethodType<RowType>;
  reserveSelection?: boolean;
  checkboxTooltipKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  selectable: () => {
    return () => {
      return true;
    };
  },
  reserveSelection: false,
  checkboxTooltipKey: 'tooltip'
});

const emits = defineEmits(['selection-change', 'select', 'select-all']);

const selectList = ref<RowType[]>([]);

const selectListMap = computed(() => {
  const result = new Map();
  selectList.value?.forEach((item) => {
    result.set((item as any)[props.rowKey], true);
  });
  return result;
});

const checkAllDisabled = computed(() => {
  const { length } = props.tableData;
  let count = 0;
  for (let index = 0; index < length; index += 1) {
    const item = props.tableData[index];
    const selectableFlag = props.selectable(item);
    if (!selectableFlag) count += 1;
  }
  return count === length || !length;
});

const checkboxItemIsSelect = computed(() => (row: RowType) => {
  return selectListMap.value?.has((row as any)[props.rowKey]);
});

const isCheckAll = computed(() => {
  const { length } = props.tableData;
  if (!length) return false;
  let selectCount = 0; // 当前勾选
  let disabledCount = 0; // 当前禁选
  for (let index = 0; index < length; index += 1) {
    const item = props.tableData[index];
    // 已勾选
    const flag = selectListMap.value?.has((item as any)[props.rowKey]);
    // 当前勾选数+=1
    if (flag) {
      selectCount += 1;
    } else {
      const selectableFlag = props.selectable(item);
      // 能勾选 证明不是全勾 中断循环
      if (selectableFlag) {
        break;
      } else {
        // 当前禁选+=1
        disabledCount += 1;
      }
    }
  }
  // 全部禁选
  const allDisabled = disabledCount === length;
  // 已勾选 = 当前勾选+当前禁选
  const allCount = selectCount + disabledCount;
  return allCount === length && !allDisabled;
});

const isIndeterminate = computed(() => {
  return Boolean(!isCheckAll.value && selectList.value?.length);
});

function clearSelection() {
  selectList.value = [];
  emits('selection-change', []);
}

watch(
  () => props.tableData,
  () => {
    if (!props.reserveSelection) {
      clearSelection();
    }
  }
);

function checkAllChange(status: boolean) {
  const flag = isIndeterminate.value ? true : status;
  props.tableData.forEach((item) => {
    const itemFlag = props.selectable(item);
    if (itemFlag) checkboxRowChange(flag, item);
  });
  emits('selection-change', selectList.value);
  emits('select-all', selectList.value);
}

function checkboxRowChange(flag: boolean, row: RowType) {
  const isHas = selectListMap.value?.has((row as any)[props.rowKey]);
  if (flag && !isHas) {
    selectList.value?.push(row);
  } else if (!flag && isHas) {
    const index = selectList.value?.findIndex(
      (item) => (item as any)[props.rowKey] === (row as any)[props.rowKey]
    );
    selectList.value?.splice(index, 1);
  }
  emits('selection-change', selectList.value);
  emits('select', selectList.value, row);
}

function setSelection(list: RowType[] = []) {
  const filterData = list.filter((row) => {
    return props.selectable(row);
  });
  selectList.value = filterData;
  emits('selection-change', filterData);
}

function toggleRowSelection(row: RowType, flag?: boolean) {
  const { id } = row as any;
  const index = selectList.value.findIndex((item) => (item as any).id === id);
  if (flag === true && index === -1) {
    selectList.value.push(row);
    emits('select', selectList.value, row);
  } else if (flag === false && index > -1) {
    selectList.value.splice(index, 1);
  } else if (index > -1) {
    selectList.value.splice(index, 1);
  } else {
    selectList.value.push(row);
    emits('select', selectList.value, row);
  }
  emits('selection-change', selectList.value);
}

defineExpose({
  clearSelection,
  setSelection,
  toggleRowSelection
});
</script>
<script lang="ts">
export default {
  name: 'CheckboxColumn'
};
</script>
