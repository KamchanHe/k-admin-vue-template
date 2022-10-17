<template>
  <KDialog v-model="visible" :title="title" :show-action="false">
    <DialogContent
      ref="DialogContentRef"
      @confirm="confirm"
      @cancel="cancel"
    ></DialogContent>
  </KDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KDialog from '@/components/KDialog/index.vue';
import DialogContent from './DialogContent.vue';
import type { MixinDataType as ContentMixinType } from './DialogContent.vue';

export interface MixinDataType extends ContentMixinType {
  title?: string;
}

const emits = defineEmits(['confirm']);
const visible = ref(false);
const title = ref('');
const DialogContentRef = ref<InstanceType<typeof DialogContent>>();

function open(mixinData: MixinDataType) {
  const { title: targetTitle = '编辑角色' } = mixinData || {};
  title.value = targetTitle;
  visible.value = true;
  nextTick(() => {
    DialogContentRef.value?.handleMixin(mixinData);
  });
}

function close() {
  visible.value = false;
}

function confirm(formData = {}) {
  emits('confirm');
}

function cancel() {
  close();
}

defineExpose({
  open,
  close
});
</script>

<script lang="ts">
export default {
  name: 'EditRoleDialog'
};
</script>
