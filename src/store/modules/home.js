import { defineStore } from 'pinia'
import { getHotSuggest } from '@/service/modules/home';

const useHomeStore = defineStore('home', {
  state: () => {
    return {
      hotSuggests: [],
      categories:[]
    }
  },
  actions: {
    // 获取热门建议
    async fetchHotSuggests() {
      const res = await getHotSuggest()
      this.hotSuggests = res.data
    }
  }
})

export default useHomeStore