<template>
	<div class="sidebar" :class="{isHidden : isHidden,isRegion:isRegion}" v-if="result" :style="[{top:top+'px'}]">
		<div v-if="isRegion">
			<regionComponent ref="region" :data="data"></regionComponent>
		</div>
		<div v-else>
			<div v-if="result.type==='line'">
				<lineComponent :result="result"></lineComponent>
			</div>
			<div v-if="result.type==='white'">			
				<whiteComponent :result="result" :active="active"></whiteComponent>
			</div>
			<div v-if="result.type==='notice'">			
				<noticeComponent :result="result" :active="active"></noticeComponent>
			</div>
			<div v-if="result.type==='search'">			
				<searchComponent :result="result" :active="active"></searchComponent>
			</div>
			<div v-if="result.type==='title'">			
				<titleComponent :result="result" :active="active"></titleComponent>
			</div>
			<div v-if="result.type==='textNav'">			
				<textNavComponent :result="result" :active="active"></textNavComponent>
			</div>
		</div>
	</div>
</template>
<script>
import regionComponent from './region';
import lineComponent from './line/sidebar';
import whiteComponent from './white/sidebar';
import noticeComponent from './notice/sidebar';
import searchComponent from './search/sidebar';
import titleComponent from './title/sidebar';
import textNavComponent from './textNav/sidebar';
export default {
  	name: 'sidebar',
	props: ["result","active","data"],
	components:{
		regionComponent,
		lineComponent,
		whiteComponent,
		noticeComponent,
		searchComponent,
		titleComponent,
		textNavComponent
	},
	data(){
		return {
			top:0,
			isHidden:true,
			isRegion:false
		}
	},
	methods:{
		click(top){
			top+=10
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.sidebar{
		/*box-sizing:initial;*/
		font-size:14px;
		border:1px solid #c5c5c5;
		position:absolute;
		right:-100%;
		width:90%;
		padding:3% 5%;
		margin-top:-1px;
		margin-right:-12px;
	    border-radius: 5px;
	    border: 1px solid #d1d1d1;
		/*top:0;*/
		&:before{
			content:'';
			position:absolute;
			border:7px solid transparent;
			border-right-color:#c5c5c5;
			left:-14px;
			top:7px;
		}
		&:after{
			content:'';
			position:absolute;
			border:6px solid transparent;
			border-right-color:white;
			left:-12px;
			top:8px;
		}
	}
	.isHidden{
		display:none;
	}
	.isRegion{
		width:100%;
		padding:0;
	}
</style>
