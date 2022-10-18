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
import type { SelectPersonnelListItemType } from '@/types/api/organization-select';
import KDialog from '@/components/KDialog/index.vue';
import Single from './Single.vue';
import Multiple from './Multiple.vue';

export interface MixinDataType {
  title?: string;
  defaultSelection?: SelectPersonnelListItemType[];
}
export type ConfirmParamType =
  | SelectPersonnelListItemType
  | SelectPersonnelListItemType[];

export interface OnConfirmParamType {
  selection: ConfirmParamType;
  done: () => void;
}
export interface OnCancelParamType {
  done: () => void;
}
export type OnConfirmType = ({ done, selection }: OnConfirmParamType) => void;
export type OnCancelType = ({ done }: OnCancelParamType) => void;

interface Props {
  selectType?: 'single' | 'multiple';
  departmentSelectType?: 'single' | 'multiple';
  onConfirm?: OnConfirmType;
  onCancel?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  selectType: 'multiple',
  departmentSelectType: 'single'
});

const emits = defineEmits(['confirm', 'cancel']);

const visible = ref(false);
const title = ref('选择人员');

const multipleDefaultSelection = ref<SelectPersonnelListItemType[]>([]);

function open(mixinData: MixinDataType) {
  const { title: targetTitle, defaultSelection } = mixinData || {};
  title.value = targetTitle || '选择人员';
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

function confirm(selection: ConfirmParamType) {
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
