import type { SettingsState } from '@/types/store/settings';
import { defineStore } from 'pinia';
import { localGet, localSet } from '@/utils/storage';
import { changeTheme } from '@/utils/theme';
import variables from '@/style/variables.module.scss';
import defaultSettings from '../../settings';

const {
  theme,
  tagsView,
  fixedHeader,
  sidebarLogo,
  breadCrumb,
  navigationType,
  sizeSelect
}: SettingsState = localGet('local-settings') || defaultSettings;
const { showSettings } = defaultSettings;

if (theme) {
  changeTheme(theme);
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: (): SettingsState => ({
    theme: theme || variables.theme,
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    breadCrumb,
    navigationType,
    sizeSelect
  }),
  actions: {
    changeSetting(params: {
      key: keyof SettingsState;
      value: SettingsState[keyof SettingsState];
    }) {
      const { key, value } = params;
      const kThis: Record<
        keyof SettingsState,
        SettingsState[keyof SettingsState]
      > = this;
      kThis[key] = value;
      localSet('local-settings', {
        theme: this.theme,
        showSettings: this.showSettings,
        tagsView: this.tagsView,
        fixedHeader: this.fixedHeader,
        sidebarLogo: this.sidebarLogo,
        breadCrumb: this.breadCrumb,
        navigationType: this.navigationType,
        sizeSelect: this.sizeSelect
      });
    }
  }
});

export default useSettingsStore;
