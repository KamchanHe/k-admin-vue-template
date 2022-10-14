import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import { isEmpty as _isEmpty } from 'lodash-es';
import router from '@/router';
import {
  useUserStore,
  usePermissionStore,
  useOrganizationStore
} from '@/store';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const organizationStore = useOrganizationStore();
  const userStore = useUserStore();

  const { tenantList } = organizationStore;
  const hasTenantList = !_isEmpty(tenantList);
  if (!hasTenantList) {
    const tenantListResponse = await organizationStore.getTenantList();
    if (_isEmpty(tenantListResponse)) {
      await userStore.resetToken();
      ElMessage.error('Missing TenantList!');
      next(`/login?redirect=${to.path}`);
      return;
    }
  }

  const { tenant } = organizationStore;
  if (!tenant && to.path !== '/login') {
    await userStore.resetToken();
    ElMessage.error('Missing Tenant!Please Select Tenant First!');
    next(`/login?redirect=${to.path}`);
    return;
  }

  const { token } = userStore;
  const pass = whiteList.indexOf(to.path) > -1;
  // 未登录 && 白名单
  if (!token && pass) {
    next();
    return;
  }
  // 未登录
  if (!token) {
    next(`/login?redirect=${to.path}`);
    return;
  }
  // 已登陆 如果去登陆页则重定向回首页
  if (to.path === '/login') {
    next({ path: '/', replace: true });
    return;
  }
  const { roles } = userStore;
  const hasRoles = !_isEmpty(roles);
  // 有权限
  if (hasRoles) {
    next();
    return;
  }
  try {
    const userInfo = await userStore.getUserInfo();
    const { roles: responseRoles } = userInfo;
    const permissionStore = usePermissionStore();
    const accessRoutes = await permissionStore.generateRoutes(responseRoles);
    accessRoutes.forEach((route) => {
      router.addRoute(route);
    });
    next({ ...to, replace: true });
  } catch (error) {
    // 移除 token 并跳转登录页
    await userStore.resetToken();
    const errorString: string = error ? String(error) : 'Has Error';
    ElMessage.error(errorString);
    next(`/login?redirect=${to.path}`);
  }
});

router.afterEach(() => {
  NProgress.done();
});
