<template>
  <div class="detail" ref="detailRef">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--轮播图-->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe  :swipe-data="mainPart.topModule.housePicture.housePics"/>
        <!--信息-->
      <detail-info name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
      <!--房屋设施-->
      <detail-facility name="设施" :ref="getSectionRef"  :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <!--房东介绍-->
      <detail-landlord name="房东" :ref="getSectionRef"  :landlord="mainPart.dynamicModule.landlordModule"/>
      <!--评论-->
      <detail-comment name="评论" :ref="getSectionRef"  :comment="mainPart.dynamicModule.commentModule"/>
      <!--预定须知-->
      <detail-notice name="须知" :ref="getSectionRef"  :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <!--百度地图-->
      <detail-map name="周边" :ref="getSectionRef"  :position="mainPart.dynamicModule.positionModule"/>
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
})
// mainPart 数据
const mainPart = computed(() => detailInfos.value.mainPart)

// 显示/隐藏 标签页 
const tabVisible = ref(false)
const tabActive = ref(0)
// 总detail页面的 ref
const detailRef = ref()
const { scrollTop } = useScroll(detailRef) 
watch(scrollTop, (newTop) => {
  if (newTop > 270) {
    tabVisible.value = true
  } else {
    tabVisible.value = false
  }
})
const sectionEls = ref({}) // sectionEls是一个对象
const getSectionRef = (value) => {
  // value.$el 是对应组件的元素
  const name = value?.$el.getAttribute('name') 
  sectionEls.value[name] = value?.$el 
}
// 标签页标题 数组
const tabTitles = computed(() => {
  return Object.keys(sectionEls.value)
})
const clickTab = (obj) => { // 点击 tab
  // 元素到顶部的距离
  let offsetTop
  if (obj.title === '描述') {
    offsetTop = sectionEls.value[obj.title].offsetTop  - 4
  } else {
    offsetTop = sectionEls.value[obj.title].offsetTop - 44
  }
  detailRef.value && detailRef.value.scrollTo({
    top: offsetTop,
    behavior: "smooth"
  })
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
