import type { App } from 'vue';
import KIcon from '@/components/KIcon/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { replaceHumpToLine } from '@/utils';

export function registerElementPlusIcons(app: App) {
  const items = Object.entries(ElementPlusIconsVue);
  items.forEach((item) => {
    const [name, component] = item;
    const named = replaceHumpToLine(name);
    app.component(`el-icon-${named}`, component);
  });
}

export function registerIcons(app: App) {
  app.component('k-icon', KIcon);
  registerElementPlusIcons(app);
}

export default {};
