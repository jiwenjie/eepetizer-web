import { createApp } from 'vue';
import App from './App.vue';

// 引入路由文件
import router from './router/index';

// 引入 store 文件
import store from '@/store'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
