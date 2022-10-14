<template>
  <el-form
    class="k-header-search-form"
    id="k-header-search-component-el-form"
    ref="KHeaderSearchFormRef"
    :inline="true"
    :model="searchForm"
    :rules="searchFormRules"
    @keyup.enter="handleSearch"
  >
    <slot />
    <el-form-item>
      <el-badge :value="searchActiveCount">
        <el-button type="primary" @click="handleSearch">查找</el-button>
      </el-badge>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
    <slot name="action" />
    <el-form-item>
      <el-button
        @click="handleToggleFold"
        circle
        :icon="unfold ? 'el-icon-upload' : 'el-icon-download'"
      ></el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import {
  map as _map,
  forEach as _forEach,
  reduce as _reduce,
  head as _head,
  values as _values,
  filter as _filter
} from 'lodash-es';
import { useWindowSize } from '@vueuse/core';

interface Props {
  searchForm?: object;
  searchFormRules?: FormRules;
  actionCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  searchForm: () => ({}),
  searchFormRules: () => ({}),
  actionCount: 3
});
const emits = defineEmits(['handleSearch', 'handleReset']);

const unfold = ref(true);
const parentWidth = ref(0);
const widths = ref<number[]>([]);
const children = ref<NodeListOf<HTMLElement>>();
const KHeaderSearchFormRef = ref<FormInstance>();
const childrenMarginRight = ref(0);

watch(unfold, () => {
  handleToggleItem();
});
const { width: windowWidth } = useWindowSize();
watch(windowWidth, () => {
  handleRefreshParentWidth();
});

onMounted(() => {
  handleGetCalculateInfo();
});

const searchActiveCount = computed(() => {
  const values = _values(props.searchForm);
  const { length } = _filter(values, (item) => item);
  return length || '';
});

function getParentNode() {
  return document.querySelector('#k-header-search-component-el-form');
}

/**
 * 获取展开/收起操作所需的计算数据
 * @return {void}
 */
const handleGetCalculateInfo = () => {
  const parent = getParentNode();
  const childrenItems = parent?.querySelectorAll(
    '.el-form-item'
  ) as NodeListOf<HTMLElement>;
  const child = _head(childrenItems);
  let { marginRight } = child
    ? getComputedStyle(child)
    : { marginRight: '0px' };
  marginRight = marginRight.replace(/px|%/gi, '');
  childrenMarginRight.value = Number(marginRight);

  const diff = (childrenItems?.length || 0) - props.actionCount;
  let diffWidth = 0;
  widths.value = _map(childrenItems, (item, index) => {
    const width = item.clientWidth;
    if (index > diff - 1) {
      diffWidth += width;
    }
    return width + childrenMarginRight.value;
  });
  parentWidth.value = parent?.clientWidth || 0 - diffWidth;
  children.value = childrenItems;
};
/**
 * 刷新父盒子的宽度
 * @return {void}
 */
const handleRefreshParentWidth = () => {
  const parent = getParentNode();
  const diffWidth = _reduce(
    widths.value.slice(-props.actionCount),
    (total, n) => {
      return total + n;
    },
    0
  );
  parentWidth.value = diffWidth - 1;
  parentWidth.value = (parent?.clientWidth || 0) - diffWidth;
  handleToggleItem();
};
/**
 * 切换展开/收起
 * @return {void}
 */
const handleToggleFold = () => {
  unfold.value = !unfold.value;
};
/**
 * 搜索项操作
 * @return {void}
 */
const handleToggleItem = () => {
  const targets = Array.from(children.value || []).slice(0, -props.actionCount);
  if (unfold.value) {
    _forEach(targets, (item) => {
      item.style.display = 'inline-flex';
    });
    return;
  }
  let total = 0;
  for (let index = 0; index < targets.length; index += 1) {
    const element = targets[index];
    const width = widths.value[index];
    total += width;
    if (total > parentWidth.value) {
      element.style.display = 'none';
    } else {
      element.style.display = 'inline-flex';
    }
  }
};
/**
 * 点击查找按钮
 * @return {void}
 */
const handleSearch = () => {
  KHeaderSearchFormRef.value?.validate((valid) => {
    if (valid) {
      emits('handleSearch', { ...props.searchForm });
    }
  });
};
/**
 * 重置表单
 * @return {void}
 */
const handleReset = () => {
  KHeaderSearchFormRef.value?.resetFields();
  emits('handleReset');
};
</script>
<script lang="ts">
export default {
  name: 'KHeaderSearch'
};
</script>

<style lang="scss">
.k-header-search-form.el-form--inline .el-form-item {
  margin-right: 10px;
}
</style>
