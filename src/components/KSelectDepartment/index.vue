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
export type ConfirmParamType<T = 'multiple'> = T extends 'single'
  ? SelectDepartmentTreeItemType
  : T extends 'multiple'
  ? SelectDepartmentTreeItemType[]
  : SelectDepartmentTreeItemType | SelectDepartmentTreeItemType[];

export interface BeforeConfirmParamType<T = 'multiple'> {
  selection?: ConfirmParamType<T>;
  done: () => void;
}
export interface BeforeCancelParamType<T = 'multiple'> {
  done: () => void;
}
export type BeforeConfirmType<T = 'multiple'> = ({
  selection,
  done
}: BeforeConfirmParamType<T>) => void;
export type BeforeCancelType<T = 'multiple'> = (
  params: BeforeCancelParamType<T>
) => void;

interface Props {
  selectType?: 'single' | 'multiple';
  beforeConfirm?: BeforeConfirmType;
  beforeCancel?: BeforeCancelType;
}
const props = withDefaults(defineProps<Props>(), {
  selectType: 'multiple'
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
  const isFunction = _isFunction(props.beforeCancel);
  if (isFunction) {
    props.beforeCancel({ done });
  } else {
    emits('cancel');
    done();
  }
}

function confirm(selection: ConfirmParamType) {
  const isFunction = _isFunction(props.beforeConfirm);
  if (isFunction) {
    props.beforeConfirm({ done, selection });
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
