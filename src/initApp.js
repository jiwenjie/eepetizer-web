import store from '@/store'
import router from './router'
import App from './App'
import { createApp } from 'vue'
import App from './App.vue'

import ErrorPage from '@/components/ErrorPage'

async function initApp (Vue) {
  try {
    // eslint-disable-next-line no-unused-vars
    const { userInfo } = await store.dispatch('setUserInfo')
    // await Promise.all([renderTheme(userInfo)])
    // 初始化vue实例
    createApp(App).mount('#app')
  } catch (error) {
    // await renderTheme({ skin: 'redblack' })   // 自定义主题部分
    // console.error('init error:', error)
    // // errorLoadPage(Vue, ErrorPage, '500', '服务器异常，请联系管理员') // 如果是国际产品会默认显示英文，纯国内使用可以用中文
    // errorLoadPage(Vue, ErrorPage)
  }
}

async function renderTheme ({ skin }) {
  try {
    const assetsUrl = process.env.BASE_URL + process.env.VUE_APP_ASSETS
    // public/static/skin/xxx/skin.css
    const requestUrl = `${assetsUrl}/skin/${skin}/skin.css`
    await renderThemeFromCssUrl(requestUrl)
  } catch (error) {
    console.error('设置自定义皮肤失败')
    throw error
  }
}

export default initApp
