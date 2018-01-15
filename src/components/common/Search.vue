<template>
	<el-form-item slot="form" style="float: right">
		<el-button type="primary" @click="searchBtnClick(_self.filename)">查询</el-button>
		<el-button @click="searchFormReset(_self.filename)">清空</el-button>
	</el-form-item>
</template>
<script>
import {mapActions} from 'vuex'
export default{
  props: ['filename', 'resetName'],
  methods: mapActions([
    'searchBtnClick',
    'searchFormReset',
    'searchSetOriginForm'
  ]),
  mounted () {
    this.searchSetOriginForm({
      filename: this.filename,
      resetName: this.resetName
    })
    this.searchBtnClick(this.filename)
  }
}
</script>
