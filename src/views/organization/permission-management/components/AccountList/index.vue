<template>
  <div class="page-box">
    <KHeaderSearch
      class="header-box"
      :searchForm="searchForm"
      :action-count="5"
      @handleSearch="handleSearch"
    >
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
      <template #action>
        <el-form-item>
          <el-button type="primary" @click="handleAdd"> 添加 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleDelete"> 删除 </el-button>
        </el-form-item>
      </template>
    </KHeaderSearch>
    <KTable
      ref="KTableRef"
      class="table-box"
      v-model:table-header="tableHeader"
      :table-data="tableData"
      :checkbox="true"
      height="100%"
      @selectionChange="selectionChange"
    ></KTable>
    <KPagination
      class="pagination-box"
      :total="total"
      :limit="pageSize"
      :page="pageNum"
      @pagination="paginationChange"
    ></KPagination>
    <KSelectPersonnel
      selectType="multiple"
      ref="KSelectPersonnelMultipleRef"
      :beforeConfirm="confirmAdd"
    ></KSelectPersonnel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KHeaderSearch from '@/components/KHeaderSearch/index.vue';
import KTable from '@/components/KTable/index.vue';
import KPagination from '@/components/KPagination/index.vue';
import KSelectPersonnel from '@/components/KSelectPersonnel/index.vue';
import type { BeforeConfirmParamType } from '@/components/KSelectPersonnel/index.vue';

import { withLoading } from '@/utils/with-loading';
import { BiMapConversion } from '@/utils/bi-map';
import {
  getPersonnelPage as apiGetTableData,
  removeRolePersonnel as apiRemoveRolePersonnel,
  saveRolePersonnel as apiSaveRolePersonnel
} from '@/api/organization';
import type { KPaginationParamType } from '@/types/components/k-pagination';
import type { PersonnelPageItemType } from '@/types/api/organization';
import { $rolePersonnelTableHeader as $tableHeader } from '@/constant/table-header/organization';
import { $rolePersonnelItemMap as $tableItemMap } from '@/constant/bi-map/organization';
import { isEmpty as _isEmpty, map as _map } from 'lodash-es';
import { ElMessage, ElMessageBox } from 'element-plus';
import { controlDataKey } from '../../utils';

const controlData = inject(controlDataKey);

const activeId = computed(() => {
  const { activeId: targetActiveID } = controlData || {};
  return targetActiveID;
});

const KTableRef = ref<InstanceType<typeof KTable>>();
const tableHeader = ref($tableHeader);
const tableData = ref<PersonnelPageItemType[]>([]);
const pageSize = ref(10);
const pageNum = ref(1);
const total = ref(0);
const selection = ref<PersonnelPageItemType[]>([]);

interface SearchFormType {
  personnelName?: string;
  personnelCode?: string;
}
const searchForm = reactive<SearchFormType>({
  personnelName: '',
  personnelCode: ''
});

watch(activeId, (id) => {
  if (!id) return;
  pageNum.value = 1;
  KTableRef.value?.clearSelection();
  handleSearch();
});

function handleSearch() {
  pageNum.value = 1;
  handleGetTableData();
}

function handleGetTableData() {
  const { personnelName, personnelCode } = searchForm;
  const params = {
    pageSize: pageSize.value,
    pageNum: pageNum.value,
    roleIds: [activeId.value],
    name: personnelName,
    code: personnelCode
  };
  withLoading(apiGetTableData)(params).then((res) => {
    const { data } = res;
    const { list = [], total: totalNum } = data || {};
    tableData.value = BiMapConversion(list || [], $tableItemMap);
    total.value = totalNum;
  });
}

function paginationChange(params: KPaginationParamType) {
  const { page, limit } = params;
  pageSize.value = limit;
  pageNum.value = page;
  handleGetTableData();
}

function selectionChange(value: PersonnelPageItemType[]) {
  selection.value = value;
}

const KSelectPersonnelMultipleRef =
  ref<InstanceType<typeof KSelectPersonnel>>();
function handleAdd() {
  KSelectPersonnelMultipleRef.value?.open({});
}

function confirmAdd({ done, selection: value }: BeforeConfirmParamType) {
  const ids = _map(value as [], 'id');
  if (!activeId.value) return;
  withLoading(apiSaveRolePersonnel)({
    roleId: activeId.value,
    userIds: ids
  }).then((res) => {
    ElMessage.success(res.msg);
    done();
    handleGetTableData();
  });
}

function handleDelete() {
  const isEmpty = _isEmpty(selection.value);
  if (isEmpty) {
    ElMessage.warning('请选择要移除的人员');
    return;
  }
  ElMessageBox.confirm('此操作将移除所选人员, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (!activeId.value) return;
    const ids = _map(selection.value, 'id');
    withLoading(apiRemoveRolePersonnel)({
      roleId: activeId.value,
      userIds: ids
    }).then((res) => {
      ElMessage.success(res.msg);
      KTableRef.value?.clearSelection();
      handleGetTableData();
    });
  });
}
</script>

<script lang="ts">
export default {
  name: 'AccountList'
};
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px 20px;
  overflow: hidden;

  .header-box {
    padding-top: 10px;
  }

  .table-box {
    flex: 1;
    overflow: hidden;
  }

  .pagination-box {
    display: flex;
    justify-content: center;
  }
}
</style>
