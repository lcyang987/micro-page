const arr = window.location.search.slice(1).split('&')
const json = {}
arr.forEach((item, i, arr) => {
  json[item.split('=')[0]] = item.split('=')[1]
})
if (json.extraComponents) {
  json.extraComponents = json.extraComponents.split(',')
}
// console.log(json)
export default json
