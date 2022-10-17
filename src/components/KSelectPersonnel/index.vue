<template>
  <KDialog
    v-model="visible"
    title="选择人员"
    :showAction="false"
    height="80%"
    width="80%"
    max-width="1280px"
  >
    <Single
      v-if="selectType === 'single'"
      :departmentSelectType="departmentSelectType"
      @confirm="confirm"
    ></Single>
    <Multiple
      v-else-if="selectType === 'multiple'"
      :departmentSelectType="departmentSelectType"
      :defaultSelection="multipleDefaultSelection"
      @cancel="cancel"
      @confirm="confirm"
    ></Multiple>
  </KDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isFunction as _isFunction } from 'lodash-es';
import type { SelectDepartmentTreeItemType } from '@/types/api/organization-select';
import KDialog from '@/components/KDialog/index.vue';
import Single from './Single.vue';
import Multiple from './Multiple.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  selectType: {
    type: String,
    default: 'multiple'
  },
  departmentSelectType: {
    type: String,
    default: 'single'
  },
  onConfirm: {
    type: Function
  },
  onCancel: {
    type: Function
  }
});

const emits = defineEmits(['confirm', 'cancel']);

const visible = ref(false);

const multipleDefaultSelection = ref<SelectDepartmentTreeItemType[]>([]);

interface MixinDataType {
  defaultSelection: SelectDepartmentTreeItemType[];
}
function open(mixinData: MixinDataType) {
  const { defaultSelection } = mixinData || {};
  multipleDefaultSelection.value = defaultSelection;
  visible.value = true;
}

function done() {
  visible.value = false;
}

function cancel() {
  const isFunction = _isFunction(props.onCancel);
  if (isFunction) {
    props.onCancel({ done });
  } else {
    emits('cancel');
    done();
  }
}

function confirm(
  selection: SelectDepartmentTreeItemType | SelectDepartmentTreeItemType[]
) {
  const isFunction = _isFunction(props.onConfirm);
  if (isFunction) {
    props.onConfirm({ done, selection });
  } else {
    emits('confirm', selection);
    done();
  }
}

defineExpose({
  open
});
</script>

<script lang="ts">
export default {
  name: 'SelectPersonnel'
};
</script>
