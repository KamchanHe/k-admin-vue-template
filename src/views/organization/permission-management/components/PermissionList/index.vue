<template>
  <div class="page-box">
    <div class="header-box">
      <span>设置角色对应的功能操作、应用管理、后台管理权限</span>
      <div class="actions">
        <el-checkbox
          :value="isCheckAll"
          :indeterminate="isIndeterminate"
          @change="checkAllChange"
        >
          全选
        </el-checkbox>
        <el-button type="primary" @click="handleSavaRolePermission">
          保存
        </el-button>
      </div>
    </div>
    <div class="list-box">
      <template v-for="item in menuTreeData" :key="item.id">
        <GroupItem
          :item="item"
          :allPermission="allPermissionMap[item.id]"
          :default-selection="selectionMap[item.id]"
          @selection-change="(selection) => selectionChange(item.id, selection)"
        ></GroupItem>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { withLoading } from '@/utils/with-loading';
import { BiMapConversion } from '@/utils/bi-map';
import {
  getMenuTree as apiGetMenuTree,
  getRoleDetail as apiGetRoleDetail,
  saveRoleMenu as apiSaveRoleMenu
} from '@/api/organization';
import type { MenuTreeItemType } from '@/types/api/organization';
import {
  $roleItemMap,
  $rolePermissionItemMap
} from '@/constant/bi-map/organization';

import {
  assign as _assign,
  cloneDeep as _cloneDeep,
  filter as _filter,
  flattenDeep as _flattenDeep,
  forEach as _forEach,
  groupBy as _groupBy,
  isEmpty as _isEmpty,
  map as _map,
  values as _values,
  keys as _keys
} from 'lodash-es';
import { ElMessage } from 'element-plus';
import GroupItem from './GroupItem/index.vue';
import { controlDataKey } from '../../utils';

const controlData = inject(controlDataKey);

const activeId = computed(() => {
  const { activeId: targetActiveId } = controlData || {};
  return targetActiveId;
});

const menuTreeData = ref<MenuTreeItemType[]>([]);
const allPermissionMap: Record<string, string[]> = {};
const defaultSelectionMap: Record<string, string[]> = {};
const selectionMap = reactive<Record<string, string[]>>({});
const selectionValues = ref<string[]>([]);

watch(selectionMap, (value) => {
  selectionValues.value = _flattenDeep(_values(value));
});

const isIndeterminate = computed(() => {
  const values = selectionValues.value;
  const isEmpty = _isEmpty(values);
  return !isCheckAll.value && !isEmpty;
});

const isCheckAll = computed(() => {
  const allPermission = _flattenDeep(_values(allPermissionMap));
  const selection = selectionValues.value;
  const isEmpty = _isEmpty(selection);
  if (isEmpty) return false;
  const total = allPermission.length;
  const selectionTotal = selection.length;
  return total === selectionTotal;
});

function checkAllChange(value: boolean) {
  const flag = isIndeterminate.value ? true : value;
  if (flag) {
    _assign(selectionMap, allPermissionMap);
  } else {
    _assign(selectionMap, defaultSelectionMap);
  }
}

watch(activeId, (id) => {
  initMenuTree().then((res) => {
    if (!id) return;
    getRoleDetail();
  });
});

function getRoleDetail() {
  if (!activeId.value) return;
  withLoading(apiGetRoleDetail)(activeId.value).then((res) => {
    const { data } = res;
    const mapData = BiMapConversion(data || {}, $roleItemMap);
    const { menuSelection } = mapData;
    const filterData = _filter(menuSelection, ['clientType', 0]);
    const filterDataMapData = BiMapConversion(
      filterData,
      $rolePermissionItemMap
    );
    const group = _groupBy(filterDataMapData, 'parentId');
    _assign(selectionMap, defaultSelectionMap);
    _keys(group).forEach((key) => {
      const target = group[key];
      selectionMap[key] = _map(target, 'id');
    });
  });
}

function initMenuTree() {
  return new Promise((resolve, reject) => {
    const isEmpty = _isEmpty(allPermissionMap);
    if (!isEmpty) {
      resolve(allPermissionMap);
      return;
    }
    withLoading(apiGetMenuTree)()
      .then((res) => {
        const { data } = res || {};
        menuTreeData.value = permissionRecursionFn(data || []);
        const result = extractMenuGroupValue();
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function permissionRecursionFn(data: MenuTreeItemType[] = []) {
  const mapData = BiMapConversion(data, $rolePermissionItemMap);
  return _map(mapData, (item) => {
    const { children } = item;
    if (children) {
      item.children = permissionRecursionFn(children);
    }
    return item;
  });
}

function extractMenuGroupValue() {
  const result: Record<string, string[]> = {};
  _forEach(menuTreeData.value, (item) => {
    const { id, children } = item;
    const flattenChildren = _flattenDeep(children);
    const ids = _map(flattenChildren, 'id');
    allPermissionMap[id] = ids;
    defaultSelectionMap[id] = [];
    selectionMap[id] = [];
    result[id] = ids;
  });
  return result;
}

function selectionChange(id: string, selection: string[]) {
  selectionMap[id] = _cloneDeep(selection);
}

function handleSavaRolePermission() {
  if (!activeId.value) return;
  const values = _values(selectionMap);
  const flattenValues = _flattenDeep(values);
  withLoading(apiSaveRoleMenu)({
    roleId: activeId.value, // 角色ID
    menuIds: flattenValues, // 权限ID合集
    clientType: 0
  }).then((res) => {
    ElMessage.success(res.msg || '保存成功');
  });
}
</script>

<script lang="ts">
export default {
  name: 'PermissionList'
};
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
  overflow: hidden;

  .header-box {
    display: flex;
    flex-basis: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 10px;

    .actions {
      .el-button {
        margin-left: 30px;
      }
    }
  }

  .list-box {
    flex: 1;
    padding: 0 20px;
    overflow-y: auto;
  }
}
</style>
