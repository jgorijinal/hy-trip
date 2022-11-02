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
      <van-tab title="国内·港澳台"></van-tab>
      <van-tab title="国外"></van-tab>
    </van-tabs>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCityAll } from '@/service'
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

const getAllCities = async () => {
  const res = await getCityAll()
  console.log(res.data)
}
getAllCities()
</script>
<style lang="less" scoped></style>
