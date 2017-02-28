<template>
	<div class="sidebar" :class="{isHidden : $store.state.sidebar.isHidden,isRegion:$store.state.sidebar.isRegion}" v-if="result" :style="[{top:$store.state.sidebar.top+'px'}]">
		<div v-if="$store.state.sidebar.isRegion">
			<regionComponent ref="region" :data="data"></regionComponent>
		</div>
		<div v-else>
			<component :is="result.type+'Component'" :result="result" :active="active"></component>
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
import picNavComponent from './picNav/sidebar';
import imageAdComponent from './imageAd/sidebar';
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
		textNavComponent,
		picNavComponent,
		imageAdComponent
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
		/*width:90%;*/
		width:100%;
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
		section{
			margin-bottom:8px;
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
<style lang="less">
	.sidebar{
		section{
			margin-bottom:8px;
		}
	}
</style>
