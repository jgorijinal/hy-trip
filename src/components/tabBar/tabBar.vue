<template>
  <div class="tabBar-container">
    <template v-for="item,index in tabBarData" :key="index">
      <div class="tabBar-item" @click="itemClick(item,index)">
        <img v-if="currentIndex === index" :src="getAssetUrl(item.imageActive)" alt="">
        <img v-else :src="getAssetUrl(item.image)" alt="">
        <span class="tabBar-item-text" :class="{active:currentIndex === index}">{{item.text}}</span>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { getAssetUrl } from '@/utils/get-asset-url'
import tabBarData from '@/assets/data/tabBar'
const router = useRouter()
// 当前 导航页index
const currentIndex = ref(0)

// 点击 某一个导航栏
const itemClick = (item,index) => {
  currentIndex.value = index
  router.push(item.path)
}

</script>
<style lang="less" scoped>
.tabBar-container{
  position:fixed;
  bottom:-1px;
  left:0;
  right:0;
  height:50px;
  display: flex;
  align-items: center;
  border-top:1px solid #e3e0e0;
  background-color: white;
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
