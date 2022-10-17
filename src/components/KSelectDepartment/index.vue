<template>
  <KDialog
    v-model="visible"
    :title="title"
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

export interface MixinDataType {
  title?: string;
  defaultSelection?: SelectDepartmentTreeItemType[];
}
export interface OnConfirmParamType {
  done: () => void;
  selection: SelectDepartmentTreeItemType | SelectDepartmentTreeItemType[];
}
export interface OnCancelParamType {
  done: () => void;
}
export type OnConfirmType = ({ done, selection }: OnConfirmParamType) => void;
export type OnCancelType = ({ done }: OnCancelParamType) => void;

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
const title = ref('选择部门');

const multipleDefaultSelection = ref<SelectDepartmentTreeItemType[]>([]);

function open(mixinData: MixinDataType) {
  const { title: targetTitle, defaultSelection } = mixinData || {};
  title.value = targetTitle || '选择部门';
  multipleDefaultSelection.value = defaultSelection || [];
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
  name: 'KSelectDepartment'
};
</script>
