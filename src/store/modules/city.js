import { defineStore } from 'pinia'
import { getCityAll } from '@/service'

const useCityStore = defineStore('city', {
  state:()=> {
    return {
      allCities: {},
      currentCity:  {
        "cityId": 48,
        "cityName": "北京",
        "pinYin": "beijing",
        "gangAoTai": false,
        "hot": false,
        "longitude": "116.414",
        "latitude": "39.9108"
      },
    }
  },
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
}) 

export default useCityStore