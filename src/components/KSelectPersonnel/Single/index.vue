<template>
  <KDialog
    v-model="visible"
    :title="title"
    :showAction="false"
    height="80%"
    width="80%"
    max-width="1280px"
    :before-close="cancel"
  >
    <DialogContent
      :departmentSelectType="departmentSelectType"
      @confirm="confirm"
    ></DialogContent>
  </KDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isFunction as _isFunction } from 'lodash-es';
import type { SelectPersonnelListItemType } from '@/types/api/organization-select';
import KDialog from '@/components/KDialog/index.vue';
import DialogContent from './DialogContent.vue';

export interface MixinDataType {
  title?: string;
}
export type ConfirmParamType = SelectPersonnelListItemType;

export interface BeforeConfirmParamType {
  selection?: ConfirmParamType;
  done: () => void;
}
export interface BeforeCancelParamType {
  done: () => void;
}
export type BeforeConfirmType = (params: BeforeConfirmParamType) => void;
export type BeforeCancelType = (params: BeforeCancelParamType) => void;

interface Props {
  departmentSelectType?: 'single' | 'multiple';
  beforeConfirm?: BeforeConfirmType;
  beforeCancel?: BeforeCancelType;
}
const props = withDefaults(defineProps<Props>(), {
  departmentSelectType: 'single'
});

const emits = defineEmits(['confirm', 'cancel']);

const visible = ref(false);
const title = ref('选择单个人员');

function open(mixinData: MixinDataType) {
  const { title: targetTitle } = mixinData || {};
  title.value = targetTitle || '选择单个人员';
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
  name: 'KSelectPersonnelSingle'
};
</script>
