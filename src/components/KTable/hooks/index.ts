import type { Ref } from 'vue';

export function useKeepScroll(element: Ref) {
  let listenedEl: HTMLElement | null = null;
  let scrollTop = 0;
  let scrollLeft = 0;

  /* 保存滚动条位置 */
  function save() {
    if (!listenedEl) return;
    scrollTop = listenedEl.scrollTop;
    scrollLeft = listenedEl.scrollLeft;
  }

  /* 恢复滚动条位置 */
  function restore() {
    if (!listenedEl) return;

    listenedEl.scrollTop = scrollTop;
    listenedEl.scrollLeft = scrollLeft;
  }

  /* 在组件恢复时 恢复滚动条位置 */
  onActivated(restore);

  function removeEventListener() {
    listenedEl?.removeEventListener('scroll', save);
    listenedEl = null;
  }
  function addEventListener() {
    if (!element.value) return;
    if (listenedEl === element.value) return;
    removeEventListener();
    listenedEl = element.value;
    listenedEl?.addEventListener('scroll', save);
  }

  watch(element, addEventListener);
  onBeforeUnmount(removeEventListener);
}
export default {};
