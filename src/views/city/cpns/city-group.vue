<template>
  <div class="city-group">
    <van-index-bar>
      <template v-for="(group, index) in currentGroup?.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, index) in group.cities" :key="index">
          <van-cell :title="city.cityName" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>
<script setup>
const props = defineProps({
  // 城市数据
  currentGroup: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<style lang="less" scoped></style>
