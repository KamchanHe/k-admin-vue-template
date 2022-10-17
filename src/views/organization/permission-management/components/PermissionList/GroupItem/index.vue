<template>
  <div class="group-item">
    <el-card shadow="hover">
      <div class="group-item-name">
        <el-checkbox
          :disabled="checkAllDisabled"
          :value="isCheckAll"
          :indeterminate="isIndeterminate"
          @change="checkAllChange"
        >
          <el-tag :disable-transitions="true" effect="plain">
            {{ item.permissionName }}
          </el-tag>
        </el-checkbox>
      </div>
      <div class="group-item-checkbox">
        <el-checkbox-group v-model="selection">
          <el-checkbox v-for="el in children" :key="el.id" :label="el.id">
            {{ el.permissionName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { isEmpty as _isEmpty } from 'lodash-es';

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        id: null,
        permissionName: null,
        children: []
      };
    }
  },
  allPermission: {
    type: Array,
    default: () => []
  },
  defaultSelection: {
    type: Array,
    default: () => []
  }
});

const children = computed(() => {
  const { item = {} } = props;
  const { children: targetChildren = [] } = item;
  return targetChildren;
});

const checkAllDisabled = computed(() => {
  return _isEmpty(children.value);
});

const emits = defineEmits(['selection-change']);

const selection = computed({
  get() {
    return props.defaultSelection;
  },
  set(value) {
    emits('selection-change', value);
    return value;
  }
});

const isIndeterminate = computed(() => {
  const isEmpty = _isEmpty(selection.value);
  return !isCheckAll.value && !isEmpty;
});

const isCheckAll = computed(() => {
  const isEmpty = _isEmpty(children.value);
  if (isEmpty) return false;
  const { allPermission = [] } = props;
  const total = allPermission.length;
  const selectionTotal = selection.value.length;
  return total === selectionTotal;
});

function checkAllChange(value: boolean) {
  const flag = isIndeterminate.value ? true : value;
  if (flag) {
    const { allPermission } = props;
    selection.value = [...allPermission];
  } else {
    selection.value = [];
  }
}
</script>
<script lang="ts">
export default {
  name: 'GroupItem'
};
</script>

<style lang="scss" scoped>
.group-item {
  margin: 15px 0;

  .group-item-name {
    :deep(.el-checkbox__label) {
      font-weight: bold;
    }
  }

  &-checkbox {
    margin-top: 20px;

    :deep(.el-checkbox) {
      width: 25%;
      margin-right: 0 !important;
      margin-bottom: 16px !important;
      margin-left: 0 !important;
    }
  }
}
</style>
