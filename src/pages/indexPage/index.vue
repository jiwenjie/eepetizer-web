<!--
 * @Author: jiwenjie5
 * @Date: 2021-03-23 14:03:07
 * @LastEditors: jiwenjie5
 * @Description: 添加新配置
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
            </section>
          </div> 
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>

<style scoped>
  .index-container {
    background: #000;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    color: #fff;
  }

  .index-container .header, .index-container .header .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .index-container .header {
    max-width: 1440px;
    min-width: 960px;
    width: 100vw;
    padding: 0 40px;
    height: 8vh;
    margin: 0 auto;
    z-index: 1000;
  } 

  :not(input) :not(textarea) {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }

  .index-container .header .logo {
    display: block;
    width: 170px;
    height: 20.88px;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .index-container .header .nav .nav-item.active {
    font-family: SourceHanSansCN-Medium;
    font-weight: 700;
  }
  
  .index-container .header .nav .nav-item {
      font-family: SourceHanSansCN-Light;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0;
      text-align: center;
      color: #fff;
      margin-left: 68px;
  }

  .main {
      height: 92vh;
      position: relative;
  }

  .index-container .section-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}

  .index-container .section-container {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    list-style: none;
    padding: 0;
    height: 100%;
  }
</style> 