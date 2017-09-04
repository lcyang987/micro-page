export default {
  'white': {
    'type': 'white',
    'attr': {
      'height': 30
    }
  },
  'line': {
    'type': 'line',
    'attr': {
      'type': 'solid',
      'color': '#000000',
      'padding': true
    }
  },
  'title': {
    'require': {
      'title': true,
      'normal': {
        'link': true,
        'textNav': {
          'text': true,
          'link': true
        }
      },
      'wechat': {
        'link': true,
        'textNav': {
          'text': true,
          'link': true
        }
      }
    },
    'validator': {
      'title': {
        'errorText': '',
        'min': 1,
        'max': 18
      },
      'normal': {
        'subtitle': {
          'errorText': '',
          'min': 1,
          'max': 20
        },
        'textNav': {
          'text': {
            'errorText': '',
            'min': 1,
            'max': 18
          }
        }
      },
      'wechat': {
        'author': {
          'errorText': '',
          'min': 1,
          'max': 15
        },
        'textNav': {
          'text': {
            'errorText': '',
            'min': 1,
            'max': 18
          }
        }
      }
    },
    'type': 'title',
    'attr': {
      'title': '',
      'type': 'normal',
      'normal': {
        'subtitle': '',
        'textAlign': 'left',
        'backgroundColor': '',
        'fontColor': '#000000',
        'textNav': {
          'isShow': false,
          'text': '',
          'link': {
            'id': '',
            'text': '',
            'url': ''
          }
        }
      },
      'wechat': {
        'date': '',
        'author': '',
        'type': 'other',
        'textNav': {
          'text': '',
          'link': {
            'id': '',
            'text': '',
            'url': ''
          }
        }
      }
    }
  },
  'notice': {
    'require': {
      'content': true
    },
    'validator': {
      'content': {
        'errorText': '',
        'min': 1,
        'max': 50
      }
    },
    'type': 'notice',
    'attr': {
      'content': ''
    }
  },
  'search': {
    'type': 'search',
    'attr': {
      'placeholder': '搜索商品',
      'backgroundColor': ''
    }
  },
  'textNav': {
    'require': {
      'list': {
        'text': true,
        'link': true
      }
    },
    'validator': {
      'list': {
        'text': {
          'min': 1,
          'max': 18
        }
      }
    },
    'type': 'textNav',
    'attr': {
      'list': [{
        'text': '',
        'errorText': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }]
    }
  },
  'picNav': {
    'require': {
      'list': {
        // 'text': true,
        'link': true,
        'img': true
      }
    },
    'validator': {
      'list': {
        'text': {
          'errorText': '',
          'min': 1,
          'max': 18
        }
      }
    },
    'type': 'picNav',
    'attr': {
      'list': [{
        'text': '',
        'errorText': '',
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }, {
        'text': '',
        'errorText': '',
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }, {
        'text': '',
        'errorText': '',
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }, {
        'text': '',
        'errorText': '',
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }]
    }
  },
  'imageAd': {
    'require': {
      'list': {
        // 'text': true,
        // 'link': true,
        'img': true
      }
    },
    'validator': {
      'list': {
        'text': {
          'min': 1,
          'max': 18
        }
      }
    },
    'type': 'imageAd',
    'originData': {
      'text': '',
      'errorText': '',
      'img': '',
      'link': {
        'id': '',
        'text': '',
        'url': ''
      }
    },
    'attr': {
      'type': 'carousel',
      'separate': 'big',
      'list': []
    }
  },
  'showcase': {
    'require': {
      // 'title': true,
      'list': {
        'link': true,
        'img': true
      }
    },
    'validator': {
      'title': {
        'errorText': '',
        'min': 1,
        'max': 20
      },
      'contentTitle': {
        'errorText': '',
        'min': 1,
        'max': 20
      },
      'contentDescription': {
        'errorText': '',
        'min': 1,
        'max': 50
      }
    },
    'type': 'showcase',
    'attr': {
      'title': '',
      'type': 'prominent',
      'space': 'keep',
      'contentTitle': '',
      'contentDescription': '',
      'list': [{
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }, {
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }, {
        'img': '',
        'link': {
          'id': '',
          'text': '',
          'url': ''
        }
      }]
    }
  },
  'goods': {
    'validator': {
      'list': true
    },
    'originData': {
      'id': '',
      'text': '', // 商品名称
      'img': '', // 图片地址
      'url': '', // 链接地址
      'info': '', // 描述
      'price': '' // 价格
    },
    'type': 'goods',
    'attr': {
      'mode': 'edit', // 查看与删除: edit， 调换位置： move
      'type': 'big',
      'style': 'card',
      'topWhite': true,
      'display': { // 是否显示如下：
        'btn': true, // 购物车按钮
        'text': true, // 商品名称
        'info': true, // 商品简介
        'price': true // 商品价格
      },
      'btn': '1', // 购物车按钮图标 类型"1": 购物车, 类型"2": +, 类型"3"： buy, 类型"4": 订购
      'list': []
    }
  },
  'groupBuy': { // 未完成
    'validator': {
      'list': true
    },
    'originData': {
      'id': '',
      'text': '', // 商品名称
      'img': '', // 图片地址
      'url': '', // 链接地址
      'info': '', // 描述
      'price': '', // 价格
      'originalPrice': '', // 原价
      'groupPeople': '', // 参团人数
      'bought': '', // 已购
      'remainTime': '' // 倒计时
    },
    'type': 'groupBuy',
    'attr': {
      'mode': 'edit', // 查看与删除: edit, 调换位置: move
      'type': 'big', // 大图: big, 小图: small, 列表：list, 横向: scroll
      'topWhite': true,
      'list': []
    }
  }
}
