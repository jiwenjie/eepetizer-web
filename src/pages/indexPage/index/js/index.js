import { reactive, onMounted, toRefs, ref } from 'vue'

import * as THREE from 'three';

// import { OrbitControls } from 'OrbitControls';
// import { CSS2DRenderer, CSS2DObject } from 'CSS2DRenderer.js';
// import { OrbitControls } from 'three-orbit-controls';

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
      }
    },

    computed: {
      // 根据用户缩放浏览器设置当前 three 的 style 样式
      // threeStyle() {
      //   return `display: block; width: ${this.clientWidth}px; height: ${this.clientHeight}px;`
      // }
    },

    mounted () {
      this.getClientSize();   // 获取当前全屏的宽高部分
      this.initThree(); // 初始化 three.js 准备相关 video 的播放
      this.initVideoPlay();  // 初始化播放视频
      this.$nextTick(() => {
        // 开启全局鼠标移动监听动画
        this.addMouseMove();
      })
      this.onWindowResize();  // 设置浏览器全局的 rsize 事件
    },

    methods: {
      // 初始化 three
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
        this.camera.aspect = this.clientWidth / this.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.clientWidth, this.clientHeight);
      },

      init() {
        // 场景（Scene）
        // 在Three.js中添加的物体都是添加到场景中的，因此它相当于一个大容器。一般说，场景里没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。
        this.scene = new THREE.Scene();

        let three = document.getElementById("three");
        // 第一个属性是视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的值是一个角度。
        // 第二个值是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的比值。比如说，当你在一个宽屏电视上播放老电影时，
        // 可以看到图像仿佛是被压扁的。
        this.camera = new THREE.PerspectiveCamera(45, this.clientWidth / this.clientHeight, 0.1, 1000);
        //设置相机的位置
        this.camera.position.set(0, 0, 6);
        this.scene.add(this.camera);    // 把摄像机添加到场景里去

        // 渲染器（Renderer）两种生成方式; 一种是直接和已有的 canvas 绑定, 另外一种是通过 three.js 自身创建生成 canvas 元素

        // 如果布局中已有 canvas 元素, 需要和 canvas 的 id 绑定的话
        // var renderer = new THREE.WebGLRenderer({
        //   canvas: document.getElementById('mainCanvas')
        // });

        // 如果布局中没有 canvas, 需要使用 three.js 自己生成的话
        // var renderer = new THREE.WebGLRenderer();
        // renderer.setSize(400, 300);
        // document.getElementsByTagName('body')[0].appendChild(renderer.domElement);

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
      },
      
      // 初始化创建网格模型
      initBox() {
        this.initVideoTextures();
        // 创建一个视频面，用来同步展示视频 video 的纹理，二维平面和三维平面同步展示视频纹理都没有问题，看自己的喜好设置即可

        // tips: 这几个平面都可以实现该效果，内部通过帧播放视频的原理是一致的，所以可以自己尝试，不过对 three.js 中具体的 api 需要多看文档才能更深入了解
        // this.geometry = new THREE.PlaneGeometry(5.2357, 3);    // 二维平面
        this.geometry = new THREE.BoxGeometry(5.2357, 3, 10);   // 三维
        // this.geometry = new THREE.BoxBufferGeometry(887 / 64, 509 / 64, 10);   // 三维立方体

        // 创建材质对象，把视频的纹理添加到材质对象中去
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture   // 设置纹理贴图
        });
        this.cube = new THREE.Mesh(this.geometry, this.material);   // 网格模型对象Mesh
        this.cube.position.z = -5;    // 改变该参数值相当于把场景拉远拉近，可以看到视频播放内容大小改变
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

        // 调整设置摄像头的观看角度设置，使得成像背景有立体的动画效果实现  0.000271828 
        this.camera.lookAt(new THREE.Vector3(0.000271828 * widthX, 0.000271828 * heightY, 3));

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
        this.renderer.render(this.scene, this.camera);
      }
    }
}