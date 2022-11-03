<template>
  <div class="home-categories">
    <template v-for="item in categories" :key="item.id">
      <div class="home-categories-item">
        <img :src="item.pictureUrl" alt="">
        <span class="text">{{item.title}}</span>
      </div>
    </template>
  </div>
</template>
<script setup>
import useHomeStore from '@/store/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)

</script>
<style lang="less" scoped>
.home-categories {
  display: flex;
  overflow-x: auto;
  padding:16px 4px;
  &::-webkit-scrollbar { width: 0 !important }
  &-item {
    width:70px;
    display: flex;
    flex-direction: column; 
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    padding:4px;
    img{
      width:30px;
    }
    .text{
      margin-top:6px;
      font-size: 14px;
    }
  }
}
</style>