<!--
 * @Author: jiwenjie5
 * @Date: 2021-04-08 17:42:49
 * @LastEditors: jiwenjie5
 * @LastEditTime: 2021-04-08 19:16:12
 * @FilePath: \hui-vue-mastere:\VsWorkSpace\eyepetizer-web\src\App.vue
 * @Github: 
-->
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
