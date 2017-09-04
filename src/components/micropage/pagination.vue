<template>
    <mu-pagination class="muPagination" v-show="dialog.search.count"
      :total="dialog.search.count || 1"
      :current="dialog.search.form.currentPage"
      :pageSizeOption="pageSizeOption"
      :showSizeChanger="true"
      @pageChange="toPage"
      @pageSizeChange="toSize">
    </mu-pagination>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default{
  data () {
    return {
      extraPageSize: Number,
      open: true
    }
  },
  computed: {
    ...mapGetters([
      'dialog'
    ]),
    pageSizeOption () {
      let arr = [20, 30, 40]
      if (arr.indexOf(this.extraPageSize) === -1) {
        arr.unshift(this.extraPageSize)
      }
      return arr
    }
  },
  created () {
    this.extraPageSize = parseInt(this.dialog.search.form.pageSize)
  },
  methods: {
    ...mapActions([
      'micropageAjax'
    ]),
    toPage (currentPage) {
      this.micropageAjax({
        currentPage: currentPage
      })
    },
    toSize (pageSize) { // museUi会主动刷新页面（不是同一页会刷新），这是因为toPage这个方法只有change才会触发，所以只能自己写个判断是否同一页，如果是就刷新下
      var targetPage = Math.floor(this.dialog.search.form.pageSize * (this.dialog.search.form.currentPage - 1) / pageSize + 1)
      this.dialog.search.form.pageSize = pageSize
      if (this.dialog.search.form.currentPage === targetPage) {
        this.toPage(targetPage)
      }
    }
  }
}
</script>
<style lang="less">
.el-pagination{
  float:right;
  margin-top:6px;
}
.muPagination{
  .mu-text-field.mu-select-field.no-empty-state{
    min-height:0;
    margin-bottom:0;
  }
  .mu-text-field-content{
    padding-bottom:0;
    position: relative;
    bottom: 2px;
  }
}
</style>
