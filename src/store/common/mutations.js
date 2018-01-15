import * as types from '../types'
const mutations = {
  [types.TABLELOADINGSTART] (state, filename) {
    state[filename].table.loading = true
  },
  [types.TABLELOADINGOVER] (state, filename) {
    state[filename].table.loading = false
  },
  [types.FORMLOADINGSTART] (state, {filename, formName}) {
    state[filename][formName].loading = true
  },
  [types.FORMLOADINGOVER] (state, {filename, formName}) {
    state[filename][formName].loading = false
  },
  [types.DROPDOWNLOADINGSTART] (state, {filename, formName, name}) {
    state[filename][formName][name].loading = true
  },
  [types.DROPDOWNLOADINGOVER] (state, {filename, formName, name}) {
    state[filename][formName][name].loading = false
  },
  [types.FORMDIALOGSHOW] (state, {filename, formName, index, method, title}) {
    const formDialog = state[filename][formName]
    formDialog.visible = true
    formDialog.method = method
    formDialog.title = title
  },
  [types.FORMDIALOGSHOWBEFORGET] (state, {filename, formName, index}) {
    state[filename][formName].data = state[filename].table.data[index]
  },
  [types.FORMDIALOGSHOWBEFORFORMGET] (state, {filename, formName, form}) {
    state[filename][formName].data = form
  },
  [types.FORMDIALOGHIDE] (state, {filename, formName}) {
    const formDialog = state[filename][formName]
    for (let i in formDialog.form) {
      formDialog.form[i] = ''
    }
    formDialog.data = {}
    formDialog.method = ''
    formDialog.title = ''
  },
  [types.FORMDIALOGGET] (state, {opt, data}) {
    const form = state[opt.filename][opt.formName].form
    for (let i in form) {
      form[i] = data[i]
    }
    form.id = data.id
    if (opt.setSelect) {
      for (let i in opt.setSelect) {
        state[opt.filename][opt.formName][opt.setSelect[i]].result.push({
          label: data[i],
          value: data[opt.setSelect[i]]
        })
      }
    }
  },
  [types.FORMDIALOGSETEXTRAFORM] (state, {filename, formName, extraForm}) {
    for (let i in extraForm) {
      state[filename][formName].form[i] = extraForm[i]
    }
  },
  [types.FILTERFORM] (state, {filename, formName, noSubmit}) {
    for (let i of noSubmit) {
      delete state[filename][formName].form[i]
    }
  },
  [types.REFRESHTREE] (state, {filename, formName}) { // 目前来讲有非常大的局限性，只能最多两级（但是业务需求也是两级，所以先不用修改）
    state[filename].AddTree.expanded = [0, state[filename][formName].form.frameId, state[filename][formName].form.parentId]
    state[filename].AddTree.show = false
    setTimeout(() => {
      state[filename].AddTree.show = true
    }, 0)
  },
  [types.SEARCHSETORIGINFORM] (state, {filename, resetName}) {
    if (resetName) {
      resetName.forEach((name) => {
        state[filename].searchForm.form[name] = ''
      })
    }
    state[filename].searchForm.originForm = Object.assign({}, state[filename].searchForm.form)
    delete state[filename].searchForm.originForm.count
    delete state[filename].searchForm.originForm.currentPage
    delete state[filename].searchForm.originForm.pageSize
  },
  [types.SEARCHSUBMITFORM] (state, {filename, data}) {
    state[filename].table.data = data.result
    state[filename].searchForm.form = Object.assign({}, state[filename].searchForm.form)
  },
  [types.SEARCHSUBMITFORMSETCOUNT] (state, {filename, data}) {
    state[filename].searchForm.form.count = data.count
  },
  [types.SEARCHFORMRESET] (state, filename) {
    console.log(state[filename].searchForm.form)
    state[filename].searchForm.form = Object.assign({}, state[filename].searchForm.form, state[filename].searchForm.originForm)
  },
  // [types.SEARCHFORMPAGINATIONRESET] (state, filename) {
  //   for (let i in state[filename].pagination) {
  //     state[filename].searchForm.form[i] = state[filename].pagination[i]
  //   }
  // },
  [types.SEARCHBTNCLICK] (state, filename) {
    state[filename].searchForm.form = Object.assign({}, state[filename].pagination, state[filename].searchForm.form, {
      currentPage: 1
    })
  },
  [types.DROPDOWNINIT] (state, {filename, formName, name}) {
    state[filename][formName][name].result = []
  },
  [types.DROPDOWNGET] (state, {opt, data}) {
    const obj = state[opt.filename][opt.formName][opt.name]
    for (var i = 0; i < data.length; i++) {
      let json = {}
      json.label = data[i].name
      json.value = data[i].id
      obj.result.push(json)
    }
  },
  [types.HANDLESIZECHANGE] (state, {filename, pageSize}) {
    state[filename].searchForm.form.currentPage = 1
    state[filename].searchForm.form.pageSize = pageSize
  },
  [types.HANDLECURRENTCHANGE] (state, {filename, currentPage}) {
    state[filename].searchForm.form.currentPage = currentPage
  },
  [types.FORMDIALOGSUBMIT] (state, {filename, formName}) {
    state[filename][formName].visible = false
  },
  [types.CONFIGCHECKCHANGE] (state, {opt, data}) {
    for (var i in data) {
      state[opt.filename][opt.formName].form[i] = data[i]
    }
  },
  [types.CONFIGCHECKGET] (state, {opt, data}) {
    state[opt.filename][opt.formName].treeData = data
  }
}
import state from './state'
import actions from './actions'
import getters from './getters'
export default {
  state,
  actions,
  mutations,
  getters
}
