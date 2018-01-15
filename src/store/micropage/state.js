import urlParams from 'assets/urlParams'

import originData from 'assets/micropage/originData.js'
import regionData from 'assets/micropage/regionData.js'

export default {
  index: {
    data: [],
    name: '',
    introduction: '',
    status: '',
    displayPosition: '',
    active: null,
    current: null,
    isMove: false,
    topPopup: false,
    topPopupText: '',
    timer: null,
    state: true,
    notEdit: false,
    isDelete: false,
    validateSuccess: false,
    validateErrorObj: null,
    isDraft: '',
    isLoad: false,
    dontClose: false,
    editTime: false,
    oneClick: false,
    loadingTimer: null,
    nameTimer: null,
    fullLoading: false,
    validateTime: false,
    closeTooltip: '双击关闭不保存',
    closeOneClickTooltip: '请确定要关闭吗'
  },
  sidebar: {
    top: 0,
    isHidden: true,
    isRegion: false,
    isDisplay: true
  },
  region: {
    data: (function () {
      var data = regionData.default
      if (urlParams.extraComponents && regionData.extra) {
        var config = {}
        for (let i = 0; i < regionData.extra.length; i++) {
          config[regionData.extra[i].type] = '' + i
        }
        for (let i = 0; i < urlParams.extraComponents.length; i++) {
          if (config[urlParams.extraComponents]) {
            data.push(regionData.extra[config[urlParams.extraComponents]])
          }
        }
      }
      return data
    })(),
    config: (function () {
      var config = {}
      for (let i = 0; i < regionData.default.length; i++) {
        if (regionData.default[i].type) {
          config[regionData.default[i].type] = regionData.default[i].text
        }
      }
      for (let i = 0; i < regionData.extra.length; i++) {
        config[regionData.extra[i].type] = regionData.extra[i].text
      }
      return config
    })(),
    originData,
    active: null
  },
  dialog: {
    state: false,
    timer: null,
    loading: false,
    title: '',
    data: [],
    link: null,
    search: {
      url: '',
      form: {},
      count: 0,
      destination: {}
    }
  }
}
