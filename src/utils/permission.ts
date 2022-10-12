import type { RolesType } from '@/types/store/user';
import { useUserStore } from '@/store';

/**
 * @param {Array} value
 * @return {Boolean}
 */
export default function checkPermission(value: RolesType) {
  if (value.length > 0) {
    const userStore = useUserStore();
    const { roles } = userStore;
    const permissionRoles = value;

    return roles.some((role) => {
      return permissionRoles.includes(role);
    });
  }
  console.error('need roles! Like ["admin","editor"]');
  return false;
}
