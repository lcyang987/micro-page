<template>
  <div>
    <mu-raised-button :label="link.id?'修改':'设置链接地址'" :style="{width:width}" ref="button" @click="toggle"/>
    <mu-popover :overlayOpacity="0.3" :trigger="trigger" :overlay="true" :open="open" @close="handleClose">
      <mu-menu>
        <template v-for="item of data" >
          <mu-menu-item :title="item.title" @click="click(item)" />
        </template>
      </mu-menu>
    </mu-popover>
  </div>
</template>

<script>
import urlParams from 'assets/urlParams'
import {mapActions} from 'vuex'
export default {
  props: ['link', 'width', 'destination'],
  data () {
    return {
      data: [{
        id: 1,
        title: '商品列表',
        url: 'micropage/queryProductPage.json',
        extraForm: {
          shopAlias: urlParams.businessNo
        },
        searchField: 'name'
      }, {
        id: 2,
        title: '商品分组列表',
        url: 'micropage/queryGroupInfoPage.json',
        extraForm: {
          shopAlias: urlParams.businessNo
        },
        searchField: 'groupName'
      }, {
        id: 3,
        title: '模板列表',
        url: 'micropage/queryPageWap.json',
        extraForm: {
          businessNo: urlParams.businessNo,
          pageType: 'WMALL_CUSTOM'
        },
        searchField: 'nameFuzzy'
      }, {
        id: 0,
        title: '自定义外链'
      }],
      open: false,
      trigger: null
    }
  },
  mounted () {
    this.trigger = this.$refs.button.$el
  },
  methods: {
    ...mapActions([
      'initSearchForm'
    ]),
    click (item) {
      // if (!item.id) { return false }
      if (item.id) {
        var form = Object.assign({}, item.extraForm, {
          pageSize: 10,
          currentPage: 1
        })
        this.initSearchForm({
          url: item.url,
          count: 0,
          form: form,
          destination: this.destination,
          searchField: item.searchField
        })
      } else {
        this.$prompt('如: https://www.baidu.com', '请输入自定义外链', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value.length) {
            this.link.id = 'customUrl'
            this.link.url = this.link.text = value
          }
        }).catch(() => {
          this.link.id = this.link.url = this.link.text = ''
        })
      }
      this.open = false
    },
    toggle () {
      this.open = true
    },
    handleClose (e) {
      this.open = false
    }
  }
}
</script>
