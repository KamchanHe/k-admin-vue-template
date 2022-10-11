<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useTagsViewStore } from '@/store';

const tagAndTagSpacing = ref(4);
const emits = defineEmits(['scroll']);
const emitScroll = () => {
  emits('scroll');
};

const tagsViewStore = useTagsViewStore();

const visitedViews = computed(() => tagsViewStore.visitedViews);

const scrollContainer = ref();
const scrollWrapper = computed(() => scrollContainer.value.$refs.wrap$);

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true);
});
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll);
});

function handleScroll(event: WheelEvent) {
  const eventDelta = -event.deltaY || -event.deltaY * 40;
  scrollWrapper.value.scrollLeft += eventDelta / 4;
}

function moveToTarget(currentTag = {}) {
  const $container = scrollContainer.value.$el;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = scrollWrapper.value;
  const tagListDom = document.querySelectorAll(
    '.tags-view-item'
  ) as NodeListOf<HTMLElement>;

  let firstTag = null;
  let lastTag = null;

  // find first tag and last tag
  if (visitedViews.value.length > 0) {
    [firstTag] = visitedViews.value;
    lastTag = visitedViews.value[visitedViews.value.length - 1];
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    const currentIndex = visitedViews.value.findIndex(
      (item) => item === currentTag
    );
    let prevTag = tagListDom[currentIndex - 1];
    let nextTag = tagListDom[currentIndex + 1];
    tagListDom.forEach((item) => {
      if (item.dataset.path === visitedViews.value[currentIndex - 1].path) {
        prevTag = item;
      }
      if (item.dataset.path === visitedViews.value[currentIndex + 1].path) {
        nextTag = item;
      }
    });

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value;

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value;
    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
}

defineExpose({
  moveToTarget
});
</script>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  .el-scrollbar__bar {
    bottom: 0;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>
