<template>
  <div class="tabBar-container">
    <template v-for="item,index in tabBarData" :key="index">
      <div class="tabBar-item" @click="itemClick(index)">
        <img v-if="currentIndex === index" :src="getAssetUrl(item.imageActive)" alt="">
        <img v-else :src="getAssetUrl(item.image)" alt="">
        <span class="tabBar-item-text" :class="{active:currentIndex === index}">{{item.text}}</span>
      </div>
    </template>
  </div>
</template>
<script setup>
import {ref} from 'vue'
// tabBar 数据
const tabBarData = [
  {
    text: '首页',
    image: 'tab_home.png',
    imageActive: 'tab_home_active.png',
    path:'/home'
  },
  {
    text: '收藏',
    image: 'tab_favor.png',
    imageActive: 'tab_favor_active.png',
    path:'/favor'
  },
  {
    text: '订单',
    image: 'tab_order.png',
    imageActive: 'tab_order_active.png',
    path:'/order'
  },
  {
    text: '消息',
    image: 'tab_message.png',
    imageActive: 'tab_message.png',
    path:'/message'
  }
]
// 获取图片的正确路径
function getAssetUrl(image) {
  // new Url()
  // 参数一 : 相对路径
  // 参数二 : 当前路径 -> 可以使用 import.meta.url 获取到
  return new URL(`../../assets/img/tabBar/${image}`, import.meta.url).href
}

// 当前 导航页index
const currentIndex = ref(0)
// 点击 某一个导航栏
const itemClick = (index) => {
  currentIndex.value = index
}

</script>
<style lang="less" scoped>
.tabBar-container{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  height:50px;
  display: flex;
  align-items: center;
  border-top:1px solid #e3e0e0;
  .tabBar-item {
    display: flex;
    justify-content: center;
    align-items:center;
    flex-grow:1;
    flex-direction: column;
    img {width:35px;}
    &-text {
      font-size:12px;
      &.active {
        color:var(--primary-color);
      }
    }
  }
}
</style>
