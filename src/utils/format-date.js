import dayjs from 'dayjs'

// 格式化日期
export function formatDate(date,format='MM月DD日') {
  return dayjs(date).format(format)
}
// 获取相差几天
export function getDiffDays(startDate , endDate) {
  return dayjs(endDate).diff(startDate,'day')
}