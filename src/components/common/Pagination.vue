<template>
	<div class="block">
		<el-pagination
			@size-change="pageSizeChange"
			@current-change="currentPageChange"
			:current-page="fileJson.searchForm.form.currentPage"
			:page-sizes="fileJson.PageSizes"
			:page-size="fileJson.searchForm.form.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="fileJson.searchForm.form.count">
		</el-pagination>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default{
  props: ['fileJson'],
  methods: {
    ...mapActions([
      'searchSubmitForm',
      'handleSizeChange',
      'handleCurrentChange'
    ]),
    pageSizeChange (pageSize) {
      // console.log('pageSizeChange-click')
      this.handleSizeChange({
        filename: this.fileJson.filename,
        pageSize: pageSize
      })
    },
    currentPageChange (currentPage) {
      // console.log('currentChange-click')
      this.handleCurrentChange({
        filename: this.fileJson.filename,
        currentPage: currentPage
      })
    }
  }
}
</script>
