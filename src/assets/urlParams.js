const arr = window.location.search.slice(1).split('&')
const json = {
  extraComponents: {}, // 额外的组件 如：团购 extraComponents=groupBuy,xxx,oxx 多个用逗号隔开
  extraMenus: {}, // 额外的菜单 如：公共广告 extraMenus=AdvertPage,xxx,oxx 多个用逗号隔开
  goods: {} // 额外的商品功能按钮 如：规格 goods=specification,xxx,oxx 多个用逗号隔开
}

arr.forEach((item, i, arr) => {
  json[item.split('=')[0]] = item.split('=')[1]
})

if (json.extraComponents.length) {
  json.extraComponents = json.extraComponents.split(',')
}
if (json.extraMenus.length) {
  var extraMenusArr = json.extraMenus.split(',')
  json.extraMenus = {}
  extraMenusArr.forEach((item) => {
    json.extraMenus[item] = true
  })
}
if (json.goods.length) {
  var goodsArr = json.goods.split(',')
  json.goods = {}
  goodsArr.forEach((item) => {
    json.goods[item] = true
  })
}
console.log(json)
export default json
