export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    name: 'index',
    path: '/index',
    menuCode: '001',
    component: 'indexPage/index'
  },
  {
    name: 'about',
    path: '/about',
    menuCode: '002',
    component: 'indexPage/About'
  },
  {
    path: '/error/:type',
    name: 'Error',
    component: 'Error' // 注意提供ErrorPage组件内的多语言翻译
  },
]
