import Vue from 'vue'
var vm = new Vue()

import axios from 'axios'
axios.defaults.baseURL = window.location.pathname.replace(/micropage\/index\.html|micropage\//, '')
import querystring from 'querystring'
import * as types from '../types'
import _ from 'lodash'
import urlParams from 'assets/urlParams'

export default {
  goodsDragDrop ({commit, state}, opt) {
    if (window.event.button === 2) {
      return false
    }
    var center = document.querySelector('.fixedMicropage')
    var item = opt.items.querySelectorAll('.item')
    var disX = opt.oEvent.clientX - opt.obj.offsetLeft
    var disY = opt.oEvent.clientY - opt.obj.offsetTop
    var placeholder = document.createElement('div')
    opt.items.insertBefore(placeholder, opt.obj);
    [opt.obj.style.position, opt.obj.style.left, opt.obj.style.top, opt.obj.style.zIndex] = ['absolute', opt.oEvent.clientX - disX + 'px', opt.oEvent.clientY - disY + 'px', '17'];
    [placeholder.style.height, placeholder.style.width, placeholder.style.display] = [1 + 'px', Math.floor(opt.obj.offsetWidth) + 'px', 'inline-block']
    document.body.style.userSelect = 'none'
    var transFormTime = 100
    for (var i = 0; i < item.length; i++) {
      item[i].setAttribute('y', item[i].offsetTop + 'px')
      item[i].setAttribute('x', item[i].offsetLeft + 'px')
      if (item[i] === opt.obj) {
        item[i].style.transition = ''
      } else {
        item[i].style.transition = transFormTime / 1000 + 's'
      }
    }
    window.onmousemove = ev => {
      // directionTop = moveY > event.clientY
      if (state.index.goodsDragDropLock) {
        return false
      }
      var moveX = event.clientX
      var moveY = event.clientY
      opt.obj.style.left = moveX - disX + 'px'
      opt.obj.style.top = moveY - disY + 'px'
      clearTimeout(opt.items.timer)
      clearTimeout(opt.items.dataTimer)
      opt.items.timer = setTimeout(() => {
        var arr = []
        for (let i = 0; i < item.length; i++) {
          if (item[i] !== opt.obj) {
            item[i].disX = item[i].offsetLeft + item[i].offsetWidth / 2 - opt.obj.offsetLeft - item[i].offsetWidth / 2
            item[i].disY = item[i].offsetTop + item[i].offsetHeight / 2 - opt.obj.offsetTop - item[i].offsetHeight / 2
            item[i].distance = Math.abs(item[i].disX) + Math.abs(item[i].disY)
            arr.push({
              num: i,
              disX: item[i].disX,
              disY: item[i].disY,
              distance: item[i].distance,
              location: item[i].disX >= 0 ? {e: 'left', c: '前面'} : {e: 'right', c: '后面'}
            })
          }
        }
        var target = _.min(arr, 'distance')
        if (Math.abs(target.disX) > opt.obj.offsetWidth || Math.abs(target.disY) > opt.obj.offsetHeight) {
          return false
        }
        var begin, changeAll, close
        if (target.location.e === 'left') {
          if (opt.active < target.num) {
            begin = target.num - 1
            changeAll = Math.abs(opt.active - begin)
            begin = begin - changeAll + 1
            close = begin + changeAll - 1
          } else {
            begin = target.num
            close = begin + opt.active - target.num - 1
          }
        } else {
          if (opt.active < target.num) {
            begin = opt.active + 1
            close = target.num
          } else {
            begin = target.num + 1
            close = begin + opt.active - target.num - 2
          }
        }
        // var direction = opt.active < target.num ? '左' : '右'
        // console.log(begin + '起到' + close + ',' + '往' + direction + '移动')
        var num = opt.active < target.num ? -1 : 1
        for (let i = begin; i <= close; i++) {
          let x = parseInt(item[i + num].getAttribute('x')) - parseInt(item[i].getAttribute('x'))
          let y = parseInt(item[i + num].getAttribute('y')) - parseInt(item[i].getAttribute('y'))
          item[i].style.transform = 'translate(' + x + 'px,' + y + 'px)'
        }
        state.index.goodsDragDropLock = true
        opt.items.dataTimer = setTimeout(() => {
          for (let i = 0; i < item.length; i++) {
            item[i].style.transition = ''
            item[i].style.transform = ''
          }
          var targetData = opt.data[target.num]
          var dragObjData = opt.data[opt.active]
          opt.data.splice(opt.active, 1)
          var newObjNum = target.location.e === 'left' ? opt.data.indexOf(targetData) : opt.data.indexOf(targetData) + 1
          opt.data.splice(newObjNum, 0, dragObjData)
          var nowStyle = opt.obj.getAttribute('style')
          opt.obj.removeAttribute('style')
          newObjNum = target.location.e === 'left' ? opt.data.indexOf(targetData) - 1 : opt.data.indexOf(targetData) + 1
          opt.active = newObjNum
          opt.obj = item[opt.active]
          opt.obj.style = nowStyle
          if (opt.items.children.length - opt.active === 2) {
            opt.items.appendChild(placeholder)
          } else {
            opt.items.insertBefore(placeholder, opt.obj)
          }
          setTimeout(() => {
            for (let i = 0; i < item.length; i++) {
              if (item[i] !== opt.obj) {
                item[i].style.transition = transFormTime / 1000 + 's'
              }
            }
            state.index.goodsDragDropLock = false
          }, 50)
        }, transFormTime)
      }, 300)
    }
    window.onmouseup = ev => {
      clearTimeout(opt.items.timer)
      document.body.style.userSelect = ''
      opt.obj.style.transition = transFormTime / 1000 + 's'
      let x = parseInt(opt.obj.getAttribute('x')) - parseInt(opt.obj.style.left) + 'px'
      let y = parseInt(opt.obj.getAttribute('y')) - parseInt(opt.obj.style.top) + 'px'
      opt.obj.style.transform = 'translate(' + x + ',' + y + ')'
      setTimeout(() => {
        opt.obj.removeAttribute('style')
        opt.items.removeChild(placeholder)
      }, transFormTime)
      window.onmousemove = window.onmouseup = center.onscroll = null
    }
  },
  dragDrop ({commit}, opt) {
    if (window.event.button === 2) {
      return false
    }
    // var center = document.querySelector('.centerBox')
    var center = document.querySelector('.fixedMicropage')
    var downScrollTop = center.scrollTop
    var item = opt.items.querySelectorAll('.item')
    var mouseDown = {
      x: opt.oEvent.clientX + document.body.scrollLeft,
      y: opt.oEvent.clientY + document.body.scrollTop
    }
    var disY = opt.oEvent.clientY - opt.obj.offsetTop
    var placeholder = document.createElement('div')
    var moveY = opt.oEvent.clientY
    var directionTop
    opt.items.insertBefore(placeholder, opt.obj)
    // console.log(opt.obj.offsetHeight)
    placeholder.style.height = Math.floor(opt.obj.offsetHeight) + 'px';
    [opt.obj.style.position, opt.obj.style.top, opt.obj.style.zIndex] = ['absolute', opt.oEvent.clientY - disY + 'px', '17']
    document.body.style.userSelect = 'none'
    var elementsFor = () => {
      for (var i = 0; i < item.length; i++) {
        if (item[i] !== opt.obj) {
          if (i + 1 === opt.active || i - 1 === opt.active) {
            if (i > opt.active) {
              if (!directionTop && item[i].offsetTop + item[i].offsetHeight / 2 < opt.obj.offsetTop + opt.obj.offsetHeight) {
                opt.data.splice(opt.active + 2, 0, opt.data[opt.active])
                opt.data.splice(opt.active, 1)
                elementsChange(i)
                directionTop = !directionTop
              }
            } else {
              if (directionTop && item[i].offsetTop + item[i].offsetHeight / 2 > opt.obj.offsetTop) {
                opt.data.splice(opt.active - 1, 0, opt.data[opt.active])
                opt.data.splice(opt.active + 1, 1)
                elementsChange(i)
              }
            }
          }
        }
      }
    }
    var elementsChange = (i) => {
      var nowStyle = opt.obj.getAttribute('style')
      opt.obj.removeAttribute('style')
      opt.active = i
      opt.obj = item[i]
      opt.obj.style = nowStyle
      opt.items.insertBefore(placeholder, opt.obj)
    }
    center.onscroll = () => {
      disY -= center.scrollTop - downScrollTop
      directionTop = center.scrollTop < downScrollTop
      opt.obj.style.top = moveY - disY + 'px'
      downScrollTop = center.scrollTop
      elementsFor()
      return false
    }
    window.onmousemove = ev => {
      directionTop = moveY > event.clientY
      moveY = event.clientY
      opt.obj.style.top = moveY - disY + 'px'
      elementsFor()
      var mouseMove = {
        y: event.clientY + document.body.scrollTop
      }
      if (Math.abs(mouseDown.y - mouseMove.y) > 5) { return false }
    }
    window.onmouseup = ev => {
      opt.obj.removeAttribute('style')
      opt.items.removeChild(placeholder)
      document.body.style.userSelect = ''
      window.onmousemove = window.onmouseup = center.onscroll = null
    }
  },
  indexDragDrop ({commit, state}, {_this}) {
    if (window.event.button === 2) {
      return false
    }
    state.index.isMove = true
    var isActive
    if (state.index.active === state.index.current) { isActive = true }
    state.index.isValidate = false
    // var center = document.querySelector('.centerBox')
    var center = document.querySelector('.fixedMicropage')
    var downScrollTop = center.scrollTop
    var oEvent = window.event
    var item = _this.$refs.item.querySelectorAll('.item')
    var obj = _this.$refs.item.children[state.index.current]
    var mouseDown = {
      x: oEvent.clientX + document.body.scrollLeft,
      y: oEvent.clientY + document.body.scrollTop
    }
    var disY = oEvent.clientY - obj.offsetTop
    var placeholder = document.createElement('div')
    var moveY = oEvent.clientY
    var directionTop
    _this.$refs.item.insertBefore(placeholder, obj)
    placeholder.style.height = Math.floor(obj.offsetHeight) + 'px';
    [obj.style.position, obj.style.top, obj.style.zIndex] = ['absolute', oEvent.clientY - disY + 'px', '17']
    document.body.style.userSelect = 'none'
    var elementsFor = () => {
      for (var i = 0; i < item.length; i++) {
        if (item[i] !== obj) {
          if (i + 1 === state.index.current || i - 1 === state.index.current) {
            if (i > state.index.current) {
              if (!directionTop && item[i].offsetTop + item[i].offsetHeight / 2 < obj.offsetTop + obj.offsetHeight) {
                state.index.data.splice(state.index.current + 2, 0, state.index.data[state.index.current])
                state.index.data.splice(state.index.current, 1)
                elementsChange(i)
                directionTop = !directionTop
                if (!isActive && i === state.index.active) { state.index.active-- }
              }
            } else {
              if (directionTop && item[i].offsetTop + item[i].offsetHeight / 2 > obj.offsetTop) {
                state.index.data.splice(state.index.current - 1, 0, state.index.data[state.index.current])
                state.index.data.splice(state.index.current + 1, 1)
                elementsChange(i)
                if (!isActive && i === state.index.active) { state.index.active++ }
              }
            }
          }
        }
      }
    }
    var elementsChange = (i) => {
      var nowStyle = obj.getAttribute('style')
      obj.removeAttribute('style')
      state.index.current = i
      obj = item[i]
      obj.style = nowStyle
      if (isActive) { state.index.active = i }
      _this.$refs.item.insertBefore(placeholder, obj)
    }
    center.onscroll = () => {
      disY -= center.scrollTop - downScrollTop
      directionTop = center.scrollTop < downScrollTop
      obj.style.top = moveY - disY + 'px'
      downScrollTop = center.scrollTop
      elementsFor()
      return false
    }
    window.onmousemove = ev => {
      var oEvent = ev || window.event
      directionTop = moveY > oEvent.clientY
      moveY = oEvent.clientY
      obj.style.top = moveY - disY + 'px'
      elementsFor()
      return false
    }
    window.onmouseup = ev => {
      var oEvent = ev || window.event
      obj.removeAttribute('style')
      _this.$refs.item.removeChild(placeholder)
      document.body.style.userSelect = ''
      window.onmousemove = window.onmouseup = center.onscroll = null
      var mouseUp = {
        x: oEvent.clientX + document.body.scrollLeft,
        y: oEvent.clientY + document.body.scrollTop
      }
      if (Math.abs(mouseDown.x - mouseUp.x) < 3 && Math.abs(mouseDown.y - mouseUp.y) < 3) {
        state.index.active = state.index.current
        state.sidebar.isHidden = false
        state.sidebar.isRegion = false
      }
      if (!state.sidebar.isHidden) { state.sidebar.top = item[state.index.active].offsetTop }
      state.index.isMove = false
    }
  },
  initSearchForm ({commit, dispatch}, opt) {
    commit(types.INITSEARCHFORM, opt)
    dispatch('micropageAjax')
  },
  closeDialog ({commit}) {
    commit(types.CLOSEDIALOG)
  },
  micropageAjax ({commit, dispatch, state}, changeForm) {
    // bug：这个方法在图片选择打开时被调用了两次
    if (changeForm) {
      for (var i in changeForm) {
        state.dialog.search.form[i] = changeForm[i]
      }
    }
    state.dialog.loading = false
    axios.post(state.dialog.search.url, querystring.stringify(state.dialog.search.form)).then(({data}) => {
      if (data.success) {
        commit(types.MICROPAGEAJAX, data)
      } else {
        dispatch('closeDialog')
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
      dispatch('closeDialog')
      vm.$message({
        type: 'error',
        message: '错误代码:' + error.response.status + ',请联系管理员m1'
      })
    })
  },
  regionClick ({commit, state}, {item, obj}) {
    if (item.type && state.index.isLoad) {
      if (/sidebar/.test(obj.$parent.$el.className) && state.index.active >= 0) {
        commit(types.SIDEBARREGIONCLICK, arguments[1])
      } else {
        commit(types.REGIONCLICK, arguments[1])
      }
    }
  },
  validateData ({commit, state, getters, dispatch}, opt) {
    // alert('validateData')
    document.activeElement.onblur = null
    if (!state.index.data.length) {
      validateFailure(true)
      return false
    }
    state.index.validateTime = true
    state.index.validateSuccess = true
    state.index.isValidate = true
    function validateFailure (isNull) {
      // console.log(isNull)
      function getOffsetTop (obj, top) {
        if (obj.offsetParent) {
          top += obj.offsetParent.offsetTop
          return getOffsetTop(obj.offsetParent, top)
        } else {
          return top
        }
      }
      state.index.validateSuccess = false
      state.sidebar.isDisplay = true
      if (isNull) {
        state.index.topPopupText = arguments[1] || '请添加内容！'
      } else {
        var center = document.querySelector('.fixedMicropage')
        center.scrollTop = state.sidebar.top
        var nowTop = getOffsetTop(state.index.validateErrorObj, state.index.validateErrorObj.offsetTop) - center.scrollTop + state.index.validateErrorObj.offsetHeight + 10
        if (nowTop > document.documentElement.clientHeight) {
          center.scrollTop += nowTop - document.documentElement.clientHeight
        }
        // console.log(state.index.validateErrorObj)
        state.index.topPopupText = '『' + _.result(_.find(state.region.data, { 'type': state.index.data[state.index.active].type }), 'text') + '』部分未填写/设置，或有错误'
      }
      state.index.topPopup = true
      clearTimeout(state.index.timer)
      state.index.timer = setTimeout(() => {
        state.index.topPopup = false
      }, 2000)
      state.index.isValidate = true
      state.index.validateTime = false
    }
    (function deep (data, i) {
      state.index.active = i
      // console.log('number', state, state.index.active, state.index.current)
      state.sidebar.isHidden = true
      state.sidebar.isDisplay = false
      setTimeout(() => {
        // ==========================不应该出现的代码，应该全部写在directive里==========================================
        // console.log(data[i].attr, data[i].attr.list)
        state.sidebar.isHidden = false
        state.sidebar.isRegion = false
        if (data[i].attr.list && !data[i].attr.list.length) {
          var center = document.querySelector('.fixedMicropage')
          state.sidebar.top = opt.obj.$refs.item.querySelectorAll('.item')[state.index.active].offsetTop
          center.scrollTop = state.sidebar.top
          validateFailure(true, '请至少添加一项内容')
          // alert('t1')
          // console.log('111', JSON.stringify(state.index.data))
          return false
        }
        // ====================================================================
        setTimeout(() => {
          if (!state.index.validateSuccess) {
            validateFailure()
            // alert('t2')
            return false
          }
          if (i < data.length - 1) { deep(data, ++i) } else {
            state.index.active = null
            state.sidebar.isHidden = true
            state.sidebar.isDisplay = true
            if (!state.index.name) {
              validateFailure(true, '请输入模板名称')
              opt.obj.$refs.templateName.$el.querySelector('input').focus()
              return false
            } else if (opt.obj.$refs.templateName.value.length > opt.obj.$refs.templateName.maxLength) {
              validateFailure(true, '模板名称过长')
              opt.obj.$refs.templateName.$el.querySelector('input').focus()
              return false
            }
            if (!state.index.introduction) {
              validateFailure(true, '请输入模板描述')
              opt.obj.$refs.templateIntroduction.$el.querySelector('input').focus()
              return false
            } else if (opt.obj.$refs.templateIntroduction.value.length > opt.obj.$refs.templateIntroduction.maxLength) {
              validateFailure(true, '模板描述过长')
              opt.obj.$refs.templateIntroduction.$el.querySelector('input').focus()
              return false
            }
            const json = {
              businessNo: urlParams.businessNo,
              configJson: JSON.stringify(state.index.data),
              isDraft: opt.obj.$route.query.isDraft,
              pageType: opt.obj.$route.query.pageType,
              productIds: '',
              name: state.index.name,
              introduction: state.index.introduction
            }
            if (opt.obj.$route.query.id) {
              json.id = opt.obj.$route.query.id
            }
            for (let datas of state.index.data) {
              if (datas.type === 'goods') {
                for (let item of datas.attr.list) {
                  json.productIds += item.id + ','
                }
              }
            }
            if (json.productIds) {
              json.productIds = json.productIds.slice(0, -1)
            }
            json.productIds += ';'
            for (let datas of state.index.data) {
              if (datas.type === 'groupBuy') {
                for (let item of datas.attr.list) {
                  json.productIds += item.id + ','
                }
              }
            }
            if (json.productIds) {
              json.productIds = json.productIds.slice(0, -1)
            }
            state.index.fullLoading = true
            state.index.validateTime = false
            axios.post(opt.url, querystring.stringify(json)).then(({data}) => {
              state.index.fullLoading = false
              if (data.success) {
                opt.obj.$router.history.go(-1)
                vm.$message({
                  type: 'success',
                  message: '保存成功！'
                })
                dispatch('searchSubmitForm', opt.obj.$route.query.filename)
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
              state.index.fullLoading = false
              vm.$message({
                type: 'error',
                message: '错误代码:' + error.response.status + ',请联系管理员m2'
              })
            })
          }
        }, 0)
      }, 0)
    })(state.index.data, 0)
  },
  clearIndexData ({commit}) {
    commit(types.CLEARINDEXDATA)
  },
  setIndexData ({commit, dispatch}, {obj, form, url}) {
    if (form.pageNo) {
      axios.post(url, querystring.stringify(form)).then(({data}) => {
        if (data.success) {
          if (data.result) {
            if (data.result.configJson) {
              dispatch('removeOtherId', data.result)
              commit(types.SETINDEXDATA, data.result)
            } else {
              vm.$message({
                type: 'info',
                message: '缺少数据,请联系管理员m-data'
              })
            }
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
          setTimeout(() => {
            obj.$router.history.go(-1)
          }, 100)
        }
      })
      .catch(function (error) {
        vm.$message({
          type: 'error',
          message: '错误代码:' + error.response.status + ',请联系管理员m3'
        })
      })
    } else {
      commit(types.SETINDEXLOAD)
      // commit(types.CHANGESTATUS)
    }
  },
  removeOtherId ({commit}, {configJson, proList, acList}) {
    var newConfigJson = Object.assign([], JSON.parse(configJson))
    if (proList) {
      var goodsData = formatData(proList)
      var goodsIds = getIds(goodsData)
      removeOtherId(goodsIds, goodsData, 'goods')
    }
    if (acList) {
      var groupBuyData = formatData(acList)
      var groupBuyIds = getIds(groupBuyData)
      removeOtherId(groupBuyIds, groupBuyData, 'groupBuy')
    }
    commit(types.REMOVEOTHERID, newConfigJson)
    function formatData (arr) {
      var json = {}
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id && !json[arr[i].id]) {
          json[arr[i].id] = {}
          for (var j in arr[i]) {
            json[arr[i].id][j] = arr[i][j]
          }
        }
      }
      return json
    }
    function getIds (json) {
      var arr = []
      for (var i in json) {
        i > 0 ? arr.push(parseInt(i)) : arr.push(i)
      }
      return arr
    }
    function removeOtherId (ids, data, type) {
      for (var i = 0; i < newConfigJson.length; i++) {
        if (newConfigJson[i].type === type) {
          for (var j = newConfigJson[i].attr.list.length - 1; j > -1; j--) {
            if (ids.indexOf(newConfigJson[i].attr.list[j].id) === -1) {
              newConfigJson[i].attr.list.splice(j, 1)
            } else {
              newConfigJson[i].attr.list[j] = Object.assign({}, data[newConfigJson[i].attr.list[j].id])
            }
          }
        }
      }
    }
  },
  changeStatus ({commit}) {
    commit(types.CHANGESTATUS)
  },
  setPicSize ({dispatch}, {item}) {
    // var sourceUrl = item.sourceUrl.replace(new RegExp(/^http:\/\/\d+\.\d+\.\d+\.\d+\/+/), '')
    axios.post('/picture/compressByExistImage.jpeg', querystring.stringify({
      imagePath: item.sourceUrl
    })).then(({data}) => {
      if (data.success) {
        // return data.result.compressFilePath
        dispatch('picSelect', {
          item: item,
          newUrl: data.result.compressFilePath
        })
      } else {
        vm.$message({
          type: 'error',
          customClass: 'topone',
          message: data.info
        })
      }
    })
    .catch(function (error) {
      vm.$message({
        type: 'error',
        customClass: 'topone',
        message: '错误代码:' + error.response.status + ',请联系管理员m3'
      })
    })
  },
  picSelect ({commit, dispatch}, opt) {
    commit(types.PICSELECT, opt)
    dispatch('closeDialog')
    // setTimeout(() => {
    //   commit(types.PICSELECT, opt)
    //   dispatch('closeDialog')
    // }, 0)
  },
  getTeamList ({commit}, opt) {
    opt.obj.teamList = []
    axios.post('picture/groupList.json', querystring.stringify({
      bussType: 'TEAM'
    })).then(({data}) => {
      if (data.success) {
        opt.obj.teamList = data.result
        opt.obj.teamList.unshift({
          name: opt.name || '全部'
        })
      } else {
        vm.$message({
          type: 'error',
          customClass: 'topone',
          message: data.info
        })
      }
    })
    .catch(function (error) {
      vm.$message({
        type: 'error',
        customClass: 'topone',
        message: '错误代码:' + error.response.status + ',请联系管理员m3'
      })
    })
  },
  toLogin ({state}) {
    // console.log('toLogin')
    vm.$alert('需要重新登录', '登录失效！', {
      confirmButtonText: '登录',
      callback: action => {
        if (action === 'confirm') {
          window.open(window.location.origin + window.location.pathname.replace(/micropage\/index\.html|micropage\//, ''))
        }
      }
    })
  },
  micropageConfirm ({commit, dispatch, getters}, {url, form, msg, title, success, error, cancel}) {
    vm.$confirm(msg, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      customClass: 'topone',
      type: 'warning'
    }).then(() => {
      axios.post(url, querystring.stringify(form)).then(({data}) => {
        if (data.success) {
          dispatch('micropageAjax', {
            currentPage: 1
          })
          vm.$message({
            type: 'success',
            customClass: 'topone',
            message: data.info || success
          })
        } else {
          if (/^NOT_LOGGED_IN$|^401$/.test(data.errCode)) {
            dispatch('toLogin')
          } else {
            vm.$message({
              type: 'error',
              customClass: 'topone',
              message: data.info || error
            })
          }
        }
      })
      .catch(function (error) {
        vm.$message({
          type: 'error',
          customClass: 'topone',
          message: '错误代码:' + error.response.status + ',请联系管理员s4'
        })
      })
    })
    .catch(function () {
      // vm.$message({
      //   type: 'info',
      // customClass: 'topone',
      //   message: '取消了操作'
      // })
    })
  },
  teamAddOrEditorDelete ({dispatch}, {obj, url, form, info}) {
    axios.post(url, querystring.stringify(form)).then(({data}) => {
      if (data.success) {
        obj.refreshGroup()
        vm.$message({
          type: 'success',
          customClass: 'topone',
          message: data.info || info + '成功'
        })
      } else {
        if (/^NOT_LOGGED_IN$|^401$/.test(data.errCode)) {
          dispatch('toLogin')
        } else {
          vm.$message({
            type: 'error',
            customClass: 'topone',
            message: data.info || info + '失败'
          })
        }
      }
    })
    .catch(function (error) {
      vm.$message({
        type: 'error',
        customClass: 'topone',
        message: '错误代码:' + error.response.status + ',请联系管理员s5'
      })
    })
  },
  picEditName ({dispatch}, {obj, url, form, info, refresh, refreshGroup}) {
    axios.post(url, querystring.stringify(form)).then(({data}) => {
      if (data.success) {
        if (refresh) {
          dispatch('micropageAjax')
        }
        if (refreshGroup) {
          obj.refreshGroup()
        }
        vm.$message({
          type: 'success',
          customClass: 'topone',
          message: data.info || info + '成功'
        })
      } else {
        if (/^NOT_LOGGED_IN$|^401$/.test(data.errCode)) {
          dispatch('toLogin')
        } else {
          vm.$message({
            type: 'error',
            customClass: 'topone',
            message: data.info || info + '失败'
          })
        }
      }
    })
    .catch(function (error) {
      vm.$message({
        type: 'error',
        customClass: 'topone',
        message: '错误代码:' + error.response.status + ',请联系管理员s6'
      })
    })
  },
  changeEditName ({commit}, opt) {
    commit(types.CHANGEEDITNAME, opt)
  }
}
