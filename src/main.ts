import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import { registerIcons } from '@/utils/icon';
import App from './App.vue';
import '@/permission';

import 'normalize.css/normalize.css';
import '@/style/index.scss';

import 'virtual:svg-icons-register';

const app = createApp(App);
registerIcons(app);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
