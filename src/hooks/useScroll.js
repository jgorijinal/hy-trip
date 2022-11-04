// 监听是否到达了页面的底部
import { ref,onMounted, onUnmounted ,onActivated,onDeactivated} from 'vue';
export default function useScroll() {
  // 是否到达底部
  const isReachBottom = ref(false)
  
  const scrollListener = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    if (scrollHeight <= clientHeight + scrollTop) {
      isReachBottom.value = true
    }
  }

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
    isReachBottom
  }
} 