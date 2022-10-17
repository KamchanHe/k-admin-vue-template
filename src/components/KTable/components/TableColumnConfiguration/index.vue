<template>
  <KDialog
    v-model="visible"
    :title="title"
    :show-action="false"
    height="80%"
    width="80%"
    max-width="1280px"
  >
    <DialogContent
      ref="DialogContentRef"
      @cancel="cancel"
      @confirm="confirm"
    ></DialogContent>
  </KDialog>
</template>

<script setup lang="ts">
import KDialog from '@/components/KDialog/index.vue';
import type { TableHeaderType } from '@/types/constant/table-header';
import DialogContent from './DialogContent.vue';
import type { MixinDataType as ContentMixinType } from './DialogContent.vue';

export interface MixinDataType extends ContentMixinType {
  title?: string;
}

const emits = defineEmits(['cancel', 'confirm']);

const visible = ref(false);
const title = ref('表头配置');

const DialogContentRef = ref<InstanceType<typeof DialogContent>>();

function open(data: MixinDataType) {
  const { title: targetTitle } = data || {};
  title.value = targetTitle || '表头配置';
  visible.value = true;
  nextTick(() => {
    DialogContentRef.value?.handleMixin(data);
  });
}

function done() {
  visible.value = false;
}

function cancel() {
  emits('cancel');
  done();
}

function confirm(data: TableHeaderType[]) {
  emits('confirm', data);
  done();
}

defineExpose({
  open,
  done
});
</script>
<script lang="ts">
export default {
  name: 'TableColumnConfiguration'
};
</script>
