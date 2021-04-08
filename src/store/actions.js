// 默认easyMock生成的文件在src/api/template下
// import { apiGetUserInfoGet as getUserInfo } from '@/api/template'
import * as types from './mutation-types'
export default {
  async setUserInfo (context) {
    // userInfo模拟数据，真实开发环境中可以去掉，使用接口获取
    const data = {
      languageId: 'zh_CN',
      skin: 'blue',   // 设置主题样式
      breadcrumb: {
        '001': ['标签操作'],
        '002': ['标签统计'],
      },
      code: [
        `${process.env.VUE_APP_CONTEXT}_001`,   // 地图标签操作界面
        `${process.env.VUE_APP_CONTEXT}_002`,   // 地图标签操作统计界面
      ]
    }
    // let { data } = await getUserInfo({ noMsg: true })
    context.commit(types.SET_USER_INFO, data)
    return {
      userInfo: data
    }
  }
}
