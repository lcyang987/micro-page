import Vue from 'vue'
var vm = new Vue()

import axios from 'axios'
axios.defaults.baseURL = window.location.pathname.replace(/micropage\/index\.html|micropage\//, '')
import querystring from 'querystring'
import * as types from '../types'

export default {
  formDialogShow ({commit}, opt) {
    commit(types.FORMDIALOGSHOW, opt)
    if (typeof opt.index === 'number') { commit(types.FORMDIALOGSHOWBEFORGET, opt) }
    if (opt.form) { commit(types.FORMDIALOGSHOWBEFORFORMGET, opt) }
    if (opt.extraForm) { commit(types.FORMDIALOGSETEXTRAFORM, opt) }
  },
  formDialogHide ({commit}, opt) {
    commit(types.FORMDIALOGHIDE, opt)
  },
  formDialogGet ({commit, getters}, {filename, formName, form}) {
    commit(types.FORMLOADINGSTART, arguments[1])
    axios.post(getters[filename][formName].APIS.get, querystring.stringify(form)).then(({data}) => {
      commit(types.FORMLOADINGOVER, arguments[1])
      if (data.success) {
        commit(types.FORMDIALOGGET, {opt: arguments[1], data: data.result})
      } else {
        vm.$message({
          type: 'error',
          message: data.info || getters[filename][formName].title + '获取失败！'
        })
      }
    })
    .catch(function (error) {
      commit(types.FORMLOADINGOVER, arguments[1])
      vm.$message({
        type: 'error',
        message: '错误代码:' + error.response.status + ',请联系管理员s1'
      })
    })
  },
  formDialogSetExtraForm ({commit}, opt) {
    commit(types.FORMDIALOGSETEXTRAFORM, opt)
  },
  formDialogSubmit ({commit, dispatch, getters}, {form, filename, formName, noSubmit, refreshTree}) {
    form.validate((valid) => {
      if (valid) {
        commit(types.FORMLOADINGSTART, arguments[1])
        if (noSubmit) {
          commit(types.FILTERFORM, arguments[1])
        }
        axios.post(getters[filename][formName].APIS[getters[filename][formName].method], querystring.stringify(getters[filename][formName].form)).then(({result, success}) => {
          if (success) {
            dispatch('searchSubmitForm', filename)
            if (refreshTree) { dispatch('refreshTree', arguments[1]) }
            commit(types.FORMLOADINGOVER, arguments[1])
            commit(types.FORMDIALOGSUBMIT, arguments[1])
            vm.$message({
              type: 'success',
              message: result || getters[filename][formName].title + '操作成功！'
            })
          } else {
            commit(types.FORMLOADINGOVER, arguments[1])
            vm.$message({
              type: 'error',
              message: result || getters[filename][formName].title + '操作失败！'
            })
          }
        })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  },
  refreshTree ({commit}, opt) {
    commit(types.REFRESHTREE, opt)
  },
  searchSetOriginForm ({commit, dispatch, getters}, opt) { // 设置源form
    commit(types.SEARCHSETORIGINFORM, opt)
  },
  searchSubmitForm ({commit, dispatch, getters}, filename) {
    commit(types.TABLELOADINGSTART, filename)
    axios.post(getters[filename].APIS.getList, querystring.stringify(getters[filename].searchForm.form)).then(({data}) => {
      commit(types.TABLELOADINGOVER, filename)
      if (data.success) {
        commit(types.SEARCHSUBMITFORM, {filename: filename, data: data})
        if (getters[filename].pagination && data.count >= 0) {
          commit(types.SEARCHSUBMITFORMSETCOUNT, {filename: filename, data: data})
        }
      } else {
        if (/^NOT_LOGGED_IN$|^401$/.test(data.errCode)) {
          dispatch('toLogin')
        } else {
          vm.$message({
            type: 'error',
            message: data.info
          })
        }
      }
    })
    .catch(function (error) {
      commit(types.TABLELOADINGOVER, filename)
      vm.$message({
        type: 'error',
        message: '错误代码:' + error.response.status + ',请联系管理员s2'
      })
    })
  },
  searchFormReset ({commit, dispatch, getters}, filename) { // 清空search
    commit(types.SEARCHFORMRESET, filename)
  },
  searchBtnClick ({commit, dispatch, getters}, filename) { // 点击搜索按钮
    if (getters[filename].pagination) {
      commit(types.SEARCHBTNCLICK, filename)
    }
    dispatch('searchSubmitForm', filename)
  },
  DropdownGet ({commit, getters}, {filename, formName, boolean, name}) {
    commit(types.DROPDOWNINIT, arguments[1])
    if (boolean) {
      commit(types.DROPDOWNLOADINGSTART, arguments[1])
      axios.post(getters[filename][formName][name].path).then(({data}) => {
        commit(types.DROPDOWNLOADINGOVER, arguments[1])
        commit(types.DROPDOWNGET, {opt: arguments[1], data: data.result})
      })
    }
  },
  handleSizeChange ({commit, dispatch}, {filename}) { // 每页显示几条数据
    commit(types.HANDLESIZECHANGE, arguments[1])
    dispatch('searchSubmitForm', filename)
  },
  handleCurrentChange ({commit, dispatch}, {filename}) { // 跳转到第几页
    commit(types.HANDLECURRENTCHANGE, arguments[1])
    dispatch('searchSubmitForm', filename)
  },
  confirm ({commit, dispatch, getters}, {filename, method, form, msg, title, success, error, cancel}) {
    vm.$confirm(msg, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      axios.post(getters[filename].APIS[method], querystring.stringify(form)).then(({data}) => {
        if (data.success) {
          dispatch('searchSubmitForm', filename)
          vm.$message({
            type: 'success',
            message: data.info || success || data.result
          })
        } else {
          if (/^NOT_LOGGED_IN$|^401$/.test(data.errCode)) {
            dispatch('toLogin')
          } else {
            vm.$message({
              type: 'error',
              message: data.info || error || data.result
            })
          }
        }
      })
      .catch(function (error) {
        vm.$message({
          type: 'error',
          message: '错误代码:' + error.response.status + ',请联系管理员s3'
        })
      })
    })
    .catch(function () {
      // vm.$message({
      //   type: 'info',
      //   message: '取消了操作'
      // })
    })
  },
  configCheckChange ({commit}, {_this, customIds, customNames}) {
    var indeterminate = [];
    (function getChecked (trees) {
      for (let i = 0; i < trees.length; i++) {
        if (trees[i].$el.className === 'el-checkbox') { // 这个就是checkbox
          if (trees[i].indeterminate) {
            let json = {
              id: trees[i].$parent.node.data.id,
              name: trees[i].$parent.node.data.name
            }
            indeterminate.push(json)
          }
        }
        getChecked(trees[i].$children)
      }
    })(_this.$refs.tree.$children)
    let nodes = _this.$refs.tree.getCheckedNodes()
    let names = ''
    let ids = ''
    for (let i = 0; i < nodes.length; i++) {
      names += nodes[i].name + ','
      ids += nodes[i].id + ','
    }
    for (let i = 0; i < indeterminate.length; i++) {
      names += indeterminate[i].name + ','
      ids += indeterminate[i].id + ','
    }
    let json = {
      [customNames]: names.slice(0, -1),
      [customIds]: '[' + ids.slice(0, -1) + ']'
    }
    commit(types.CONFIGCHECKCHANGE, {opt: arguments[1], data: json})
  },
  configCheckGet ({commit, dispatch, getters}, {filename, formName, isTree}) {
    commit(types.FORMLOADINGSTART, arguments[1])
    axios.post(getters[filename][formName].APIS.get).then(({data}) => {
      if (data.success) {
        if (isTree) {
          const treeData = (function (list, parent) {
            var first = list.filter(m => m[parent] === 0)
            function getTree (obj) {
              obj.forEach((t, i) => {
                let _list = list.filter(m => m[parent] === t.id)
                if (_list.length) { t.children = getTree(_list) }
              })
              return obj
            }
            return getTree(first)
          })(data.result, 'parentId')
          commit(types.CONFIGCHECKGET, {opt: arguments[1], data: treeData})
          arguments[1].treeData = treeData
        } else {
          commit(types.CONFIGCHECKGET, {opt: arguments[1], data: data.result})
        }
        dispatch('configCheckSet', arguments[1])
      } else {
        vm.$message({
          type: 'error',
          message: data.info || getters[filename][formName].title + '操作失败！'
        })
      }
    })
    .catch(function (error) {
      vm.$message({
        type: 'error',
        message: '错误代码:' + error.response.status + ',请联系管理员s4'
      })
    })
  },
  configCheckSet ({commit, getters}, {filename, formName, form, treeData, customId, isTree, _this}) {
    axios.post(getters[filename][formName].APIS.set, querystring.stringify(form)).then(({data}) => {
      commit(types.FORMLOADINGOVER, arguments[1])
      if (data.success) {
        var arr = []
        for (var i = 0; i < data.result.length; i++) {
          let json = {
            id: data.result[i][customId]
          }
          arr.push(json)
        }
        if (isTree) {
          var leaf = [];
          (function getLeaf (trees) {
            for (let i = 0; i < trees.length; i++) {
              if (trees[i].children) {
                getLeaf(trees[i].children)
              } else {
                leaf.push(trees[i].id)
              }
            }
          })(treeData)
          for (let i in arr) {
            if (leaf.indexOf(arr[i].id) === -1) { arr.splice(i, 1) }
          }
        }
        _this.$refs.tree.setCheckedNodes(arr)
      } else {
        vm.$message({
          type: 'error',
          message: (data.info || getters[filename][formName].title) + '失败！'
        })
      }
    })
    .catch(function (error) {
      commit(types.FORMLOADINGOVER, arguments[1])
      vm.$message({
        type: 'error',
        message: '错误代码:' + error.response.status + ',请联系管理员s5'
      })
    })
  },
  openPreViewPage (store, {pageNo}) {
    window.open('preViewPage.htm?pageNo=' + pageNo)
  },
  micropageShow (store, opt) {
    window.location.href = 'customEdit'
  }
}
