<template>
  <div
    v-if="isExternalIcon"
    class="icon svg-icon"
    :style="externalIconStyle"
  ></div>
  <svg v-else aria-hidden="true" class="icon svg-icon">
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils';

interface Props {
  name: string;
}

const props = withDefaults(defineProps<Props>(), {});
const isExternalIcon = computed(() => isExternal(props.name));
const externalIconStyle = computed(() => {
  return {
    mask: `url(${props.name}) no-repeat 50% 50%`,
    'mask-size': 'cover',
    '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
    '-webkit-mask-size': 'cover',
    'background-color': 'currentColor'
  };
});
const symbolId = computed(() => `#${props.name}`);
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
