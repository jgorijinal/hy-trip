<template>
  <div class="home-search-box">
    <div class="location">
    <div class="city" @click="$router.push('/city')">{{currentCity.cityName}}</div>
    <div class="position" @click="positionClick">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>
   <!--选择日期范围-->
   <div class="section item date-range" @click="calendarVisible = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{startDate}}</span>
        </div>
        <div class="stay">共一晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">商店</span>
          <span class="time">{{endDate}}</span>
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
</template>
<script setup>
import useCityStore from '@/store/modules/city';
import { formatDate } from '@/utils/format-date';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
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
const startDate = ref(formatDate(new Date()))
const endDate = ref(formatDate(new Date().setDate((new Date().getDate() + 1))))

// 日历显示/隐藏
const calendarVisible = ref(false)
// 日历点击了确定
const onConfirm = (value) => {
  startDate.value = formatDate(value[0])
  endDate.value = formatDate(value[1])
  calendarVisible.value = false
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
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
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
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

</style>