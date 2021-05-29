
import App from './App.vue';    // 导入主页 vue 文件
// 引入路由文件
import router from './router/index';
// 引入 store 文件
import store from '@/store'

// 全量引入 elementPlus
import installElementPlus from './plugins/element'

export default async function initAppView(createApp) {
    try {
        const { userInfo } = await store.dispatch('setUserInfo')
        console.log('initApp success', userInfo);
        const app = createApp(App)
        installElementPlus(app)
        app.use(router)
            .use(store)
            .mount('#app')
    } catch (error) {
        console.error('init error:', error)
        // errorLoadPage(Vue, ErrorPage)
    }
}