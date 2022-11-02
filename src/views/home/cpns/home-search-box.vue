<template>
  <div class="home-search-box">
    <div class="location">
    <div class="city">广州</div>
    <div class="position" @click="positionClick">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>
  </div>
</template>
<script setup>
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
</style>