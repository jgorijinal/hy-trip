<template>
  <div class="home">
    <nav-bar title="安逸旅途"></nav-bar>
  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="">
  </div>
  <!--搜索框-->
  <home-search-box />
  <!--分类列表-->
  <home-categories />
  <!--房屋列表-->
  <home-house-list />
</div>
</template>
<script setup>
import navBar from '@/components/navBar/navBar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeCategories from './cpns/home-categories.vue';
import useHomeStore from '@/store/modules/home';
import homeHouseList from './cpns/home-house-list.vue';
// 调用 action : 获取热门剪辑
const homeStore = useHomeStore()
homeStore.fetchHotSuggests()
homeStore.fetchCategories()
homeStore.fetchHouseList()
</script>
<style lang="less" scoped>
.home {
  padding-bottom:51px;
}
.banner{
  img {
    width:100%
  }
}
</style>