<template>
	<div class="sidebar" v-if="!$store.state.sidebar.isHidden" :class="{isRegion:$store.state.sidebar.isRegion}" :style="[{top:$store.state.sidebar.top+'px'}]">
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
import showcaseComponent from './showcase/sidebar';
import goodsComponent from './goods/sidebar';
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
		imageAdComponent,
		showcaseComponent,
		goodsComponent
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
		left:105%;
		min-width:100%;
		padding:3% 5%;
	    margin-top:65px;
		margin-right:-12px;
	    border-radius: 5px;
	    border: 1px solid #d1d1d1;
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
			padding:8px 0;
			background:white;
		}
	}
	.demo-tip-setting p{
	  display: flex;
	  align-items: center;
	  white-space:nowrap;
	}
	.demo-tip-setting .mu-radio {
	  margin-left: 32px;
	}
	.demo-tip-setting .mu-radio:first-child{
	  margin-left: 0;
	}
	.demo-tip-setting .mu-switch {
	  margin-left: 8px;
	}
</style>
