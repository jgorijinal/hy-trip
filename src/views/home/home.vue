<template>
  <div class="home">
    <nav-bar title="安逸旅途"></nav-bar>
  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="">
  </div>
  <!--搜索盒子-->
  <home-search-box />
  <!--分类列表-->
  <home-categories />
  <!--房屋列表-->
  <home-house-list />
  <!--搜索框(滑动页面会出现)-->
  <Transition  name="slide">
    <div class="search-wrapper" v-if="searchVisible">
      <search-bar />
    </div>
  </Transition>
</div>
</template>
<script setup>
import navBar from '@/components/navBar/navBar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeCategories from './cpns/home-categories.vue';
import useHomeStore from '@/store/modules/home';
import homeHouseList from './cpns/home-house-list.vue';
import useScroll from '@/hooks/useScroll'
import { watch, ref } from 'vue'
import searchBar from '@/components/search-bar/search-bar.vue';
// 调用 action : 获取热门剪辑
const homeStore = useHomeStore()
homeStore.fetchHotSuggests()
homeStore.fetchCategories()
homeStore.fetchHouseList()

// 使用监听到达页面底部的  Hooks
const {isReachBottom } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue === true) {
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false
    })
  }
})
// 搜索栏的 显示/隐藏
const searchVisible = ref(false)
// Hooks 获滚动的高度
const { scrollTop } = useScroll()
watch(scrollTop, (newValue) => {
  if (newValue > 350) {
    searchVisible.value = true
  } else {
    searchVisible.value = false
  }
})
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
.search-wrapper {
  position:fixed;
  left:0;
  top:0;
  right:0;
  padding:10px;
  background-color: white;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from, .slide-leave-to {
  transform:translateY(-100%);
}
</style>