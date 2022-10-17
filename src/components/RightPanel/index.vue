<template>
  <div ref="rightPanel" :class="{ show: show }">
    <div class="right-panel-background" />
    <div class="right-panel">
      <div
        class="right-panel-button"
        :style="{ top: buttonTop + 'px', 'background-color': theme }"
        @click="show = !show"
      >
        <k-icon name="el-icon-close" v-show="show"></k-icon>
        <k-icon name="el-icon-setting" v-show="!show"></k-icon>
      </div>
      <div class="right-panel__items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addClass, removeClass } from '@/utils';
import { useSettingsStore } from '@/store';

defineProps({
  buttonTop: {
    default: 250,
    type: Number
  }
});

const settingsStore = useSettingsStore();
const theme = computed(() => settingsStore.theme);
const show = ref(false);

watch(show, (value) => {
  if (value) {
    addEventClick();
  }
  if (value) {
    addClass(document.body, 'show-right-panel');
  } else {
    removeClass(document.body, 'show-right-panel');
  }
});

function addEventClick() {
  window.addEventListener('click', closeSidebar, { passive: true });
}

function closeSidebar(evt: Event) {
  // 主题选择点击不关闭
  const target = evt.target as HTMLElement;
  let parent = target.closest('.theme-picker-dropdown');
  if (parent) {
    return;
  }

  parent = target.closest('.right-panel');
  if (!parent) {
    show.value = false;
    window.removeEventListener('click', closeSidebar);
  }
}

const rightPanel = ref<HTMLDivElement>();

function insertToBody() {
  const elx = rightPanel.value as Node;
  const body = document.querySelector('body') as HTMLElement;
  body.insertBefore(elx, body.firstChild);
}

onMounted(() => {
  insertToBody();
});

onBeforeUnmount(() => {
  const elx = rightPanel.value;
  elx?.remove();
});
</script>

<script lang="ts">
export default {
  name: 'RightPanel'
};
</script>

<style>
.show-right-panel {
  position: relative;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.right-panel-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgb(0 0 0 / 20%);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.right-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 199;
  width: 100%;
  max-width: 300px;
  height: 100vh;
  background: #fff;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 5%);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .right-panel-background {
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  .right-panel {
    transform: translate(0);
  }
}

.right-panel-button {
  position: absolute;
  left: -48px;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  pointer-events: auto;
  cursor: pointer;
  border-radius: 6px 0 0 6px !important;
}
</style>
