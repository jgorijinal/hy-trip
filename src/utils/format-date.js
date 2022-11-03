import dayjs from 'dayjs'

// 格式化日期
export function formatDate(date) {
  return dayjs(date).format('MM月DD日')
}
// 获取相差几天
export function getDiffDays(startDate , endDate) {
  return dayjs(endDate).diff(startDate,'day')
}