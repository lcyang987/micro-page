<template>
	<div class="showCase" v-if="result.attr.list">
		<h3 v-text="result.attr.title" v-show="result.attr.title"></h3>
		<div :class="result.attr.type">
			<template v-for="item,i of result.attr.list">
				<div class="imgBox" :class="{keep:/^(keep)$/.test(result.attr.space),clear:/^(clear)$/.test(result.attr.space)}">
					<img v-if="item.img" :src="item.img.replace(/\/w\/\d+\/h\/\d+$/, '') + '/w/450/h/450'" />
					<img v-else :src="require('assets/micropage/images/p'+(i+1)+'.jpg')" class="visibility" />
				</div>
			</template>
		</div>
		<div class="content">
			<h4 v-text="result.attr.contentTitle" v-show="result.attr.contentTitle"></h4>
			<article v-text="result.attr.contentDescription" v-show="result.attr.contentDescription"></article>
		</div>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  name: 'showCase',
  props: ['result']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.showCase{
		h3,h4,article{
			margin:0;
			padding:6px 10px;
		}
		h3{
			font-weight:normal;
		}
		img{
			width:100%;
			height:100%;
		}
		.content{
			text-align:center;
		}
		min-height:50px;
		div{
			overflow:hidden;
		}
		.visibility{
			/*visibility: hidden;*/
		}
		.imgBox{
			position:relative;
			p{
				position:absolute;
				width:100%;
				left:0;
				bottom:0;
				margin:0;
			    padding: 5px 10px;
			    background-color: rgba(51,51,51,0.8);
			    color: #fff;
			    font-size: 14px;
			}
		}
		.prominent{
			.imgBox{
				/*width:105px;
				height:105px;*/
				width:1.05rem;
				height:1.05rem;
				float:left;
			}
			.keep:nth-child(1){
				/*width:212px;
				height:212px;*/
				width:2.12rem;
				height:2.12rem;
				/*margin-right:2px;*/
				margin-right:.02rem;
			}
			.keep:nth-child(2){
				/*margin-bottom:2px*/
				margin-bottom:.02rem;
			}
			.clear:nth-child(1){
				/*width:212px;
				height:212px;*/
				/*margin-left:1px;*/
				width:2.12rem;
				height:2.12rem;
				margin-left:.01rem;
			}
			.clear{
				/*width:106px;
				height:106px;*/
				width:1.06rem;
				height:1.06rem;
			}
		}
		.column{
			.keep{
				/*width:105px;
				height:105px;*/
				/*margin-left:2px;*/
				width:1.05rem;
				height:1.05rem;
				margin-left:.02rem;
				float:left;
			}
			.keep:nth-child(1){
				margin-left:0;
			}
			.clear{
				/*width:105px;
				height:105px;*/
				width:1.05rem;
				height:1.05rem;
				float:left;
			}
			.clear:nth-child(1){
				/*margin-left:2px;*/
				margin-left:.02rem;
			}
		}
	}
</style>

<style lang="less" scope>
	.showCase{
		.prominent{
			.imgBox{
				width:105px;
				height:105px;
			}
			.keep:nth-child(1){
				width:212px;
				height:212px;
				margin-right:2px;
			}
			.keep:nth-child(2){
				margin-bottom:2px
			}
			.clear:nth-child(1){
				width:212px;
				height:212px;
				margin-left:1px;
			}
			.clear{
				width:106px;
				height:106px;
			}
		}
		.column{
			.keep{
				width:105px;
				height:105px;
				margin-left:2px;
			}
			.clear{
				width:105px;
				height:105px;
			}
			.clear:nth-child(1){
				margin-left:2px;
			}
		}
	}
</style>
