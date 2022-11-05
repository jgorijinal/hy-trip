<template>
  <div class="loading" v-if="mainStore.isLoading" @click="loadingClick">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
      <span class="text">加载中...</span>
    </div>
  </div>
</template>
<script setup>
import useMainStore from '@/store/modules/main';
const mainStore = useMainStore()
// 点击了遮罩层的某一位置
const loadingClick = () => {
  useMainStore.isLoading = false
}
</script>
<style lang="less" scoped>
  .loading {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index:999;
    display: flex;
    justify-content: center;
    align-items: center;
    .bg {
      width:104px;
      height:104px;
      background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position:relative;
      img {
        width:70px;
        height:70px;
        margin-bottom:8px;
      }
      .text {
        position:absolute;
        bottom:20%;
        transform:translateX(10%);
        color: rgb(103, 101, 101);
      }
    }
  }
</style>