import { defineStore } from 'pinia'
import { getHotSuggest,getCategories,getHouseList } from '@/service';

const useHomeStore = defineStore('home', {
  state: () => {
    return {
      hotSuggests: [],
      categories: [],
      currentPage:1,
      houseList:[],
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
    },
    // 获取房屋列表
    async fetchHouseList() {
      const res = await getHouseList(this.currentPage)
      // 追加
      this.houseList.push(...res.data)
      // 页码要加一
      this.currentPage++
    }
  }
})

export default useHomeStore