<template>
  <div class="home">
    <nav-bar title="安逸旅途"></nav-bar>
  </div>
  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="">
  </div>
  <home-search-box />
</template>
<script setup>
import navBar from '@/components/navBar/navBar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
</script>
<style lang="less" scoped>
.banner{
  img {
    width:100%
  }
}
</style>