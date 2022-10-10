import type { SettingsState } from '@/types/store/settings';
import SidebarLogo from '@/assets/images/sidebarLogo.png';

interface SettingsType extends SettingsState {
  title: string;
  logo: string;
  errorLog: string | string[];
}

const defaultSettings: SettingsType = {
  title: 'K Admin Vue',
  logo: SidebarLogo,
  theme: '#409eff',
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  breadCrumb: true,
  navigationType: 'left', // left/top/mix
  sizeSelect: true,
  errorLog: ['development']
};

export default defaultSettings;
