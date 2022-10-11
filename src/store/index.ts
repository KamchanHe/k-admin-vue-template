// eslint-disable-next-line import/no-named-as-default
import useSettingsStore from './modules/settings';
import useUserStore from './modules/user';
import usePermissionStore from './modules/permission';
import useAppStore from './modules/app';
import useTagsViewStore from './modules/tagsView';

export {
  useUserStore,
  usePermissionStore,
  useAppStore,
  useSettingsStore,
  useTagsViewStore
};

const useStore = () => ({
  userStore: useUserStore,
  permissionStore: usePermissionStore,
  appStore: useAppStore,
  settingsStore: useSettingsStore,
  tagsViewStore: useTagsViewStore
});

export default useStore;
