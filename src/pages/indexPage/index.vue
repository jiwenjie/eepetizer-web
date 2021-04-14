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
              <div id="container" class="box-3d">
                <div class="loading"></div>
                <!-- <video src="../../../public/video/eyepetizer-cover.mp4" preload id="video" loop="loop" muted="muted" class="video-item hide"></video> -->
                <div class="words" id="wordBox" :style="wordsStyle">
                  <h2 class="title" id="innerTitle">Feed your eyes, feed your soul.</h2>
                  <h2 class="eye" id="innerEye">开眼，看更好的世界。</h2>
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
import { reactive, onMounted, toRefs, ref } from 'vue'
export default {
    components: {},
    props: {
        title: {
            type: String,
            default: '提示'
        },
        content: {
            type: String,
            default: '确定关闭吗？'
        }
    },
    setup() {
        // 界面中部的文字内容部分
        const wordsStyle = reactive({
          transform: "rotateX(0deg) rotateY(0deg)",
          webkitTransform: "rotateX(0deg) rotateY(0deg)",
          mozTransform: "rotateX(0deg) rotateY(0deg)",
          msTransform: "rotateX(0deg) rotateY(0deg)",
          oTransform: "rotateX(0deg) rotateY(0deg)",
        })

        onMounted(async () => {
            // Init
            let container = document.getElementById("container"),
              wordDom = document.getElementById("wordBox");

            // Mouse
            let mouse = {
              _x: 0,
              _y: 0,
              x: 0,
              y: 0,
              
              updatePosition: function(event) {
                let e = event || window.event;
                this.x = e.clientX - this._x;
                this.y = (e.clientY - this._y) * -1;
              },

              setOrigin: function(e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
                this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
              },

              show: function() {
                return "(" + this.x + ", " + this.y + ")";
              }
            };

            // Track the mouse position relative to the center of the container.
            mouse.setOrigin(container);

            //-----------------------------------------

            let counter = 0;
            let updateRate = 10;
            let isTimeToUpdate = function() {
              return counter++ % updateRate === 0;
            };

            //-----------------------------------------
            let onMouseEnterHandler = function(event) {
              update(event);
            };

            let onMouseLeaveHandler = function() {
              console.log('mouseLeave---')
            };

            let onMouseMoveHandler = function(event) {
              if (isTimeToUpdate()) {
                update(event);
              }
            };

            //-----------------------------------------
            let update = function(event) {
              mouse.updatePosition(event);
              // 分别设置样式
              updateTransformStyle(
                (mouse.y / (wordDom.offsetHeight / 6)).toFixed(2),
                (mouse.x / (wordDom.offsetWidth / 12)).toFixed(2)
                );
            };

            // 更新全局文字 sologn 样式调整
            let updateTransformStyle = function(x, y) {
              let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
              // 全局 sologn
              wordsStyle.transform = style;
              wordsStyle.webkitTransform = style;
              wordsStyle.mozTransform = style;
              wordsStyle.msTransform = style;
              wordsStyle.oTransform = style;
            };

            //-----------------------------------------
            container.onmouseenter = onMouseEnterHandler;
            container.onmouseleave = onMouseLeaveHandler;
            container.onmousemove = onMouseMoveHandler;
        })

        return { wordsStyle }
    }
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

  .index-container .animation-container {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .index-container .open {
    position: relative;
  }

  .index-container section {
    height: 100%;
  }

  .section-slide {
    width: 100vw;
    height: 100%;
  }

  .box-3d {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-top: -8vh;
    perspective: 400px;   /** 视距，查看的位置 */
    transform-style: preserve-3d;   /** 动画模式，开启 3d 模式 */
  }

  .box-3d .words {
    position: absolute;
    z-index: 200;
    transition: all .1s;
    transform-origin: bottom;   /** 设置动画中心点 */
  }

  .box-3d .words .title {
      font-family: AkzidenzGrotesk-Medium;
      font-weight: 500;
      font-size: 72px;
      line-height: 72px;
      text-align: center;
      transition: all .1s;
  }

  .box-3d .words .eye {
    font-family: SourceHanSansCN-Normal;
    font-size: 24px;
    font-weight: 700;
    line-height: 38px;
    letter-spacing: 8px;
    text-align: center;
    margin-top: 20px;
  }

  @media screen and (min-height: 900px)  {
    .box-3d .words .title {
      font-size: 95px !important;
      line-height: 97px !important;
    }

    .box-3d .words .eye {
      font-size: 25px !important;
      line-height: 37px !important;
    }
  }

  @media screen and (min-height: 800px) {
    .box-3d .words .title {
      font-size: 84px !important;
      line-height: 90px !important;
    }

    .box-3d .words .eye {
      font-size: 25px !important;
      line-height: 37px !important;
    }
  }

  #innerTitle, #innerEye {
    transition: all 0.1s;
  }

  .video-item {
    width: 60vw;
    /* transform: rotateX(22deg) rotateY(-20deg) */
  }

  .box-3d .hide {
    /* display: none; */
  }
</style> 