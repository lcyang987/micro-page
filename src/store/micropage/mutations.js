import state from './state'
import actions from './actions'
import getters from './getters'
import * as types from '../types'

import _ from 'lodash'

const mutations = {
  [types.INITSEARCHFORM] (state, opt) {
    state.dialog.search = Object.assign({}, opt)
    state.dialog.state = true
    state.dialog.type = opt.type
    state.dialog.searchField = opt.searchField
  },
  [types.CLOSEDIALOG] (state) {
    state.dialog.loading = false
    state.dialog.destination = {}
    state.dialog.state = false
    state.dialog.type = ''
    state.dialog.searchField = ''
    state.dialog.form = {}
    state.dialog.data = []
  },
  [types.MICROPAGEAJAX] (state, data) {
    state.dialog.loading = true
    state.dialog.destination = state.dialog.search.destination
    state.dialog.search.count = data.count
    state.dialog.title = data.title
    state.dialog.data = data.result
    state.dialog.picSize = state.dialog.search.picSize
    // for (var obj of state.dialog.data) {
    //   obj.isLcyEdit = false
    // }
    for (var i = 0; i < state.dialog.data.length; i++) {
      state.dialog.data[i].isLcyEdit = false
    }
    // console.log(state.dialog)
    // console.log(state.dialog.search.count, state.dialog.search.form.currentPage)
  },
  [types.SIDEBARREGIONCLICK] (state, {item, obj}) {
    state.sidebar.isHidden = false
    state.sidebar.isRegion = false
    state.index.data.splice(state.index.active + 1, 0, _.cloneDeep(state.region.originData[item.type]))
    state.index.active += 1
    setTimeout(() => {
      state.sidebar.top = obj.$parent.$parent.$refs.item.querySelectorAll('.item')[state.index.active].offsetTop
    }, 0)
  },
  [types.REGIONCLICK] (state, {item, obj}) {
    state.sidebar.isHidden = false
    state.sidebar.isRegion = false
    state.index.data.push(_.cloneDeep(state.region.originData[item.type]))
    state.index.active = state.index.data.length - 1
    setTimeout(() => {
      state.sidebar.top = obj.$parent.$refs.item.querySelectorAll('.item')[state.index.active].offsetTop
    }, 0)
  },
  [types.CLEARINDEXDATA] () {
    state.index.data = []
    state.index.name = ''
    state.index.introduction = ''
    state.index.isDraft = ''
    state.index.active = null
    state.index.isLoad = false
    state.index.dontClose = false
    state.index.editTime = false
    state.index.oneClick = false
    state.index.toolTipTimer = false
    clearTimeout(state.index.timer)
    clearTimeout(state.index.nameTimer)
  },
  [types.SETINDEXDATA] (state, data) {
    state.index.timer = setTimeout(() => {
      // state.index.data = JSON.parse(data.configJson)
      // state.index.data = data.configJson
      state.index.name = data.name
      state.index.introduction = data.introduction
      state.index.isDraft = data.isDraft
      state.index.isLoad = true
    }, 0)
  },
  [types.REMOVEOTHERID] (state, newConfigJson) {
    state.index.data = newConfigJson
    setTimeout(() => {
      state.index.dontClose = false
      state.index.editTime = false
    }, 0)
  },
  [types.SETINDEXLOAD] (state) {
    state.index.isLoad = true
  },
  [types.CHANGESTATUS] (state) {
    state.index.dontClose = true
    state.index.editTime = true
  },
  [types.PICSELECT] (state, {item, newUrl}) {
    item.img = newUrl
    var destination = state.index.data[state.index.active].attr
    state.dialog.destination.name.split('.').map(a => { destination = destination[a] })
    // console.log(destination, item, 123)
    let num
    if (state.dialog.destination.num === -1) {
      destination.push(_.cloneDeep(state.index.data[state.index.active].originData))
      num = destination.length - 1
    } else if (state.dialog.destination.num > -1) {
      num = state.dialog.destination.num
    }
    if ((num === 0 || num) && state.dialog.destination.attr) {
      for (let i in destination[num][state.dialog.destination.attr]) {
        if (item[i]) { destination[num][state.dialog.destination.attr][i] = item[i] }
      }
    } else if (num === 0 || num) {
      for (let i in destination[num]) {
        if (item[i]) { destination[num][i] = item[i] }
      }
    } else {
      for (let i in destination) {
        if (item[i]) { destination[i] = item[i] }
      }
    }
  },
  [types.CHANGEEDITNAME] (state, {item, i}) {
    state.dialog.data.splice(i, 1, Object.assign({}, state.dialog.data[i], {
      isLcyEdit: !item.isLcyEdit,
      oldpictureName: item.pictureName
    }))
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
