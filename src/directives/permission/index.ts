import { App, Directive, DirectiveBinding, nextTick } from 'vue';

import useStore from '@/store';

function checkPermission(el: Element, binding: DirectiveBinding) {
  const { value } = binding;
  const { user } = useStore();
  const { roles } = user;

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });
      if (!hasPermission) {
        nextTick(() => {
          el.parentNode?.removeChild(el);
        });
      }
    }
  } else {
    throw new Error('need roles! Like v-permission="["admin","editor"]"');
  }
}

const mounted = (el: Element, binding: DirectiveBinding) => {
  checkPermission(el, binding);
};
const updated = (el: Element, binding: DirectiveBinding) => {
  checkPermission(el, binding);
};

const permissionDirective: Directive = {
  mounted,
  updated
};

export function setupPermissionDirective(app: App) {
  app.directive('permission', permissionDirective);
}

export default permissionDirective;
