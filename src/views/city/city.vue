<template>
  <div class="city">
    <!--搜索框-->
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!--标签页-->
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <template v-for="value,key,index in allCities" :key="key">
        <van-tab :title="value.title"></van-tab>
      </template>
    </van-tabs>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useCityStore from '@/store/modules/city'
import { storeToRefs } from 'pinia';
// 搜索值
const searchValue = ref("");
const router = useRouter();
// 搜索
const onSearch = () => {
  console.log("搜索");
};
// 点击取消
const onCancel = () => {
  console.log("取消");
  router.back();
}; 
// 激活的标签页索引
const tabActive = ref(0)

const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
</script>
<style lang="less" scoped></style>
