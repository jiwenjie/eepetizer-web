
<template>
  <div class="about" id="pageDIV">
    <video id="video" autoplay controls>
        <!-- <source src="/lib/textures/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'> -->
        <source src="../../../public/video/eyepetizer-cover.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    </video>
    <!-- <video src="" preload id="video" loop="loop" muted="muted" class="hide"></video> -->
    <!-- <div id="three" class="three"></div> -->
    <!-- <div class="about-body" id="testDIV"></div> -->
  </div>
</template>

<script>
import * as Three from 'three';
// import OrbitControls from 'three/examples/js/controls/OrbitControls'
// import { OrbitControls } from 'three-orbit-controls'

export default {
  components: {
  },
   data() {
     return {
      clientHeight: 0,  // 可视化区域高度
      clientWidth: 0,   // 可视化区域宽度

      // 为了真正能够让你的场景借助three.js来进行显示，我们需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。
      // renderer: null,
      // camera: null,
      // scene: null,
      // gui: null,
      // light: null,
      // stats: null,
      // controls: null,

         // camera: null,
         // scene: null,
         // renderer: null,
         // mesh: null
     }
   },

   mounted () {
    //  this.getClientSize();   // 获取当前全屏的宽高部分
    //  this.initThree();

   //  this.draw();

   this.init();
   this.animate()
   },

   methods: {
      init() {
         let container = document.getElementById('pageDIV');
         this.camera = new Three.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 10);
         this.camera.position.z = 1;
         this.scene = new Three.Scene();
         let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
         let material = new Three.MeshNormalMaterial();
         this.mesh = new Three.Mesh(geometry, material);
         this.scene.add(this.mesh);
         this.renderer = new Three.WebGLRenderer({antialias: true});
         this.renderer.setSize(window.innerWidth, window.innerHeight);
         container.appendChild(this.renderer.domElement);
      },

      animate() {
         requestAnimationFrame(this.animate);
         this.mesh.rotation.x += 0.01;
         this.mesh.rotation.y += 0.02;
         this.renderer.render(this.scene, this.camera);
      },


     draw() {
        this.initGui();
        this.initRender();
        this.initScene();
        this.initCamera();
        // this.initLight();
        this.initModel();
        // this.initControls();
        // this.initStats();

        this.animate();
        window.onresize = onWindowResize;
     },

     //初始化dat.GUI简化试验流程
     initGui() {
       //声明一个保存需求修改的相关数据的对象
        // gui = {
        // };
        // var datGui = new dat.GUI();
        //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
     },

     initRender() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xeeeeee);
        this.renderer.shadowMap.enabled = true;
        //告诉渲染器需要阴影效果
        let containerBox = document.getElementById('pageDIV');
        containerBox.appendChild(this.renderer.domElement);
      //   document.body.appendChild(this.renderer.domElement);
     },

     initScene() {
       this.scene = new THREE.Scene();
     },

     initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 15);
     },

     initLight() {
        this.scene.add(new THREE.AmbientLight(0x444444));
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(0, 20, 20 );
        this.light.castShadow = true;
        this.light.shadow.camera.top = 10;
        this.light.shadow.camera.bottom = -10;
        this.light.shadow.camera.left = -10;
        this.light.shadow.camera.right = 10;
        this.//告诉平行光需要开启阴影投射
        this.light.castShadow = true;
        this.scene.add(light);
     },

     initModel() {
      //  /辅助工具
        var helper = new THREE.AxesHelper(50);
        this.scene.add(helper);

        //添加立方体
        var geometry = new THREE.BoxBufferGeometry( 10, 5, 5 );

        //获取到video对象
        var video = document.querySelector("#video");
        //通过video对象实例化纹理
        var texture = new THREE.VideoTexture(video);
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        var material = new THREE.MeshBasicMaterial( { map: texture } );

        this.scene.add(new THREE.Mesh(geometry, material));
     },

     initControls() {
      //  this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      //  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
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
        this.controls.maxDistance = 2000;
        //是否开启右键拖拽
        this.controls.enablePan = true;
     },


     onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
     },

   //   animate() {
   //      //更新控制器
   //      // this.render();

   //      //更新性能插件
   //      // this.stats.update();

   //      // this.controls.update();

   //      this.renderer.render(this.scene, this.camera);

   //      requestAnimationFrame(animate);
   //   },





//       // 获取当前可视区域的宽高部分
//       getClientSize() {
//         this.clientHeight = window.innerHeight,
//         this.clientWidth = window.innerWidth
//       },

//       onWindowResize() {
//         window.addEventListener("resize", this.onResize, !0);
//       },

//       onResize() {
//         this.getClientSize();
//         this.camera.aspect = this.clientWidth / this.clientHeight;
//         this.camera.updateProjectionMatrix();
//         this.renderer.setSize(this.clientWidth, this.clientHeight);
//       },

//       init() {
//         // 在Three.js中添加的物体都是添加到场景中的，因此它相当于一个大容器。一般说，场景里没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。
//         this.scene = new THREE.Scene();

//         let three = document.getElementById("three");
//         // 第一个属性是视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的值是一个角度。
//         // 第二个值是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的比值。比如说，当你在一个宽屏电视上播放老电影时，
//         // 可以看到图像仿佛是被压扁的。
//         this.camera = new THREE.PerspectiveCamera(45, this.clientWidth / this.clientHeight, 0.1, 1000);
//         // 设置相机位置
//         this.camera.position.set(200, 300, 200);  // 设置摄像头 camera 的 position
//         this.scene.add(this.camera);    // 把摄像机添加到场景里去

//         this.renderer = new THREE.WebGLRenderer({
//             antialias: !0,
//             alpha: !0
//         });
        
//         this.renderer.setSize(this.clientWidth, this.clientHeight);
//         three.appendChild(this.renderer.domElement);
//         this.initBox()
//       },

//       // 初始化创建网格模型
//       initBox() {
//         this.initVideoTextures();
//         // 创建一个立方体几何对象
        
//         this.geometry = new THREE.SphereBufferGeometry(500, 60, 40);
//         // this.geometry = new THREE.BoxGeometry(887 / 32, 509 / 32, 10);
//         // 创建材质对象
//         this.material = new THREE.MeshBasicMaterial({
//             map: this.texture
//         });
//         this.cube = new THREE.Mesh(this.geometry, this.material);
//         this.cube.position.z = -6;
//         this.scene.add(this.cube);
//       },

//       // 初始化 video 纹理
//       initVideoTextures() {
//         this.videoDom = document.getElementById("video");
//         this.texture = new THREE.VideoTexture(this.videoDom);
//         this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
//         this.texture.minFilter = THREE.LinearFilter;
//         this.texture.needsUpdate = true;
//       },

//       // 全局处理鼠标移动事件，进行判断处理展示界面中文字 style 样式信息
//       handleMouseMove(event) {
//         let 
//           widthX = event.clientX - this.clientWidth / 2, 
//           heightY = -(event.clientY - this.clientHeight / 2);

//         this.camera.lookAt(new THREE.Vector3(200, 200, 3));
//       },

//       // 做动画的方法
//       animate() {
//         // 开启帧动画，每次浏览器执行刷新的时候执行该动画
//         this.renderer.render(this.scene, this.camera);
//         requestAnimationFrame(this.animate);
//       },

// // 初始化 three
//       initThree() {
//         this.init();  // 初始化部分
//         this.animate();   // 开启动画
//       },




   }
}
</script>

<style scoped>
  html, body {
            margin: 0;
            height: 100%;
        }

        canvas {
            display: block;
        }

        #pageDIV {
           height: 600px;
        }

        #video{
            position: fixed;
            left:0;
            bottom:0;
        }
</style>
