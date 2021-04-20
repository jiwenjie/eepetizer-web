<!--
 * @Author: jiwenjie5
 * @Date: 2021-03-23 14:03:07
 * @LastEditors: jiwenjie5
 * @Description: 添加新配置
 * desc: 该部分为 css + 鼠标监听实现，界面打开时间长了之后发现动画会有滞涩的感觉，所以打算使用 canvas 实现
 -->
<template>
  <div id="indexDIV" class="index-container">
    <!-- 头部布局 -->
    <header class="header">
      <!-- 左侧 logo 图标 -->
      <h1>
        <a href="/" aria-current="page" class="nuxt-link-exact-active nuxt-link-active">
          <img src="@/assets/images/logo-white.png" alt="开眼eyepetizer" class="logo">
        </a>
      </h1>
      <!-- 右侧菜单导航部分 -->
      <nav class="nav">
        <a href="/" aria-current="page" class="nav-item active nuxt-link-exact-active nuxt-link-active">首页</a> 
        <a href="/about" class="nav-item">关于我们</a> 
        <a href="/" class="nav-item ">作者入口</a> 
        <a href="/" class="nav-item ">加入我们</a>
      </nav>
    </header>
    <!-- 界面主题布局 -->
    <main class="main">
      <div class="section-container">
        <div id="section-wrapper" class="section-wrapper" style="transform:matrix(1, 0, 0, 1, 0, 0);">
          <div class="section-slide">
            <section class="open animation-container">
              <!-- 动画区域内容框，全屏 -->
              <div id="container" class="box-3d">
                <!-- 此处把原始的 video 标签隐藏，实际在界面中的播放效果使用 three.js 中的 videoTexture 视频纹理替代 -->
                <!-- <video src="../../../../public/video/eyepetizer-cover.mp4" preload id="video" loop="loop" muted="muted" class="testVideo"></video>  -->
                <video src="../../../../public/video/eyepetizer-cover.mp4" preload id="video" loop="loop" muted="muted" class="hide"></video> 
                <div class="words" id="wordBox" :style="wordStyle">
                  <h2 class="title" id="innerTitle" >Feed your eyes, feed your soul.</h2>
                  <h2 class="eye" id="innerEye">开眼，看更好的世界。</h2>
                </div>
                <!-- three 相关布局代码 -->
                <!-- 设置 three.js 场景,设置后会自动载内部生成 canvas -->
                <div id="three" class="three"></div>
              </div>

              <!-- 界面 foot 部分,显示 android 和 ios 对应的移动应用 -->
              <footer class="download">
                <div class="btn-box">
                  <div class="btn ios">App Store</div>
                  <img src="@/assets/pageImg/ios.png" alt="" class="img-code ios-code">
                </div>
                <div class="btn-box">
                  <div class="btn android">Android</div>
                  <img src="@/assets/pageImg/android.png" alt="" class="img-code android-code">
                </div>
              </footer>
            </section>
          </div> 
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// 拆分 js，缩小单文件大小和体积，使得更清晰明了
import index from './js/index';
export default {
  name: 'index',
  components: {},
  mixins: [index],
}
</script>

<style scoped>
  @import url('./css/index.css');
</style> 