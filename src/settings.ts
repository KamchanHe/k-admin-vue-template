import SidebarLogo from '@/assets/images/sidebarLogo.png';

interface DefaultSettings {
  title: string;
  logo: string;
  theme: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  breadCrumb: boolean;
  navigationType: string;
  sizeSelect: boolean;
  errorLog: string | string[];
}

const defaultSettings: DefaultSettings = {
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
