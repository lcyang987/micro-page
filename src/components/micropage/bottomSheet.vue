<template>
<div>
  <mu-raised-button @click="openBottomSheet" :label="link.id?'修改':'设置链接地址'" :style="{width:width}" />
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet">
      <mu-sub-header>
        	请选择一个
      </mu-sub-header>
      <template v-for="item,i in data">
	      <mu-list-item :title="item.title" @click="click(item, i)"/>
      </template>
    </mu-list>
  </mu-bottom-sheet>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  props: ['link', 'width', 'destination'],
  data () {
    return {
      data: [{
        id: 1,
        title: '批发商城列表',
        url: 'wholesaleGroupInfo/queryWholesaleGroupInfoWapPage.json'
      }],
      bottomSheet: false
    }
  },
  computed: mapGetters([
    'dialog'
  ]),
  methods: {
    ...mapActions([
      'initSearchForm',
      'micropageAjax'
    ]),
    click (item) {
      if (!item.id) { return false }
      this.initSearchForm({
        url: item.url,
        form: {
          pageSize: 10,
          currentPage: 1
        },
        destination: this.destination
      })
      // this.micropageAjax()
      // this.micropageAjax({
      //   url: item.url,
      //   data: {
      //     // a: 'lhb'
      //   },
      //   destination: this.destination
      // })
    },
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    }
  }
}
</script>
