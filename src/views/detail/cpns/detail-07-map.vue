<template>
  <div class="map">
    <detail-section title="周边位置" more-text="查看更多周边">
      <div class="map-item" ref="mapRef"></div>
    </detail-section>
  </div>
</template>
<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';
import { ref,onMounted } from 'vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref(null)
onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);         // 创建地图实例
  // var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标 
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);  // 创建点坐标 
  map.centerAndZoom(point, 15);                   // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true);                //开启鼠标滚轮缩放

  const marker = new BMapGL.Marker(point);        // 创建锚点
  map.addOverlay(marker);                      // 添加锚点
})
</script>
<style lang="less" scoped>
.map-item {
  height:300px;
}
</style>