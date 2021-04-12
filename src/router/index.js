//第一个参数是用来创建路由，第二个是history模式  第三个是hash模式
import { createRouter, createWebHistory, createWebHashHistory  } from 'vue-router'
import store from '@/store'

import routes from '../router.config.js'

const createRoute = (routes) => {
  return routes.reduce((processedRoutes, currentRoute) => {
    processedRoutes.push(processRouteObj(currentRoute))
    return processedRoutes
  }, [])
}

const processRouteObj = ({ menuCode, breadcrumb, children, component, ...args }) => {
  console.log('component', component)
  return Object.assign({
    meta: { menuCode },
    props: {
      breadcrumbObj: {
        content: breadcrumb,
        menuCode: menuCode
      }
    },
    component: () => import(/* webpackInclude: /\.(js|vue)$/ */`@/pages/${component}`),
    children: children ? createRoute(children) : []
  }, args)
}

const router = createRouter({
  history: createWebHistory(),  // 此处替换上面的参数即可更换模式，我这里暂时使用hash
  base: `/${process.env.VUE_APP_CONTEXT}`,   // 源码中的路径版本 env.BASE_URL = options.baseUrl；在项目根目录创建一个 vue.config.js文件，可进行 baseUrl 配置，接口代理以及其他配置
  // base: process.env.BASE_URL,   // 源码中的路径版本 env.BASE_URL = options.baseUrl；在项目根目录创建一个 vue.config.js文件，可进行 baseUrl 配置，接口代理以及其他配置
  routes: createRoute(routes)
})

// 全局路由导航守卫
router.beforeEach(async (to, form, next) => {
  const { userInfo: { code } } = store.state
  console.log('全局导航守卫', to);
  // 防止死循环跳出
  if (~to.path.indexOf('error')) {
    next()
    return
  }

  if (code.includes(`${process.env.VUE_APP_CONTEXT}_${to.meta.menuCode}`)) {
    next()
  } else if (to.meta.menuCode) {
    // 真实菜单，但无权限
    next({ path: '/error/403' })
  } else {
    // 不属于系统的url，跳转到404页面
    next({ path: '/error/404' })
  }
})

export default router
