<template>
  <div class="home">
    <nav-bar title="安逸旅途"></nav-bar>
  </div>
  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="">
  </div>
  <div class="location">
    <div class="city">广州</div>
    <div class="position">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>
</template>
<script setup>
import navBar from '@/components/navBar/navBar.vue';
</script>
<style lang="less" scoped>
.banner{
  img {
    width:100%
  }
}
.location {
  display: flex;
  align-items: center;
  height:50px;
  padding:0 20px;
  .city {
    flex:1;
  }
  .position {
    display: flex;
    align-items: center;
    .text {}
    img{width:18px;height:18px;margin-left:6px;}
  }
}
</style>