import type { App, Directive, DirectiveBinding } from 'vue';

interface ElState extends HTMLElement {
  disabled: boolean;
}

function addThrottle(el: ElState, binding: DirectiveBinding) {
  const { value } = binding;
  const delay = value || 2000;
  el.onclick = () => {
    el.classList.add('is-disabled');
    el.disabled = true;
    setTimeout(() => {
      el.disabled = false;
      el.classList.remove('is-disabled');
    }, delay);
  };
}

const mounted = (el: ElState, binding: DirectiveBinding) => {
  addThrottle(el, binding);
};

const throttleClickDirective: Directive = {
  mounted
};

export function setupThrottleClickDirective(app: App) {
  app.directive('throttle-click', throttleClickDirective);
}

export default throttleClickDirective;
