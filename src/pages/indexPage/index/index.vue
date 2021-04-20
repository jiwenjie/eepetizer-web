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
        <!-- <div id="section-wrapper" class="section-wrapper" style="transform:matrix(1, 0, 0, 1, -1920, 0);"> -->
          <!-- 首页 slide01，首页文字提示和引导视频 -->
          <div class="section-slide">
            <section class="open animation-container">
              <div id="container" class="box-3d">
                <video src="../../../../public/video/eyepetizer-cover.mp4" preload id="video" loop="loop" muted="muted" class="hide"></video> 
                <div class="words" id="wordBox" :style="wordStyle">
                  <h2 class="title" id="innerTitle" >Feed your eyes, feed your soul.</h2>
                  <h2 class="eye" id="innerEye">开眼，看更好的世界。</h2>
                </div>
                <div id="three" class="three"></div>
              </div>
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

          <!-- 首页 slide02，精选创意视频 part2 -->
          <div class="section-slide">
            <section class="animation-container">
              <div class="chosen-video acive">
                <header class="header" style="transform: matrix(1, 0, 0, 1, 0, 0);">
                  <h2 class="title">精选创意视频</h2> 
                  <p class="desc"> 汇聚全球优质视频内容，让你大开眼界；了解各领域全新动态，启迪你的生活灵感。</p>
                </header>
                <!-- <main></main>
                <nav></nav> -->
              </div>
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