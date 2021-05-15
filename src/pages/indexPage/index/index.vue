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
          <div class="section-slide" @mousewheel="(event) => indexPageMouseWheel(event, '0')" :class="curPageIndex > 0 ? 'move-page-index':''">
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
          <div class="section-slide second-page-class" @mousewheel="(event) => indexPageMouseWheel(event, '1')" :class="[curPageIndex > 1 ? 'move-page-index':'']">
            <section class="animation-container">
              <div class="chosen-video active">
                <header class="header header-subtitle">
                  <h2 class="title">精选创意视频</h2> 
                  <p class="desc"> 汇聚全球优质视频内容，让你大开眼界；了解各领域全新动态，启迪你的生活灵感。</p>
                </header>
                 <main class="content">
                   <ul class="transition-class" :style="{transform: `translateX(${-featuredObj.curtranslateX + 'px'})`}">
                     <li class="video-item appearTogether leave bottom" 
                        v-for="(videoItem, index) in ulVideoList" :key="videoItem.id" 
                        :style="`transition-delay: ${300 + index * 500}ms;`">
                        <a :href="videoItem.hrefUrl">
                          <div class="video-box">
                              <!-- 给视频 videoItem 设置鼠标滑入滑出事件监听 -->
                              <div class="video-hover" @mouseover="videoItemOver(videoItem)" @mouseout="videoItemOut(videoItem)">
                                <img :src="videoItem.imgUrl" alt="视频" class="cover"> 
                                <video :id="`ID${videoItem.id}`" muted="muted" 
                                  :src="videoItem.videoUrl" class="preview" />
                              </div>
                          </div> 
                          <p>{{videoItem.desc}}</p> 
                          <div class="line"></div>
                        </a>
                     </li>
                   </ul>
                 </main>
                <nav class="nav video-type-nav" style="transform: matrix(1, 0, 0, 1, 0, 0);">
                  <ul>
                    <li class="nav-item" :class="[videoTyeIndex === 0 ? 'active':'']" @click="videoTypClick(0)">每日推荐</li>
                    <li class="nav-item" :class="[videoTyeIndex === 1 ? 'active':'']" @click="videoTypClick(1)">旅行</li>
                    <li class="nav-item" :class="[videoTyeIndex === 2 ? 'active':'']" @click="videoTypClick(2)">运动</li>
                    <li class="nav-item" :class="[videoTyeIndex === 3 ? 'active':'']" @click="videoTypClick(3)">摄影</li>
                    <li class="nav-item" :class="[videoTyeIndex === 4 ? 'active':'']" @click="videoTypClick(4)">艺术</li> 
                    <a href="/video/video-list" class="nav-item">查看全部</a>
                  </ul> 
                  <img src="@/assets/pageImg/Scroll.png" alt="scroll" class="scroll">
                </nav>
              </div>
            </section>
          </div>

          <!-- 首页 slide03 其他内容介绍 -->
          <div class="section-slide third-page-class" @mousewheel="(event) => indexPageMouseWheel(event, '2')">
            <section class="else animation-container">
              <div class="desc-container active">
                <div class="content" :style="{transform: `translateX(${-indexPage3.curtranslateX + 'px'})`}">
                  <div class="publish item-box">
                    <img src="@/assets/pageImg/iphone1.png" alt="" class="img-1" style="transform: matrix(1, 0, 0, 1, 0, 0);"> 
                    <img src="@/assets/pageImg/blue-logo.png" alt="" class="logo"> 
                    <div class="desc" style="transform: matrix(1, 0, 0, 1, 0, 0);">
                      <p class="title">有机社区</p> 
                      <p class="detail">优质用户及创作者的集合地。自由分享生活点滴，<br>随时收获创作灵感，一同共建高品质内容生态。<br><br>精选话题、有奖征集，多种形式即时参与。<br>让你的每一刻精彩瞬间，都被看见。<br></p>
                    </div>
                  </div> 
                  <div class="live item-box">
                    <img src="@/assets/pageImg/iphone2.png" class="live-img" style="transform: matrix(1, 0, 0, 1, 0, 0);">
                    <div class="desc" style="transform: matrix(1, 0, 0, 1, 0, 0);">
                      <p class="title">「在现场」直播</p> 
                      <p class="detail">国内外佳片展映、人文艺术领域名人直播，「在现场」邀你与艺术家一起创作，和朋友一起观展看片，来一场身临其境的愉悦体验。</p>
                    </div>
                  </div> 
                  <div class="brand item-box">
                    <img src="@/assets/pageImg/brand-logo.png" alt="" class="logo"> 
                    <img src="@/assets/pageImg/iphone3.png" alt="" class="brand-1" style="transform: matrix(1, 0, 0, 1, 0, 0);" > 
                    <div class="desc" style="transform: matrix(1, 0, 0, 1, 0, 0);" >
                      <p class="title">品牌墙</p> 
                      <p class="detail">网罗国内外品牌精选创意视频，用来自世界每个角落的广告创意，为你输送源源不断的创意灵感。一个创意人群不可不知的灵感素材库。</p> 
                      <a href="/brand/brand-wall" class="link"> 查看全部品牌<img src="@/assets/pageImg/icon-link.png" alt="" class="icon"></a>
                    </div>
                  </div> 
                  <div class="first-floor">
                    <h3 class="text text1">Feed&nbsp;your&nbsp;eyes,</h3> 
                    <h3 class="text text2">feed&nbsp;your&nbsp;soul.</h3>
                  </div> 
                  <div class="footer">
                    <footer class="footer">
                      <div class="link">
                        <a href="mailto:bd@eyepetizer.net?subject=[意见反馈]" el="nofollow">意见反馈</a> 
                        <a href="//www.eyepetizer.net/agreement.html" el="nofollow">用户协议</a> 
                        <a href="//www.eyepetizer.net/right.html" el="nofollow">权利声明</a> 
                        <a href="mailto:bd@eyepetizer.net?subject=[商务合作]" el="nofollow">商务合作</a> 
                        <a href="mailto:bd@eyepetizer.net?subject=[简历投递]" el="nofollow">加入我们</a> 
                        <a href="/about" class="">关于我们</a>
                      </div> 
                      <div class="company">© 北京牡蛎柠檬科技文化有限公司2020 - 2025京 ICP 备16030848 号京 ICP 证161038 号</div> 
                      <div class="wangan"><i></i>京公网安备 11010502034149号京网文（2017）1560-134 号</div>
                    </footer>
                  </div>
                </div>
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