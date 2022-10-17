<template>
  <div
    class="k-department-tree"
    :style="{
      '--width': width,
      '--min-width': minWidth,
      '--max-width': maxWidth
    }"
  >
    <div class="header">
      <div class="search">
        <el-input
          v-model="treeFilterKeyword"
          clearable
          placeholder="输入部门名称/编码"
        ></el-input>
      </div>
      <div class="option" v-if="departmentSelectType === 'multiple'">
        <el-radio-group v-model="defaultTreeCheckStrictly">
          <el-radio-button :label="true">
            <k-icon name="local-icon-fa-link-slash-solid"></k-icon>
          </el-radio-button>
          <el-radio-button :label="false">
            <k-icon name="local-icon-fa-link-solid"></k-icon>
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="tree">
      <el-tree
        ref="DepartmentTreeRef"
        :data="departmentTreeData"
        :node-key="nodeKey"
        :show-checkbox="departmentSelectType === 'multiple'"
        :default-expand-all="defaultExpandAll"
        highlight-current
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="defaultTreeCheckStrictly"
        :filter-node-method="
          defaultDepartmentTreeFilterNode || defaultDepartmentTreeFilterNode
        "
        :props="treeProps"
        @check="departmentTreeCheck"
        @node-click="departmentTreeNodeClick"
      >
        <template #default="{ node, data }">
          <span>{{ node.label }}</span>
          <span>({{ data.departmentCode }})</span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { withLoading } from '@/utils/with-loading';
import { getSelectDepartmentTree as apiGetDepartmentTree } from '@/api/organization-select';
import { $selectDepartmentItemMap } from '@/constant/bi-map/organization-select';
import type { SelectDepartmentTreeItemType } from '@/types/api/organization-select';
import type {
  CheckedDataType,
  TreeNodeDataType
} from '@/types/element-plus/el-tree';
import { BiMapConversion } from '@/utils/bi-map';
import { map as _map } from 'lodash-es';

const props = defineProps({
  nodeKey: {
    type: String,
    default: 'id'
  },
  defaultExpandAll: {
    type: Boolean,
    default: true
  },
  expandOnClickNode: {
    type: Boolean,
    default: false
  },
  checkOnClickNode: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '30%'
  },
  minWidth: {
    type: String,
    default: '230px'
  },
  maxWidth: {
    type: String,
    default: 'auto'
  },
  departmentSelectType: {
    type: String,
    default: 'multiple'
  },
  treeCheckStrictly: {
    type: Boolean,
    default: true
  },
  departmentTreeFilterNode: {
    type: Function
  }
});

const emits = defineEmits(['treeCheck', 'treeNodeClick', 'selectionChange']);

const departmentTreeData = ref<SelectDepartmentTreeItemType[]>([]);
const defaultTreeCheckStrictly = ref(props.treeCheckStrictly);
const treeFilterKeyword = ref('');
const treeProps = {
  children: 'children',
  label: 'departmentName'
};
const departmentSelection = ref<SelectDepartmentTreeItemType[]>([]);
const DepartmentTreeRef = ref();

watch(treeFilterKeyword, (val) => {
  DepartmentTreeRef.value.filter(val);
});

onMounted(() => {
  handleGetDepartmentTree();
});

function handleGetDepartmentTree() {
  withLoading(apiGetDepartmentTree, {
    target: '.k-department-tree'
  })().then((res) => {
    const { data } = res;
    departmentTreeData.value = recursionConversion(
      data || [],
      $selectDepartmentItemMap
    );
  });
}

function recursionConversion(
  data: SelectDepartmentTreeItemType[] = [],
  map = $selectDepartmentItemMap
) {
  const conversionData = BiMapConversion(data || [], map);
  return _map(conversionData, (item) => {
    const { children } = item;
    if (children) {
      item.children = recursionConversion(children, map);
    }
    return item;
  });
}

function defaultDepartmentTreeFilterNode(
  value: string,
  data: SelectDepartmentTreeItemType
) {
  if (!value) return true;
  return (
    data.departmentName.indexOf(value) !== -1 ||
    data.departmentCode.indexOf(value) !== -1
  );
}

function departmentTreeCheck(
  target: SelectDepartmentTreeItemType,
  checkedData: CheckedDataType<SelectDepartmentTreeItemType>
) {
  if (props.departmentSelectType === 'single') return;
  emits('treeCheck', target, checkedData);
  const { checkedNodes } = checkedData;
  departmentSelection.value = checkedNodes;
  emits('selectionChange', departmentSelection.value);
}

function departmentTreeNodeClick(
  target: SelectDepartmentTreeItemType,
  node: TreeNodeDataType
) {
  emits('treeNodeClick', target, node);
  if (props.departmentSelectType === 'multiple') return;
  departmentSelection.value = [target];
  emits('selectionChange', departmentSelection.value);
}

function updateKeyChildren(key: string, data: SelectDepartmentTreeItemType) {
  return DepartmentTreeRef?.value?.updateKeyChildren(key, data);
}

function getCheckedNodes(leafOnly: boolean, includeHalfChecked: boolean) {
  return DepartmentTreeRef?.value?.getCheckedNodes(
    leafOnly,
    includeHalfChecked
  );
}

function setCheckedNodes(nodes: SelectDepartmentTreeItemType) {
  return DepartmentTreeRef?.value?.setCheckedNodes(nodes);
}

function getCheckedKeys(leafOnly: boolean) {
  return DepartmentTreeRef?.value?.getCheckedKeys(leafOnly);
}

function setCheckedKeys(keys: string[], leafOnly: boolean) {
  return DepartmentTreeRef?.value?.setCheckedKeys(keys, leafOnly);
}

function setChecked(
  target: SelectDepartmentTreeItemType,
  checked: boolean,
  deep = !props.treeCheckStrictly
) {
  return DepartmentTreeRef?.value?.setChecked(target, checked, deep);
}

defineExpose({
  DepartmentTreeRef,
  updateKeyChildren,
  getCheckedNodes,
  setCheckedNodes,
  getCheckedKeys,
  setCheckedKeys,
  setChecked
});
</script>

<script lang="ts">
export default {
  name: 'KDepartmentTree'
};
</script>

<style scoped lang="scss">
.k-department-tree {
  display: flex;
  flex-direction: column;
  width: var(--width);
  min-width: var(--min-width);
  max-width: var(--max-width);
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    .search {
      display: flex;
      flex: 1;
      align-items: center;
    }

    .option {
      margin-left: 10px;
    }
  }

  .tree {
    flex: 1;
    overflow: auto;

    :deep(.el-tree) {
      > .el-tree-node {
        display: inline-block;
        min-width: 100%;
        white-space: nowrap;
      }
    }
  }
}
</style>
