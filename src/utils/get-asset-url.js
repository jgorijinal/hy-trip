// 获取图片的正确路径
export function getAssetUrl(image) {
  // new Url()
  // 参数一 : 相对路径
  // 参数二 : 当前路径 -> 可以使用 import.meta.url 获取到
  return new URL(`../assets/img/tabBar/${image}`, import.meta.url).href
}
