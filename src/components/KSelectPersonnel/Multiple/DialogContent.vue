<template>
  <div class="container-box page-box">
    <KDepartmentTree
      class="tree-box"
      :departmentSelectType="departmentSelectType"
      @selectionChange="departmentTreeSelectionChange"
    ></KDepartmentTree>
    <div class="transfer-box">
      <div class="search">
        <KHeaderSearch :searchForm="searchForm">
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
        </KHeaderSearch>
      </div>
      <div class="transfer">
        <el-transfer
          v-model="personnelSelection"
          filterable
          target-order="push"
          :titles="['可选人员', '已选人员']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :props="{ key: 'id', label: 'personnelName' }"
          @change="transferSelectionChange"
          :data="transferData"
        >
          <template #default="{ option }">
            {{ option.personnelName }} - {{ option.personnelCode }}
          </template>
        </el-transfer>
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
import { withLoading } from '@/utils/with-loading';
import { getSelectPersonnelList as apiGetTableData } from '@/api/organization-select';
import type { SelectPersonnelListItemType } from '@/types/api/organization-select';
import { BiMapConversion } from '@/utils/bi-map';
import {
  concat as _concat,
  find as _find,
  map as _map,
  unionBy as _unionBy
} from 'lodash-es';
import { $selectPersonnelItemMap } from '@/constant/bi-map/organization-select';

interface Props {
  departmentSelectType: 'single' | 'multiple';
  defaultSelection?: SelectPersonnelListItemType[];
}
const props = withDefaults(defineProps<Props>(), {
  defaultSelection: () => []
});
const emits = defineEmits(['cancel', 'confirm']);

const departmentSelection = ref<string[]>([]);
interface SearchFormType {
  personnelName?: string;
  personnelCode?: string;
}
const searchForm = reactive<SearchFormType>({
  personnelName: '',
  personnelCode: ''
});
const transferData = ref<SelectPersonnelListItemType[]>([]);
const personnelSelection = ref<string[]>([]);
const temporaryData = ref<SelectPersonnelListItemType[]>([]);

watch(
  () => props.defaultSelection,
  (selection) => {
    personnelSelection.value = _map(selection, 'id');
    transferData.value = selection;
    transferSelectionChange();
  },
  {
    immediate: true
  }
);

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
    const conversionData = BiMapConversion(data || [], $selectPersonnelItemMap);
    transferData.value = _unionBy(
      _concat(conversionData, temporaryData.value),
      'id'
    );
  });
}

function handleSearchAll(event: Event) {
  handleGetTableData(event, true);
}

/**
 * 选择人员改变
 * @param {array} value 右侧的数据
 * @param {string} direction 方向
 * @param {array} movedKeys 操作的数据
 * @return {void}
 */
function transferSelectionChange(
  value?: SelectPersonnelListItemType,
  direction?: 'left' | 'right',
  movedKeys?: string[]
) {
  temporaryData.value = _map(personnelSelection.value, (id) => {
    return _find(transferData.value, ['id', id]);
  }) as SelectPersonnelListItemType[];
}

function cancel() {
  emits('cancel');
}

function confirm() {
  emits('confirm', temporaryData.value);
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

  .transfer-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .search {
      padding-top: 10px;
    }

    .transfer {
      flex: 1;
      height: 100%;
      overflow: hidden;

      :deep(.el-transfer) {
        display: flex;
        align-items: center;
        height: 100%;

        .el-transfer__buttons {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          justify-content: center;

          .el-button {
            width: 100%;
            margin: 5px 0;
          }
        }

        .el-transfer-panel {
          display: flex;
          flex: 1;
          flex-direction: column;
          height: 100%;
        }

        .el-transfer-panel__body {
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: hidden;
        }

        .el-transfer-panel__list {
          flex: 1;
        }

        @media only screen and (max-width: 900px) {
          flex-direction: column;

          .el-transfer-panel {
            width: 100%;
          }

          .el-transfer-panel__filter {
            margin: 10px 15px 5px;
          }

          .el-transfer__buttons {
            flex-direction: row;

            .el-button {
              margin: 5px;
            }
          }
        }
      }
    }

    .action {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
    }
  }
}
</style>
