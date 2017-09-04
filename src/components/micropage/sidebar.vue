<template>
	<div class="sidebar" v-if="!sidebar.isHidden" :class="{isRegion:sidebar.isRegion,isDisplay:sidebar.isDisplay}" :style="[{top:sidebar.top+'px'}]">
    <div v-if="sidebar.isRegion">
			<regionComponent ref="region" :data="data"></regionComponent>
		</div>
		<div v-else>
      <h4>{{region.config[result.type]}}</h4>
			<component :is="result.type+'Component'" :result="result" :active="active"></component>
		</div>
	</div>
</template>
<script>
import regionComponent from './region'
import lineComponent from './line/sidebar'
import whiteComponent from './white/sidebar'
import noticeComponent from './notice/sidebar'
import searchComponent from './search/sidebar'
import titleComponent from './title/sidebar'
import textNavComponent from './textNav/sidebar'
import picNavComponent from './picNav/sidebar'
import imageAdComponent from './imageAd/sidebar'
import showcaseComponent from './showcase/sidebar'
import goodsComponent from './goods/sidebar'
import groupBuyComponent from './groupBuy/sidebar'
import {mapGetters} from 'vuex'
export default {
  name: 'sidebar',
  props: ['result', 'active', 'data'],
  computed: mapGetters([
    'index',
    'sidebar',
    'region'
  ]),
  components: {
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
    goodsComponent,
    groupBuyComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.sidebar{
    position: absolute;
    background:white;
    left: calc(~'40% + 180px') !important;
    // min-width: 290px;
    max-width: 500px;
    padding: 10px 15px;
    margin-top: 65px;
    margin-right: -12px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    margin-bottom: 70px;
    h4 {
      margin: 0;
      font-weight:normal;
      font-size:16px;
      display: inline-block;
      padding-right:10px;
      border-bottom: 2px solid #2196f3;
    }
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
		}
    &.isDisplay{
      opacity:1;
    }
    opacity:0;
	}
	.sidebar.isRegion{
    width:315px;
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
  .mu-raised-button-label{
    height:36px;
  }
</style>
