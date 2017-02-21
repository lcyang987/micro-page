<template>
	<div class="notice">
		<p v-text="text" ></p>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
import actionsComponent from '../actions';
export default {
  	name: 'white',
	props: ["result","index","data"],
	computed:{
		text(){
			let text="公告：";
			return this.result.attr.content?text+this.result.attr.content:text+"请填写内容，如果过长，将会在手机上滚动显示";
		}
	},
	components:{
		actionsComponent
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.notice{
		padding:10px;
		overflow:hidden;
		p{
			margin:0;
			padding:0;
			white-space:nowrap;
		}
	}
</style>