import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('common/Index'),
      children: [{
        path: '/',
        redirect: 'HomePage'
      }, {
        path: 'HomePage',
        component: require('page/HomePage'),
        children: [{
          path: 'micropage',
          component: require('micropage')
        }]
      }, {
        path: 'CustomPage',
        component: require('page/CustomPage'),
        children: [{
          path: 'micropage',
          component: require('micropage')
        }]
      }, {
        path: 'AdvertPage',
        component: require('page/AdvertPage'),
        children: [{
          path: 'micropage',
          component: require('micropage')
        }]
      }]
    }
  ]
})
