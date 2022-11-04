import hyRequest from '@/service/request'

export  function getHotSuggest(){
  return hyRequest.get({
    url:'/home/hotSuggests'
  })
}

export function getCategories(){
  return hyRequest.get({
    url:'/home/categories'
  })
}

export function getHouseList(currentPage) {
  return hyRequest.get({
    url: '/home/houselist',
    params: {
      page:currentPage
    }
  }) 
}
