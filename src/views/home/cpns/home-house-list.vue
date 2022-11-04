<template>
  <div class="house-list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <house-item-v9 v-if="item.discoveryContentType === 9" :item-data="item.data"/>
        <house-item-v3 v-if="item.discoveryContentType === 3" :item-data="item.data"/>
      </template>    
  </div>
  <button @click="moreListClick">加载更多</button>
</template>
<script setup>
import useHomeStore from '@/store/modules/home';
import { storeToRefs } from 'pinia';
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
// 房屋列表 : Pinia 里获取
const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

// 记载更多按钮
const moreListClick = () => {
  homeStore.fetchHouseList()
}

// 监听滚动事件, 加载更多
window.addEventListener('scroll', () => {
  // 用户实际滚动的高度
  const scrollTop = document.documentElement.scrollTop
  // 窗口的静态高度
  const clientHeight = document.documentElement.clientHeight
  // 这个页面的可滚动的高度
  const scrollHeight = document.documentElement.scrollHeight
  // 所以当用户滚动到底部是 , scrollHeight = clientHeight + scrollTop
  console.log(scrollTop, clientHeight, scrollHeight)
  if (scrollHeight <= clientHeight + scrollTop) {
    // 再发请求
    homeStore.fetchHouseList()
  }
})
</script>
<style lang="less" scoped>
  .house-list {
    padding:6px;
    display: flex;
    flex-wrap: wrap;
  }
</style>