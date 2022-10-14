<template>
  <el-dialog
    class="k-dialog"
    v-model="dialogVisible"
    :title="title"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    v-bind="$attrs"
    :style="{
      '--width': width,
      '--min-width': minWidth,
      '--max-width': maxWidth,
      '--height': height,
      '--min-height': minHeight,
      '--max-height': maxHeight
    }"
  >
    <slot />
    <template v-if="showAction && (!hideCancel || !hideConfirm)" #footer>
      <slot name="footer">
        <el-button v-show="!hideCancel" @click="cancel">取 消</el-button>
        <el-button v-show="!hideConfirm" type="primary" @click="confirm">
          确 定
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { isFunction as _isFunction } from 'lodash-es';

type CommonFunctionType = () => void;

interface Props {
  modelValue: boolean;
  title?: string;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  destroyOnClose?: boolean;
  appendToBody?: boolean;
  showAction?: boolean;
  hideCancel?: boolean;
  cancelText?: string;
  hideConfirm?: boolean;
  confirmText?: string;
  onCancel?: CommonFunctionType;
  onConfirm?: CommonFunctionType;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  closeOnClickModal: false,
  closeOnPressEscape: false,
  destroyOnClose: true,
  appendToBody: false,
  showAction: true,
  hideCancel: false,
  cancelText: '取消',
  hideConfirm: false,
  confirmText: '确认',
  width: '50%',
  minWidth: 'auto',
  maxWidth: 'auto',
  height: '50%',
  minHeight: 'auto',
  maxHeight: 'auto'
});

const emits = defineEmits(['cancel', 'confirm', 'update:modelValue']);

const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  }
});

function done() {
  dialogVisible.value = false;
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

function confirm() {
  const { onConfirm } = props;
  const isFunction = _isFunction(onConfirm);
  if (isFunction) {
    onConfirm({ done });
  } else {
    emits('confirm');
    done();
  }
}
</script>
<script lang="ts">
export default {
  name: 'KDialog'
};
</script>

<style lang="scss">
.k-dialog.el-dialog {
  display: flex;
  flex-direction: column;
  width: var(--width) !important;
  min-width: var(--min-width) !important;
  max-width: var(--max-width) !important;
  height: var(--height) !important;
  min-height: var(--min-height) !important;
  max-height: var(--max-height) !important;
  margin: 50px auto 0 !important;
  overflow: hidden;
  border-radius: 5px;

  .el-dialog__body {
    flex: 1;
    padding-top: 20px;
    overflow: hidden;
  }
}
</style>
