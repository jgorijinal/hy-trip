// 监听是否到达了页面的底部
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import { throttle } from 'underscore'
export default function useScroll() {
  // 是否到达底部
  const isReachBottom = ref(false)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)
  const scrollTop = ref(0)

  const scrollListener = throttle(() => {
    scrollHeight.value = document.documentElement.scrollHeight
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    if (scrollHeight.value <= clientHeight.value + scrollTop.value) {
      isReachBottom.value = true
    }
  },200)
  onMounted(() => {
    window.addEventListener('scroll', scrollListener)
  })
  onActivated(() => {
    window.addEventListener('scroll', scrollListener)
  })
  // 取消监听
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListener)
  })
  onDeactivated(() => {
    window.removeEventListener('scroll', scrollListener)
  })
  return {
    isReachBottom,clientHeight,scrollHeight,scrollTop
  }
} 
