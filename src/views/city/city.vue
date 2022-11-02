<template>
  <div class="city">
    <div class="city-top">
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
        <van-tab :title="value.title" :name="key"></van-tab>
      </template>
    </van-tabs>
    </div>
    <!--城市内容-->
    <div class="content">
      <template v-for="value,key,index in allCities" :key="index">
        <city-group v-show="key === tabActive" :current-group="value" />
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref ,computed} from "vue";
import { useRouter } from "vue-router";
import useCityStore from '@/store/modules/city'
import { storeToRefs } from 'pinia';
import cityGroup from './cpns/city-group.vue';
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
// 激活的标签页索引 -> 没有配 van-tab的 name 属性的话是索引值, 如果传了 name 就是 name 属性
const tabActive = ref()
// pinia 城市数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 激活的标签页 城市数据
const currentGroup = computed(()=> allCities.value[tabActive.value])
</script>
<style lang="less" scoped>
.content {
  height:calc(100vh - 98px);
  overflow-y: auto;
}
.city-top {
  position:relative;
  z-index:9;
}
</style>
