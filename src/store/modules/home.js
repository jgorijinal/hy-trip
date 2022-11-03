import { defineStore } from 'pinia'
import { getHotSuggest,getCategories } from '@/service';

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
    },
    // 获取分类列表
    async fetchCategories() { 
      const res = await getCategories()
      this.categories = res.data
    }
  }
})

export default useHomeStore