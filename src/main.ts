import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import { registerIcons } from '@/utils/icon';
import { setupGlobDirectives } from '@/directives';
import App from './App.vue';
import '@/permission';

import 'normalize.css/normalize.css';
import '@/style/index.scss';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/display.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

import 'virtual:svg-icons-register';

const app = createApp(App);
registerIcons(app);
const pinia = createPinia();
app.use(pinia);
app.use(router);
setupGlobDirectives(app);
app.mount('#app');
