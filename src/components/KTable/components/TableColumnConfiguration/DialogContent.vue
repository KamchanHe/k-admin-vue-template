<template>
  <div class="content-box">
    <div class="table-box">
      <el-table
        :data="cloneConfigurationData"
        stripe
        border
        height="100%"
        max-height="100%"
        style="width: 100%"
        :highlight-current-row="true"
        row-key="prop"
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="label" label="列名" show-overflow-tooltip />
        <el-table-column prop="show" label="显示" align="center" width="80">
          <template #default="scope">
            <el-checkbox v-model="scope.row.show" />
          </template>
        </el-table-column>
        <el-table-column prop="fixed" label="固定" align="center" width="80">
          <template #default="scope">
            <el-checkbox v-model="scope.row.fixed" />
          </template>
        </el-table-column>
        <el-table-column
          prop="fixedAlign"
          label="固定位置"
          align="center"
          width="200"
        >
          <template v-slot="scope">
            <el-select v-model="scope.row.fixedAlign" placeholder="请选择">
              <el-option
                v-for="item in $fixedAlignOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="action-box">
      <el-button type="primary" @click="reset">恢复初始设置</el-button>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableHeaderType } from '@/types/constant/table-header';
import { cloneDeep as _cloneDeep } from 'lodash-es';
import { localSet } from '@/utils/storage';
import { $fixedAlignOptions } from '@/constant/options/table-column-configuration';
import { ElMessage } from 'element-plus';
import TableColumnConfigurationVersion from '@/constant/table-column-configuration-version';

export interface MixinDataType {
  id: string;
  headerData: TableHeaderType[];
  defaultHeaderData: TableHeaderType[];
}

const emits = defineEmits(['reset', 'cancel', 'confirm']);

const configurationData = ref<TableHeaderType[]>([]);
const defaultConfigurationData = ref<TableHeaderType[]>([]);
const columnConfigurationId = ref<string>();
const cacheVersionData = reactive<Record<string, string>>(
  TableColumnConfigurationVersion
);

function handleMixin(data: MixinDataType) {
  if (!data) return;
  const { id, headerData, defaultHeaderData } = data;
  columnConfigurationId.value = id;
  configurationData.value = headerData;
  defaultConfigurationData.value = defaultHeaderData;
}

const cloneConfigurationData = computed(() => {
  return _cloneDeep(configurationData.value);
});

function reset() {
  // 缓存版本和数据
  const version = cacheVersionData[columnConfigurationId.value as string];
  localSet(columnConfigurationId.value as string, {
    version,
    data: defaultConfigurationData.value
  });
  emits('confirm', defaultConfigurationData.value);
}

function cancel() {
  emits('cancel');
}

function confirm() {
  let flag = false;
  for (let index = 0; index < cloneConfigurationData.value.length; index += 1) {
    const item = cloneConfigurationData.value[index];
    const { show } = item;
    if (show) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    ElMessage.warning('至少显示一项');
    return;
  }
  // 缓存版本和数据
  const version = cacheVersionData[columnConfigurationId.value as string];
  localSet(columnConfigurationId.value as string, {
    version,
    data: cloneConfigurationData.value
  });
  emits('confirm', cloneConfigurationData.value);
}

defineExpose({
  handleMixin
});
</script>
<script lang="ts">
export default {
  name: 'DialogContent'
};
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.table-box {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.action-box {
  display: flex;
  flex-basis: 60px;
  align-items: center;
  justify-content: flex-end;
}
</style>
