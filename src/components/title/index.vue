<template>
	<div class="title" :style="{backgroundColor:backgroundColor,textAlign: textAlign}">
	<!--<div class="title" :class="{normal:result.attr.type==='normal'}">-->
		<div>
			<h3 class="text" v-text="title"></h3>
			<a v-show="/^(normal)$/.test(result.attr.type)">
				<span v-show="result.attr.normal.textNav.isShow" v-text="'- ' + this.result.attr.normal.textNav.text"></span>
			</a>
		</div>
		<div v-show="/^(normal)$/.test(result.attr.type)">
			<span v-text="result.attr.normal.subtitle"></span>
		</div>
		<div v-show="/^(wechat)$/.test(result.attr.type)">
			<span v-text="result.attr.wechat.date"></span>
			<span v-text="result.attr.wechat.author"></span>
			<a :href="result.attr.wechat.textNav.link.url" v-text="result.attr.wechat.textNav.text"></a>
		</div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'title',
	props: ["result","index","data"],	
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
	    	margin:0;
	    	display:inline-block;
		}
		a{
			color:#07d;
			text-decoration:none;
		}
	}
</style>