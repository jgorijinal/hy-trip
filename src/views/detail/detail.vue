<template>
  <div class="detail">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--轮播图-->
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
        <!--信息-->
      <detail-info :top-infos="mainPart.topModule" />
      <!--房屋设施-->
      <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
    </div>
  </div>
</template>
<script setup>
import { useRouter,useRoute } from 'vue-router';
import { getDetailInfos } from '@/service/modules/detail'
import { ref, computed } from 'vue'
import detailSwipe from './cpns/detail-01-swipe.vue';
import detailInfo from './cpns/detail-02-info.vue';
import detailFacility from './cpns/detail-03-facility.vue';
const router = useRouter()
const route = useRoute()
// 返回键
const onClickLeft = () => {
  router.back()
}
// 总详情数据
const detailInfos = ref({})
// 发请求获取
getDetailInfos(route.params.id).then(res => {
  detailInfos.value = res.data
  console.log(res.data)
})
// mainPart 数据
const mainPart = computed(() => detailInfos.value.mainPart)

</script>
<style lang="less" scoped>
.detail {
  height: 100vh;
}
</style>
