<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <!--热门城市-->
      <van-index-anchor index="#">热门</van-index-anchor>
      <div class="hotCity">
        <template v-for="hotCity,index in currentGroup.hotCities" :key="index">
          <div class="hotCity-item" @click="cityClick(hotCity)">{{hotCity.cityName}}</div>
        </template>
      </div>
      <template v-for="(group, index) in currentGroup?.cities" :key="index">
        <!--城市数据-->
        <van-index-anchor :index="group.group" />
        <template v-for="(city, index) in group.cities" :key="index">
          <van-cell :title="city.cityName"  @click="cityClick(city)"/>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import  useCityStore from "@/store/modules/city"
import { useRouter } from 'vue-router';
const props = defineProps({
  // 城市数据
  currentGroup: {
    type: Object,
    default: () => ({}),
  },
});

// 索引值
const indexList = computed(() => {
  const alphabetList = props.currentGroup.cities.map(item => item.group)
  return ['#', ...alphabetList] 
})

// pinia 中的 cityStore
const cityStore = useCityStore()
// 点击城市
const router = useRouter()
const cityClick = (city) => {
  cityStore.currentCity = city
  router.back()
}

</script>
<style lang="less" scoped>
.hotCity {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding:0 10px;
  padding-right: 20px;
  &-item {
    width:78px;
    margin:6px 0;
    height:28px;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    border-radius:16px;
  }
}
</style>
