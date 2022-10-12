import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupThrottleClickDirective } from './throttle-click';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupThrottleClickDirective(app);
}

export default {};
