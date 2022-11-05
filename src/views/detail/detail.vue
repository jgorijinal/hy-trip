<template>
  <div class="detail">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>
<script setup>
import { useRouter,useRoute } from 'vue-router';
import { getDetailInfos } from '@/service/modules/detail'
import { ref,computed } from 'vue'
const router = useRouter()
const onClickLeft = () => {
  router.back()
}

const route = useRoute()
const detailInfos = ref({})
getDetailInfos(route.params.id).then(res => {
  detailInfos.value = res.data
  console.log(detailInfos.value)
})

const mainPart = computed(() => detailInfos.value.mainPart)

</script>
<style lang="less" scoped>
.detail {
  height: 100vh;
}
</style>
