import type { AppState } from '@/types/store/app';
import { localGet, localSet } from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    device: 'desktop',
    sidebar: {
      opened: !!localGet('sidebarStatus') || true,
      withoutAnimation: false
    },
    size: localGet('size') || 'default'
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localSet('sidebarStatus', 1);
      } else {
        localSet('sidebarStatus', 0);
      }
    },
    closeSideBar(withoutAnimation: boolean) {
      localSet('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    openSideBar(withoutAnimation: boolean) {
      localSet('sidebarStatus', 1);
      this.sidebar.opened = true;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      localSet('size', size);
    }
  }
});

export default useAppStore;
