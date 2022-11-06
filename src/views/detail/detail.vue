<template>
  <div class="detail" ref="detailRef">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--轮播图-->
    <div class="main" v-if="mainPart">
      <detail-swipe  :swipe-data="mainPart.topModule.housePicture.housePics"/>
        <!--信息-->
      <detail-info  :top-infos="mainPart.topModule" />
      <!--房屋设施-->
      <detail-facility  :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <!--房东介绍-->
      <detail-landlord :landlord="mainPart.dynamicModule.landlordModule"/>
      <!--评论-->
      <detail-comment  :comment="mainPart.dynamicModule.commentModule"/>
      <!--预定须知-->
      <detail-notice  :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <!--百度地图-->
      <detail-map  :position="mainPart.dynamicModule.positionModule"/>
      <!--介绍-->
      <detail-intro :price-intro="mainPart.introductionModule"/>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
      <!--标签页(滑动时出现)-->
  <div class="tab-control" v-if="tabVisible">
    <van-tabs v-model:active="tabActive" @click-tab="clickTab">
      <template v-for="title,index in tabTitles" :key="index">
        <van-tab :title="title"></van-tab>
      </template>
    </van-tabs>
  </div>
  </div>
</template>
<script setup>
import { useRouter,useRoute } from 'vue-router';
import { getDetailInfos } from '@/service/modules/detail'
import { ref, computed,watch,onMounted } from 'vue'
import detailSwipe from './cpns/detail-01-swipe.vue';
import detailInfo from './cpns/detail-02-info.vue';
import detailFacility from './cpns/detail-03-facility.vue';
import detailLandlord from './cpns/detail-04-landlord.vue';
import detailComment from './cpns/detail-05-comment.vue';
import detailNotice from './cpns/detail-06-notice.vue';
import detailMap from './cpns/detail-07-map.vue';
import detailIntro from './cpns/detail-08-intro.vue';
import  useScroll from '@/hooks/useScroll'
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

// 显示/隐藏 标签页 
const tabVisible = ref(false)
const tabActive = ref(0)
// tab 标题
const tabTitles = ['描述', '设施', '房东', '评论', '须知', '周边']
const detailRef = ref()
const { scrollTop } = useScroll(detailRef) 
watch(scrollTop, (newTop) => {
  console.log(newTop)
  if (newTop > 300) {
    tabVisible.value = true
  } else {
    tabVisible.value = false
  }
})
const clickTab = (obj) => {
  
}
</script>
<style lang="less" scoped>
.detail {
  height: 100vh;
  overflow: auto;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
.tab-control {
  position:fixed;
  left:0;
  right:0;
  top:0;
  z-index:99;
}
</style>
