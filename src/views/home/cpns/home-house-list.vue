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
import useScroll from '@/hooks/useScroll'
import { watch } from 'vue'
// 房屋列表 : Pinia 里获取
const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

// 记载更多按钮
const moreListClick = () => {
  homeStore.fetchHouseList()
}

// 使用监听到达页面底部的  Hooks
const {isReachBottom } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue === true) {
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false
    })
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