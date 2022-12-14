import { defineStore } from 'pinia'

const nowDate = new Date()
const newDate = new Date().setDate((new Date().getDate() + 1))

const useMainStore = defineStore('main',{
  state: () => {
    return {
      startDate:nowDate,
      endDate: newDate,
      // 加载动画
      isLoading:false
    }
  }
})

export default useMainStore