<template>
	<div class="title" :style="{backgroundColor:backgroundColor,textAlign: textAlign}">
	<!--<div class="title" :class="{normal:result.attr.type==='normal'}">-->
		<div class="text" v-text="title"></div>
		<div v-show="result.attr.type==='normal'">
			<span v-text="result.attr.normal.subtitle"></span>
		</div>
		<div v-show="result.attr.type==='wechat'">
			<span v-text="result.attr.wechat.date"></span>
			<span v-text="result.attr.wechat.author"></span>
			<a :href="result.attr.wechat.link.url" v-text="result.attr.wechat.link.title"></a>
		</div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
import actionsComponent from '../actions';
export default {
  	name: 'title',
	props: ["result","index","data"],
	components:{
		actionsComponent
	},
	computed:{
		title(){
			return this.result.attr.title || '点击编辑『标题』';
		},
		backgroundColor(){
			return this.result.attr.type==='normal'?this.result.attr.normal.backgroundColor:'#ffffff';
		},
		textAlign(){
			return this.result.attr.type==='normal'?this.result.attr.normal.textAlign:'left';
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.title{
		padding:10px;
		.text{
		    font-size: 18px;
		    line-height: 22px;
		}
		a{
			color:#07d;
			text-decoration:none;
		}
	}
</style>