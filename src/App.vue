<template>
  <div id="app">
    <router-view />
    <alert></alert>
  </div>
</template>

<script>
import alert from '@/components/FrontEnd/MessageComponents/MessageAlert'
export default {
  name: "App",
  components:{
    alert
  }
};
</script>

<style lang='scss'>
@import "./assets/all";
</style>
