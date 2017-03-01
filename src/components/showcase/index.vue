<template>
	<div class="showCase" v-if="result.attr.list">
		<h3 v-text="result.attr.title" v-show="result.attr.title"></h3>
		<div :class="{prominent:result.attr.type==='default',column:result.attr.type==='3'}">
			<template v-for="item,i of result.attr.list">
				<div class="imgBox" :class="{keep:result.attr.space==='keep',clear:result.attr.space==='clear'}">
					<img :src="item.img||imgs[i]" :class="{visibility:!item.img}"/>
				</div>
			</template>
		</div>
		<div class="content">
			<h4 v-text="result.attr.contentTitle" v-show="result.attr.contentTitle"></h4>
			<article v-text="result.attr.contentDescription" v-show="result.attr.contentDescription"></article>	
		</div>		
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'showCase',
	props: ["result","index","data"],
	data(){
		return {
			imgs:[
				require('assets/images/p1.jpg'),
				require('assets/images/p2.jpg'),
				require('assets/images/p3.jpg')
			]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.showCase{
		h3,h4,article{
			margin:0;
			padding:6px 10px;
		}
		h3{
			font-weight:normal;
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
				width:33%;
				float:left;
				img{
					width:100%;
					display:block;
				}
			}	
			.keep:nth-child(1){
				width:66.5%;
				margin-right:0.5%;
			}
			.keep:nth-child(2){
				margin-bottom:0.5%
			}
			.clear:nth-child(1){
				width:66.5%;
				margin-left:0.5%;
				img{
					width:100%;
				}
			}
		}
		.column{
			.keep{
				width:33%;
				float:left;
				margin-left:0.5%;
				img{
					width:100%;
				}
			}
			.keep:nth-child(1){
				margin-left:0;
			}
			.clear{
				width:33%;
				float:left;
				img{
					width:100%;
				}
			}
			.clear:nth-child(1){
				margin-left:0.5%;
			}
		}
	}
</style>