<template>
  <div class="house-list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <div v-if="item.discoveryContentType === 9">type 9 - {{item.data.houseName}}</div>
        <div v-else-if="item.discoveryContentType === 3">type 3 - {{item.data.houseName}}</div>
      </template>    
  </div>
  <button @click="moreListClick">加载更多</button>
</template>
<script setup>
import useHomeStore from '@/store/modules/home';
import { storeToRefs } from 'pinia';

// 房屋列表 : Pinia 里获取
const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

// 记载更多按钮
const moreListClick = () => {
  homeStore.fetchHouseList()
}
</script>
<style lang="less" scoped>
  
</style>