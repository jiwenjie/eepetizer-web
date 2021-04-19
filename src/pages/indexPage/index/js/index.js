import { reactive, onMounted, toRefs, ref } from 'vue'
import * as THREE from 'three';
import {OrbitControls} from 'three-orbit-controls';

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

        // 为了真正能够让你的场景借助three.js来进行显示，我们需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        wordStyle: {},

        videoDom: null,
      }
    },

    computed: {
      // 根据用户缩放浏览器设置当前 three 的 style 样式
      threeStyle() {
        return `display: block; width: ${this.clientWidth}px; height: ${this.clientHeight}px;`
      }
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
        // this.animate();   // 开启动画
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
        let three = document.getElementById("three");
        // 第一个属性是视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的值是一个角度。
        // 第二个值是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的比值。比如说，当你在一个宽屏电视上播放老电影时，
        // 可以看到图像仿佛是被压扁的。
        this.camera = new THREE.PerspectiveCamera(90, this.clientWidth / this.clientHeight, 0.1, 1000);
        this.camera.position.z = 6;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        });
        this.renderer.setSize(this.clientWidth, this.clientHeight),
        three.appendChild(this.renderer.domElement),
        this.initBox()
      },

      initBox() {
        this.initVideoTextures();
        this.geometry = new THREE.BoxGeometry(887 / 32,509 / 32,10);
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.position.z = -6;
        this.scene.add(this.plane);
      },

      initVideoPlay() {
        this.videoDom.play()
      },

      initVideoTextures() {
          this.videoDom = document.getElementById("video");
          this.texture = new THREE.TextureLoader().load(this.videoDom);
          // this.texture.minFilter = o.a,
          // this.texture.magFilter = o.a,
          // this.texture.format = o.f
      },

      addMouseMove() {
        window.addEventListener("mousemove", this.handleMouseMove, !0)
      },

      // 全局处理鼠标移动事件，进行判断处理展示界面中文字 style 样式信息
      handleMouseMove(event) {
        let 
          widthX = event.clientX - this.clientWidth / 2, 
          heightY = -(event.clientY - this.clientHeight / 2);

        this.camera.lookAt(new THREE.Vector3(300-4 * widthX, 300-4 * heightY, 3));
        this.wordStyle = {
            transform: "rotateX(".concat(.01 * heightY, "deg) rotateY(").concat(.01 * widthX, "deg)  ")
        }
      },

      // 做动画的方法
      animate() {
        // 开启帧动画，每次浏览器执行刷新的时候执行该动画
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
      }
    }
}