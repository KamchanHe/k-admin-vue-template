<template>
  <KDialog
    v-model="visible"
    title="选择部门"
    :showAction="false"
    height="80%"
    width="80%"
    max-width="1280px"
  >
    <SingleSelect
      v-if="selectType === 'single'"
      @confirm="confirm"
    ></SingleSelect>
    <MultipleSelect
      v-else-if="selectType === 'multiple'"
      :defaultSelection="multipleDefaultSelection"
      @cancel="cancel"
      @confirm="confirm"
    ></MultipleSelect>
  </KDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isFunction as _isFunction } from 'lodash-es';
import KDialog from '@/components/KDialog/index.vue';
import type { SelectDepartmentTreeItemType } from '@/types/api/organization-select';
import SingleSelect from './Single.vue';
import MultipleSelect from './Multiple.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  selectType: {
    type: String,
    default: 'multiple'
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
  const { onCancel } = props;
  const isFunction = _isFunction(onCancel);
  if (isFunction) {
    onCancel({ done });
  } else {
    emits('cancel');
    done();
  }
}

function confirm(
  selection: SelectDepartmentTreeItemType | SelectDepartmentTreeItemType[]
) {
  const { onConfirm } = props;
  const isFunction = _isFunction(onConfirm);
  if (isFunction) {
    onConfirm({ done, selection });
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
  name: 'KSelectDepartment'
};
</script>
