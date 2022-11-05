import  hyRequest  from '@/service/request';

export function getDetailInfos(houseId) {
  return hyRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
} 