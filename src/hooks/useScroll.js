// 监听是否到达了页面的底部
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import { throttle } from 'underscore'
export default function useScroll(elRef) {
  console.log(elRef.value)
  let el = window
  // 是否到达底部
  const isReachBottom = ref(false)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)
  const scrollTop = ref(0)

  const scrollListener = throttle(() => {
    if(el === window) {
      scrollHeight.value = document.documentElement.scrollHeight
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
    } else {
      scrollHeight.value = el.scrollHeight
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
    }
    if (scrollHeight.value <= clientHeight.value + scrollTop.value) {
      isReachBottom.value = true
    }
  },200)
  onMounted(() => { 
    if(elRef){
      el = elRef.value
    }
    console.log(el)
    el.addEventListener('scroll', scrollListener)
  })
  onActivated(() => {
    el.addEventListener('scroll', scrollListener)
  })
  // 取消监听
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListener)
  })
  onDeactivated(() => {
    el.removeEventListener('scroll', scrollListener)
  })
  return {
    isReachBottom,clientHeight,scrollHeight,scrollTop
  }
} 
