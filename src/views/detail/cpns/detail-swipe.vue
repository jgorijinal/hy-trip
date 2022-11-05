<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <!--轮播图图片 (v-for 循环)-->
      <template v-for="item in swipeData" :key="item.orderIndex">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!--自定义指示器-->
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="value,key,index in swipeGroup" :key="index">
            <span class="indicator-item" :class="{active : Number(key) === swipeData[active]?.enumPictureCategory}">
              <span class="text">{{getTitle(value[0].title)}}</span>
              <span class="index" v-if=" Number(key) === swipeData[active]?.enumPictureCategory">
                {{value.findIndex(item=> item === swipeData[active]) + 1}} / {{value.length}}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script setup>
// props 接受 : 轮播图的数据
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});
console.log(props.swipeData)
// 数据转化
const swipeGroup = {}
props.swipeData.forEach(item => {
  let values = swipeGroup[item['enumPictureCategory']]
  if (!values) {
    values = []
    swipeGroup[item['enumPictureCategory']] = values
  }
  values.push(item)
})

const getTitle = (str) => {
  return str.replace('：','').replace('【','').replace('】','')
}
</script>
<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item{
      img {
        width:100%;
      }
    }
  }
}
.indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(36, 36, 36, 0.6);
    color:white;
    &-item {
      margin:0 6px;
      &.active {
        background-color: white;
        color: black;
        padding:1px 3px;
        border-radius:4px;
      }
    }
  }
</style>
