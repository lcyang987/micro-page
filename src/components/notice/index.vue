<template>
	<div class="notice">
		<p v-text="text"></p>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>

export default {
  	name: 'white',
	props: ["result"],
	computed:{
		text(){
			let text="公告：";
			return this.result.attr.content?text+this.result.attr.content:text+"请填写内容，如果过长，将会在手机上滚动显示";
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.notice{
		padding:10px;
		overflow:hidden;
		background:#ffc;
		p{
			margin:0;
			padding:0;
			white-space:nowrap;
			color:#f90;
			float:left;
		}
	}
</style>