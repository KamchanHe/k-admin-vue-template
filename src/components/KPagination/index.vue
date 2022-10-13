<template>
  <div class="k-pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout.join(',')"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { scrollTo } from '@/utils/scroll-to';

interface Props {
  total?: number;
  page?: number;
  limit?: number;
  pageSizes?: number[];
  layout?: (
    | 'sizes'
    | 'prev'
    | 'pager'
    | 'next'
    | 'jumper'
    | '->'
    | 'total'
    | 'slot'
  )[];
  background?: boolean;
  autoScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  page: 1,
  limit: 1,
  pageSizes: () => [10, 20, 30, 40, 50, 100],
  layout: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
  background: true,
  autoScroll: false
});

const emits = defineEmits(['update:page', 'update:limit', 'pagination']);

const currentPage = computed<number | undefined>({
  get: () => props.page,
  set: (value) => {
    emits('update:page', value);
  }
});

const pageSize = computed<number | undefined>({
  get() {
    return props.limit;
  },
  set(val) {
    emits('update:limit', val);
  }
});

function sizeChange(val: number) {
  emits('pagination', { page: currentPage, limit: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}

function currentChange(val: number) {
  currentPage.value = val;
  emits('pagination', { page: val, limit: props.limit });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style lang="scss" scoped>
.k-pagination-container {
  padding: 24px 12px;
  background: #fff;
}
</style>
