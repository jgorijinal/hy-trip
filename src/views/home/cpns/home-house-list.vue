<template>
  <div class="house-list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <house-item-v9 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="itemClick(item.data)"/>
        <house-item-v3 v-if="item.discoveryContentType === 3" :item-data="item.data" @click="itemClick(item.data)"/>
      </template>    
  </div>
</template>
<script setup>
import useHomeStore from '@/store/modules/home';
import { storeToRefs } from 'pinia';
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
import { useRouter } from 'vue-router';
// 房屋列表 : Pinia 里获取
const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

const router = useRouter()
// 点击房屋 -> 进入详情页面
const itemClick = (item) => {
  // 跳转 , 携带参数
  router.push(`/detail/${item.houseId}`)
}
</script>
<style lang="less" scoped>
  .house-list {
    padding:6px;
    display: flex;
    flex-wrap: wrap;
  }
</style>