import useUserStore from './modules/user';
import usePermissionStore from './modules/permission';
import useAppStore from './modules/app';
import useSettingStore from './modules/settings';
import useTagsViewStore from './modules/tagsView';

export {
  useUserStore,
  usePermissionStore,
  useAppStore,
  useSettingStore,
  useTagsViewStore
};

const useStore = () => ({
  userStore: useUserStore,
  permissionStore: usePermissionStore,
  appStore: useAppStore,
  settingsStore: useSettingStore,
  tagsViewStore: useTagsViewStore
});

export default useStore;
