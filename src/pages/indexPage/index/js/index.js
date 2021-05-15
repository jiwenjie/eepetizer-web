/*
 * @Author: jiwenjie5 
 * @Date: 2021-04-Fr 08:37:32 
 * @Last Modified by:   jiwenjie5 
 * @Last Modified time: 2021-04-Fr 08:37:32 
 */
import { reactive, onMounted, toRefs, ref } from 'vue'

import * as THREE from 'three';
// 导入控制器方式如下
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// 导入首页视频展示数据
import simulation from '@/api/simulationData';

export default {
    name: 'Box3D',
    components: {},
    props: {},
    setup() {
        return { }
    },

    data() {
      return {
        clientHeight: 0,  // 可视化区域高度
        clientWidth: 0,   // 可视化区域宽度

        // 这里是一个大坑，在 vue3中如果把变量设置成响应式则使用 three.js 会报错，目前对象代理的时候对 configture 为 false 的会有问题，可能需要版本迭代处理才行，而如果在 data 中
        // 不定义使用的变量，直接在方法中使用 this 来指定则创建的是非响应式的对象，目前该种方式在 vue3 中展示正常，如果是 vue2 中还是正常在 data 中定义变量，亲测结果。
        // 为了真正能够让你的场景借助three.js来进行显示，我们需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。
        // camera: null,
        // scene: null,
        // light: null,  
        // renderer: null,
        // mesh: null,
        // videoDom: null,
        wordStyle: {},

        curPageIndex: 0,    // 首页打算做三块，第一块是首页 logo 和视频，第二块是精选视频，第三块是其他展示部分

        ulVideoList: [],   // 创意视频部分

        // 首页内容第二屏，精选创意视频部分
        featuredObj: {
          length: 2443,   // 每个类型有六个数据，加上间距，总长是 2443px   588  576
          curtranslateX: 0, // 当前已经滚动了多少距离
          cantranslateX: 0,    // 可以滚动的距离，该距离为内容区域总长度 - 界面总宽度 + 30vw
        },

        // 首页内容第三屏，有关开眼视频内容的介绍
        indexPage3: {
          length: 3730,   // 每个类型有六个数据，加上间距，总长是 2443px   588  576
          curtranslateX: 0, // 当前已经滚动了多少距离
          cantranslateX: 0,    // 可以滚动的距离，该距离为内容区域总长度 - 界面总宽度 + 30vw
        },

        videoTyeIndex: 0,   // 首页第二个创意视频模块下标，默认为每日推荐
      }
    },

    computed: {
      // 根据用户缩放浏览器设置当前 three 的 style 样式
      // threeStyle() {
      //   return `display: block; width: ${this.clientWidth}px; height: ${this.clientHeight}px;`
      // }
    },

    mounted () {
      // 关于首页视频播放和动画相关的代码内容
      this.getClientSize();   // 获取当前全屏的宽高部分
      this.initThree(); // 初始化 three.js 准备相关 video 的播放
      this.initVideoPlay();  // 初始化播放视频
      this.$nextTick(() => {
        // 开启全局鼠标移动监听动画 - 针对 three.js 实现的纹理播放视频
        this.addMouseMove();
      })
      this.onWindowResize();  // 设置浏览器全局的 rsize 事件
    },

    methods: {
      // event mousewheel, curPageIndex 参数表示当前所在的全局 page 是第几页，下标从 0 开始，一共是 3 页
      indexPageMouseWheel(event, curPageIndex) {
        // let direction = event.deltaY > 0 ? 'down':'up';  // deltaY 为正则滚轮向下，为负滚轮向上
        switch (curPageIndex) {
          // 当前是首页 page 中的第一页的时候
          case '0': {
            if (event.deltaY > 0) {
              this.curPageIndex = 1;
    
              this.loadVideoList();   // 获取创意视频列表数据  
            }
            break;
          }
          case '1': {
            if (event.deltaY > 0) {
              // 滚轮向下
              // 此时判断如果没有滚动到最后一块数据则滚动屏幕内容，如果滚动到了最后一条数据则翻页
              this.featuredObj.curtranslateX +=  event.deltaY;
              if (this.featuredObj.curtranslateX > this.featuredObj.cantranslateX) {
                this.curPageIndex = 2;
              }
            } else {
              // 滚轮向上
              if (this.featuredObj.curtranslateX <= 0) {
                this.curPageIndex = 0;
              } else {
                this.featuredObj.curtranslateX +=  event.deltaY;
              }
            }
            break;
          }
          case '2': {
            // indexPage3
            // let direction = event.deltaY > 0 ? 'down':'up';  // deltaY 为正则滚轮向下，为负滚轮向上
            if (event.deltaY > 0) {
              //   // 滚轮向下
              if (this.indexPage3.curtranslateX < this.indexPage3.cantranslateX) {
                this.indexPage3.curtranslateX +=  event.deltaY;
              }
            } else {
              // 滚轮向上
              if (this.indexPage3.curtranslateX <= 0) {
                this.curPageIndex = 1;    // 界面移动到上一个界面中去
                this.featuredObj.curtranslateX = 0;   // 重置分界面的偏移量数值
              } else {
                this.indexPage3.curtranslateX += event.deltaY;
              }
            }
            break;
          }
          default: {
            console.log('无匹配内容...')
          }
        }
      },

      // 获取各个种类的创意视频
      loadVideoList() {
        // 存放每日推荐视频内容
        this.ulVideoList = simulation.dailyRecommendation;
      },

      // 初始化 three.js 内容
      initThree() {
        this.init();  // 初始化部分
        this.animate();   // 开启动画
      },

      // 获取当前可视区域的宽高部分
      getClientSize() {
        this.clientHeight = window.innerHeight,
        this.clientWidth = window.innerWidth
      },

      onWindowResize() {
        window.addEventListener("resize", this.onResize, !0);
      },

      onResize() {
        this.getClientSize();
        this.camera && (this.camera.aspect = this.clientWidth / this.clientHeight);
        this.camera && this.camera.updateProjectionMatrix();
        this.renderer && this.renderer.setSize(this.clientWidth, this.clientHeight);

        // 如果当前是首页内容的精选视频内容区域的时候
        // if (this.curPageIndex == 1) {
          this.featuredObj.cantranslateX = this.featuredObj.length - this.clientWidth * 0.7;
        // }

        // 需要计算首页内容滚动到第三页的时候
        // if (this.curPageIndex == 2) {
          this.indexPage3.cantranslateX = this.indexPage3.length - this.clientWidth;
        // }
      },

      init() {
        // 场景（Scene）
        // 在Three.js中添加的物体都是添加到场景中的，因此它相当于一个大容器。一般说，场景里没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。
        this.scene = new THREE.Scene();

        let three = document.getElementById("three");
        // 该构造函数总共有四个参数，分别是fov，aspect，near，far 。
        // fov表示摄像机视锥体垂直视野角度，最小值为0，最大值为180，默认值为50，实际项目中一般都定义45，因为45最接近人正常睁眼角度；
        // aspect表示摄像机视锥体长宽比，默认长宽比为1，即表示看到的是正方形，实际项目中使用的是屏幕的宽高比；
        // near表示摄像机视锥体近端面，这个值默认为0.1，实际项目中都会设置为1；
        // far表示摄像机视锥体远端面，默认为2000，这个值可以是无限的，说的简单点就是我们视觉所能看到的最远距离。
        this.camera = new THREE.PerspectiveCamera(45, this.clientWidth / this.clientHeight, .1, 1000);
        
        //设置相机的位置
        this.camera.position.set(0, 0, 15);
        this.scene.add(this.camera);    // 把摄像机添加到场景里去

        // antialias（是否启用抗锯齿）
        this.renderer = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        });
        
        this.renderer.setSize(this.clientWidth, this.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        three.appendChild(this.renderer.domElement);
        this.initBox(); // 初始化网格盒子

        // 开启控制器后在动态改变 camera 的 lookAt 效果会消失，此时可以手动拖拽旋转视频播放的立方体
        // 如果注释该行，关闭控制器则可以看到根据鼠标修改移动 lookAt 的效果展示（tips：目前的效果就是在移动的时候会遮挡住文字，此处可能需要细细调校才行）
        // this.initControls();  // 初始化控制器
      },
      
      // 初始化创建网格模型
      initBox() {
        this.initVideoTextures();
        // 辅助工具,增加中心指引线
        // let helper = new THREE.AxesHelper(50);
        // this.scene.add(helper);

        // 创建一个视频面，用来同步展示视频 video 的纹理，二维平面和三维平面同步展示视频纹理都没有问题，看自己的喜好设置即可

        // tips: 这几个平面都可以实现该效果，内部通过帧播放视频的原理是一致的，所以可以自己尝试，不过对 three.js 中具体的 api 需要多看文档才能更深入了解
        // this.geometry = new THREE.PlaneGeometry(5.2357, 3);    // 二维平面
        // this.geometry = new THREE.BoxGeometry(5.2357, 3, 10);   // 三维
        this.geometry = new THREE.BoxBufferGeometry(11, 7, 6);   // 三维立方体

        // 创建材质对象，把视频的纹理添加到材质对象中去
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture   // 设置纹理贴图
        });
        this.cube = new THREE.Mesh(this.geometry, this.material);   // 网格模型对象Mesh
        // this.cube.position.z = -5;    // 改变该参数值相当于把场景拉远拉近，可以看到视频播放内容大小改变
        this.scene.add(this.cube);
      },

      // 播放 video 视频
      initVideoPlay() {
        this.videoDom.play();
      },

      // 初始化 video 纹理
      initVideoTextures() {
        this.videoDom = document.getElementById("video");
        this.texture = new THREE.VideoTexture(this.videoDom);
        this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
        this.texture.minFilter = THREE.LinearFilter;
      },

      // 初始化控制器
      initControls() {
        // 配合控制器使用，设置 camera 的位置和 lookAt 的原点方向
        this.camera.position.set(0, 40, 100);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        //设置控制器的中心点
        //controls.target.set( 0, 5, 0 );
        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.controls.enableZoom = true;
        //是否自动旋转
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0.5;
        //设置相机距离原点的最远距离
        this.controls.minDistance = 1;
        //设置相机距离原点的最远距离
        this.controls.maxDistance = 1000;
        //是否开启右键拖拽
        this.controls.enablePan = true;
      },

      // 添加鼠标监听事件
      addMouseMove() {
        // 设置鼠标滚动监听事件
        window.addEventListener("mousemove", this.handleMouseMove, !0);
      },

      // 全局处理鼠标移动事件，进行判断处理展示界面中文字 style 样式信息
      handleMouseMove(event) {
        let 
          widthX = event.clientX - this.clientWidth / 2, 
          heightY = -(event.clientY - this.clientHeight / 2);

        // 调整设置摄像头的观看角度设置，使得成像背景有立体的动画效果实现; 3e-4 表示 3 乘以 10 的 -4 次方
        this.camera.lookAt(new THREE.Vector3(0.0003 * widthX, 0.0003 * heightY, 3));

        // 根据鼠标滚动调整设置内部的样式修改，该方法在一直运行的清空下也不会出现卡顿的清空；
        // 初次实现的代码备份在 index_bak.vue 文件中，此种方式在界面打开长时间后在鼠标移动执行动画的时候会出现较为明显的卡顿现象，体验不好
        // 目前此种方法 - 增加样式 style 的修改也不需要增加 transition 属性，直接在鼠标滚动监听中修改该方法即可。
        this.wordStyle = {
          transform: "rotateX(".concat(.01 * heightY, "deg) rotateY(").concat(.01 * widthX, "deg)  ")
        };
      },

      // 做动画的方法
      animate() {
        // console.log('scene', this.scene)
        // console.log('camera', this.camera)
        // 开启帧动画，每次浏览器执行刷新的时候执行该动画
        requestAnimationFrame(this.animate);
        this.controls && this.controls.update();
        this.renderer.render(this.scene, this.camera);
      },

      // 鼠标移入 videoItem 方法, 设置鼠标移入的时候播放视频
      videoItemOver(videoItem) {
        let video = document.getElementById(`ID${videoItem.id}`);
        //给视频标签添加缓存播放---video标签属性。
        video.setAttribute("autoplay","autoplay");
        //给视频标签添加循环播放---video标签属性。
        video.setAttribute("loop","loop");
        //播放视频
        video.play();
      },

      // 鼠标移出 videoItem 方法，设置鼠标移出的时候停止播放视频
      videoItemOut(videoItem) {
        let video = document.getElementById(`ID${videoItem.id}`);
        //停止播放
        video.pause();
      },

      // 视频类型切换点击事件
      videoTypClick(videoTypIndex) {
        this.videoTyeIndex = videoTypIndex;

        let tempObj = {
          0: simulation.dailyRecommendation,    // 每日推荐
          1: simulation.travel,   // 旅行
          2: simulation.movement,   // 运动
          3: simulation.photography,  // 摄影模块
          4: simulation.art      // 艺术模块
        }

        this.ulVideoList = tempObj[this.videoTyeIndex];   // 改变当前的 video 视频列表
      }
    }
}