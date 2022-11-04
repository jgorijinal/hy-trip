<template>
  <div class="home-search-box">
    <div class="location bottom-gray-line">
    <div class="city" @click="$router.push('/city')">{{currentCity.cityName}}</div>
    <div class="position" @click="positionClick">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>
   <!--选择日期范围-->
   <div class="section item date-range bottom-gray-line" @click="calendarVisible = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{startDateStr}}</span>
        </div>
        <div class="stay">共 {{diffDays}} 晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">商店</span>
          <span class="time">{{endDateStr}}</span>
        </div>
      </div>
    </div>
    <van-calendar 
      v-model:show="calendarVisible" 
      @confirm="onConfirm" 
      color="#ff9854"
      type="range" 
      :round="false"
    />
  </div>
  <!-- 价格/人数选择 -->
  <div class="section price-counter bottom-gray-line">
    <div class="start">价格不限</div>
    <div class="end">人数不限</div>
  </div>
  <!-- 关键字 -->
  <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
  <!--热门搜索建议-->
  <div class="section hot-suggests" bottom-gray-line>
    <template v-for="item,index in hotSuggests" :key="index">
      <div class="item" :style="{color:item.tagText.color,backgroundColor:item.tagText.background.color}">
        {{item.tagText.text}}
      </div>
    </template>
  </div>
  <!--搜索按钮-->
  <div class="section search-btn">
    <div class="search-btn-item" @click="searchClick">开始搜索</div>
  </div>
</template>
<script setup>
import useCityStore from '@/store/modules/city';
import { formatDate,getDiffDays } from '@/utils/format-date';
import { storeToRefs } from 'pinia';
import { ref,computed } from 'vue'
import useHomeStore from '@/store/modules/home';
import { useRouter } from 'vue-router'
import  useMainStore from '@/store/modules/main.js'
function getPosition() {
        if(navigator.geolocation){
            //navigator.geolocation.getCurrentPosition这个方法里面有三个参数
            //这个会在界面拉出一个消息框，让用户确认是否允许获取位置,不过pc端我试了都是err，
            //参1，成功后执行的函数
            //参2，失败时执行的函数
            //参3，选项配置，下面是在3000毫秒内结束请求
            navigator.geolocation.getCurrentPosition(
                position => {
                    var latitude = position.coords.latitude;//纬度
                    var longitude = position.coords.longitude;//经度
                    console.log("Latitude : " + latitude + " Longitude: " + longitude);
                    console.log(position)
                },
                function (err) {
                    console.log("您的浏览器不支持此项技术")
                },
                {timeout : 3000}
            )
        }
}
// 点击获取位置信息
const positionClick = () =>{
  getPosition();
}

const cityStore = useCityStore()
// pinia 中获取到当前所选的城市
const { currentCity } = storeToRefs(cityStore)

// 日期范围
// 日期保存在了 useMainStore 里面
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(()=> formatDate(startDate.value))
const endDateStr = computed(()=>formatDate(endDate.value))
// 相差的天数
const diffDays = ref(getDiffDays(startDate.value, endDate.value))

// 日历显示/隐藏
const calendarVisible = ref(false)
// 日历点击了确定
const onConfirm = (value) => {
  startDate.value = value[0]
  endDate.value = value[1]
  
  calendarVisible.value = false
  diffDays.value = getDiffDays(value[0],value[1])
}

// 获取热门建议 : 网络请求在 home.vue 页面发了, 这里获取热门建议数据
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 点击搜索按钮
const router = useRouter()
const searchClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity:currentCity.value.cityName
    }
  })
}
</script>
<style lang="less" scoped>
  .location {
  display: flex;
  align-items: center;
  height:50px;
  padding:0 20px;
  .city {
    flex:1;
  }
  .position {
    display: flex;
    align-items: center;
    .text {}
    img{width:18px;height:18px;margin-left:6px;}
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 52px;

  .start {
    flex: 1;
    display: flex;
    height: 52px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  height: 52px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.price-counter {
  .start {
    border-right: 1px solid #f8f7f6;
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 6px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1;
  }
}

.search-btn {
  display: flex;
  &-item {
    flex:1;
    border-radius:20px;
    background-image: linear-gradient(to right , #ff9854, #ffc654);
    padding:10px;
    color:white;
    display: flex;
    justify-content: center;
    font-size:18px;
  }
}
</style>