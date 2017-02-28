<template>
	<div class="imageAd" v-if="result.attr.list">
		<div v-if="result.attr.type==='separate'" :class="{small:result.attr.separate==='small',big:result.attr.separate==='big'}">
			<template v-for="item of result.attr.list">
				<div class="imgBox" :class="{visibility:!item.img}">
					<img :src="item.img" />
					<p v-show="item.text" v-text="item.text"></p>
				</div>
			</template>
		</div>
		<div v-else>
			<div class="imgBox carousel" v-if="result.attr.list[0] && result.attr.list[0].img">
				<img :src="result.attr.list[0].img" />
				<p v-show="result.attr.list[0].text" v-text="result.attr.list[0].text"></p>
				<div class="pointer">
					<span v-for="item of result.attr.list"></span>
				</div>
			</div>
		</div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'imageAd',
	props: ["result","index","data"]	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.imageAd{
		min-height:50px;
		div{
			overflow:hidden;
		}
		.big{
			.imgBox{
				margin:0 4px;
			}
			img{
				width:100%;
				display:block;
				margin:0 auto;
			}
		}
		.small{
			>div{
				width:50%;
				float:left;
			}
			img{
				width:100%;
				text-align:center;
			}
		}
		.visibility{
			visibility: hidden;
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
		.carousel{
			img{
				width:100%;
				height:100%
			}
			.pointer{
				position:absolute;
				width:100%;
				left:0;
				bottom:0;
				margin:0;
			    padding: 5px 10px;
			    text-align:center;
				span{
					display:inline-block;
					width:5px;
					height:5px;
					border-radius:50%;
					background-color:#eee;
					margin:0 3px;
					&:nth-child(1){
						background-color:red;
					}
				}
			}
		}
	}
</style>