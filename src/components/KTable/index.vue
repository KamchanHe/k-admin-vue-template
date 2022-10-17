<template>
  <div class="k-table">
    <el-table
      ref="KTableRef"
      :data="tableData"
      :row-key="rowKey"
      :stripe="stripe"
      :border="border"
      :highlight-currentRow="highlightCurrentRow"
      :summary-method="summaryMethod || defaultSummaryMethod"
      @selection-change="selectionChange"
      @select="select"
      @select-all="selectAll"
      @sort-change="sortChange"
      v-bind="$attrs"
    >
      <CheckboxColumn
        v-if="checkbox"
        ref="CheckboxColumnRef"
        :tableData="tableData"
        :row-key="rowKey"
        :selectable="selectable"
        :reserve-selection="reserveSelection"
        :checkbox-tooltip-key="checkboxTooltipKey"
        @selection-change="selectionChange"
        @select="select"
        @select-all="selectAll"
      ></CheckboxColumn>
      <template v-for="item in filterHeaderData" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :align="item.align"
          :fixed="item.fixed ? item.fixedAlign : false"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.ellipsis !== false"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #header="scope">
            <slot :name="`${item.prop}-header`" :target="item">
              <span>{{ item.label }}</span>
            </slot>
          </template>
          <template v-if="!item.type" #default="scope">
            <slot
              :name="item.prop"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
              :target="item"
            >
              <span>
                {{ rowLabel(scope) }}
              </span>
            </slot>
          </template>
        </el-table-column>
      </template>
      <slot />
    </el-table>
    <div
      v-if="columnConfigurable"
      class="k-table-column-configuration"
      @click="showTableColumnConfiguration"
    >
      <k-icon name="el-icon-setting"></k-icon>
    </div>
    <TableColumnConfiguration
      ref="TableColumnConfigurationRef"
      @confirm="tableHeaderUpdate"
    ></TableColumnConfiguration>
  </div>
</template>

<script setup lang="ts">
import type { ElTable } from 'element-plus';
import type { TableHeaderType } from '@/types/constant/table-header';
import type { GetArrayElementType } from '@/types';
import type {
  ScopeType,
  SelectableMethodType,
  SummaryMethodType
} from '@/types/element-plus/el-table';
import {
  every as _every,
  filter as _filter,
  find as _find,
  isNumber as _isNumber,
  map as _map,
  cloneDeep as _cloneDeep,
  isEmpty as _isEmpty
} from 'lodash-es';
import dayjs from 'dayjs';
import TableColumnConfigurationVersion from '@/constant/table-column-configuration-version';
import { localGet, localRemove } from '@/utils/storage';
import CheckboxColumn from './components/CheckboxColumn/index.vue';
import TableColumnConfiguration from './components/TableColumnConfiguration/index.vue';
import { useKeepScroll } from './hooks';

type RowType = GetArrayElementType<Props['tableData']>;

interface Props {
  tableData: unknown[];
  tableHeader: TableHeaderType[];
  rowKey?: string;
  columnConfigurable?: boolean;
  columnConfigurationId?: string;
  stripe?: boolean;
  border?: boolean;
  highlightCurrentRow?: boolean;
  summaryMethod?: SummaryMethodType<RowType>;
  checkbox?: boolean;
  selectable?: SelectableMethodType<RowType>;
  reserveSelection?: boolean;
  checkboxTooltipKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  columnConfigurable: true,
  stripe: true,
  border: true,
  highlightCurrentRow: true,
  checkbox: false,
  selectable: () => {
    return () => {
      return true;
    };
  },
  reserveSelection: false,
  checkboxTooltipKey: 'tooltip'
});

const emits = defineEmits([
  'selection-change',
  'select',
  'selection-all',
  'sort-change',
  'expand-change',
  'update:table-header'
]);

const filterHeaderData = computed(() => {
  return _filter(props.tableHeader, ['show', true]);
});

const getHeaderTarget = (prop: string) => {
  return _find(props.tableHeader, ['prop', prop]);
};

const rowLabel = computed(() => (scope: ScopeType<RowType>) => {
  const { row, column } = scope;
  const { property } = column;
  const label = (row as any)[property];
  const target = getHeaderTarget(property);
  let result: string | number = label;
  const { decimalDigits, timeFormat, transformType, transform } = target || {};
  if (decimalDigits && _isNumber(label)) {
    result = Number(label).toFixed(decimalDigits);
  }
  if (timeFormat) {
    result = dayjs(label).format(timeFormat);
  }
  if (transformType && transform) {
    const transformTarget = _find(transform, ['value', label]);
    result = transformTarget?.label || label;
  }
  return result;
});

const defaultSummaryMethod: SummaryMethodType<RowType> = (param) => {
  const { columns, data } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计';
      return;
    }
    const { property } = column;
    const target = getHeaderTarget(property);
    const { showSummary, decimalDigits, summaryDecimalDigits } = target || {};
    if (showSummary) {
      const values = _map(data, (item) => (item as any)[property]);
      if (!_every(values, (value) => Number.isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          }
          return prev;
        }, 0)}`;
        if (summaryDecimalDigits || decimalDigits) {
          sums[index] = Number(sums[index]).toFixed(
            summaryDecimalDigits || decimalDigits
          );
        }
      } else {
        sums[index] = 'N/A';
      }
    } else {
      sums[index] = '';
    }
  });
  return sums;
};

function selectionChange(list: RowType[]) {
  emits('selection-change', list);
}
function select(list: RowType[], row: RowType) {
  emits('select', list, row);
}
function selectAll(list: RowType[]) {
  emits('selection-all', list);
}
function sortChange(sort: {
  order: 'ascending' | 'descending';
  prop: keyof RowType;
}) {
  const { order } = sort;
  const result = order ? sort : {};
  emits('sort-change', result);
}

const KTableRef = ref<InstanceType<typeof ElTable>>();
const KTableWrapperRef = computed(() => {
  const bodyWrapper = KTableRef.value?.$refs.bodyWrapper as HTMLElement;
  return bodyWrapper?.querySelector('.el-scrollbar__wrap');
});
useKeepScroll(KTableWrapperRef);
watch(
  () => props.tableData,
  () => {
    KTableRef.value?.setScrollTop(0);
    KTableRef.value?.setScrollLeft(0);
  }
);

interface CacheVersionDataType {
  version: string;
  data: TableHeaderType[];
}

onMounted(() => {
  initTableColumnConfiguration();
});
const route = useRoute();
const cacheVersionData: Record<string, string> =
  TableColumnConfigurationVersion;
let defaultHeaderData: TableHeaderType[] = [];

function initTableColumnConfiguration() {
  defaultHeaderData = _cloneDeep(props.tableHeader);
  const id = route.path;
  // 最新版本
  const version = cacheVersionData[id];
  // 缓存数据
  const cacheData = localGet<CacheVersionDataType>(id);
  // 缓存版本
  const cacheVersion = cacheData?.version;
  // 版本一样 拿缓存
  if (version === cacheVersion) {
    const isEmptyCacheData = _isEmpty(cacheData);
    if (!isEmptyCacheData) {
      tableHeaderUpdate(cacheData.data);
    }
  } else {
    // 版本更新 清除缓存
    localRemove(id);
  }
}

const TableColumnConfigurationRef =
  ref<InstanceType<typeof TableColumnConfiguration>>();
function showTableColumnConfiguration() {
  const id = route.path;
  TableColumnConfigurationRef.value?.open({
    id,
    headerData: props.tableHeader,
    defaultHeaderData
  });
}
function tableHeaderUpdate(data: TableHeaderType[]) {
  emits('update:table-header', data);
}

const CheckboxColumnRef = ref<InstanceType<typeof CheckboxColumn>>();
function clearSelection() {
  CheckboxColumnRef.value?.clearSelection();
  KTableRef.value?.clearSelection();
}

function setSelection(list: RowType[] = []) {
  CheckboxColumnRef.value?.setSelection(list);
  list.forEach((row) => {
    KTableRef.value?.toggleRowSelection(row, true);
  });
}

function toggleRowSelection(row: RowType, flag: boolean) {
  CheckboxColumnRef.value?.toggleRowSelection(row, flag);
  const target = KTableRef.value
    ?.getSelectionRows()
    ?.find((elem: RowType) => (elem as any).id === (row as any).id);
  if (!target) return;
  KTableRef.value?.toggleRowSelection(target, flag);
}

function toggleRowExpansion(row: RowType, flag?: boolean) {
  KTableRef.value?.toggleRowExpansion(row, flag);
}

defineExpose({
  clearSelection,
  setSelection,
  toggleRowSelection,
  toggleRowExpansion
});
</script>
<script lang="ts">
export default {
  name: 'KTable'
};
</script>

<style lang="scss" scoped>
.k-table {
  position: relative;
  width: 100%;
  height: 100%;
}

.k-table-column-configuration {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  font-size: 20px;
  cursor: pointer;
}
</style>
