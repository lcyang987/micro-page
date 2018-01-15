// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 carbon 主题
import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
Vue.use(MuseUI)
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'material-design-icons/iconfont/material-icons.css'

import searchComponent from 'common/Search'
Vue.component('searchComponent', searchComponent)

import paginationComponent from 'common/Pagination'
Vue.component('paginationComponent', paginationComponent)

Vue.config.productionTip = false

import actionsComponent from 'micropage/actions'
Vue.component('actionsComponent', actionsComponent)
import dialogComponent from 'micropage/dialog'
Vue.component('dialogComponent', dialogComponent)
import bottomSheetComponent from 'micropage/bottomSheet'
Vue.component('bottomSheetComponent', bottomSheetComponent)
import popoverComponent from 'micropage/popover'
Vue.component('popoverComponent', popoverComponent)

Vue.directive('inputValidator', {
  inserted: function (el, binding) {
    if (store.state.micropage.index.validateSuccess) {
      let json = binding.value
      if ((json.require && !json.value) || (json.validator && json.value && ((json.validator.min && json.value.length < json.validator.min) || (json.validator.max && json.value.length > json.validator.max)))) {
        if (el.querySelector('textarea')) {
          el.querySelectorAll('textarea')[1].focus()
        } else if (el.querySelector('input')) {
          el.querySelector('input').focus()
        }
        store.state.micropage.index.validateSuccess = false
        store.state.micropage.index.validateErrorObj = el
        // alert(1)
      }
    }
  }
})
Vue.directive('linkValidator', {
  inserted: function (el, binding) {
    let json = binding.value
    if (json.require && store.state.micropage.index.validateSuccess) {
      for (var item in json.value) {
        if (!json.value[item]) {
          el.querySelector('button').style.boxShadow = '0 0 7px red'
          el.querySelector('button').addEventListener('mouseover', function () {
            this.style.boxShadow = ''
          }, false)
          store.state.micropage.index.validateSuccess = false
          store.state.micropage.index.validateErrorObj = el
          // alert(2)
        }
      }
    }
  }
})
Vue.directive('imgValidator', {
  inserted: function (el, binding) {
    let json = binding.value
    if (json.require && store.state.micropage.index.validateSuccess) {
      if (!json.value) {
        el.style.boxShadow = '0 0 7px red'
        el.addEventListener('mouseover', function () {
          this.style.boxShadow = ''
        }, false)
        store.state.micropage.index.validateSuccess = false
        store.state.micropage.index.validateErrorObj = el
        // alert(3)
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
