<template>
	<div class="noticeSidebar" v-if="result" :class="">
		<!--公告：<input type="text" :placeholder="result.attr.placeholder" v-model="result.attr.content"  />-->
  		<mu-text-field labelFloat label="公告" fullWidth hintText="" multiLine :rows="3" :rowsMax="6" :maxLength="50" v-model="result.attr.content"/>
	</div>
</template>
<script>
export default {
  	name: 'noticeSidebar',
	props: ["result"],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	input{
		width:80%;
	}
</style>
