
/** vue2 引入 element-ui */
// import Vue from 'vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element)


/** vue3 引入 elementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
 
export default (app) => {
 app.use(ElementPlus)
}
