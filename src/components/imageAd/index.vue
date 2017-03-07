<template>
	<div class="imageAd">
		<div v-if="/^(carousel)$/.test(result.attr.type)" :class="result.attr.carousel">
			<div class="imgBox carousel">
				<img v-if="!result.attr.list.length" :src="cpdcarousel" />
				<div v-else>
					<div v-if="result.attr.list[0].img">
						<img :src="result.attr.list[0].img" />
						<p v-show="result.attr.list[0].text" v-text="result.attr.list[0].text"></p>
						<div class="pointer">
							<span v-for="item of result.attr.list"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="/^(separate)$/.test(result.attr.type)" :class="result.attr.separate">
			<img v-if="!result.attr.list.length" :src="cpdSeparate" />
			<template v-else v-for="item of result.attr.list">
				<div class="imgBox">
					<img v-show="item.img" :src="item.img" />
					<p v-show="item.img,item.text" v-text="item.text"></p>
				</div>
			</template>
		</div>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'imageAd',
	props: ["result"],
	computed:{
		cpdcarousel(){
			var img='';
			if(this.result.attr.list.length && this.result.attr.list[0].img)
				img=this.result.attr.list[0].img;
			else
				img=require('assets/images/carousel.jpg');
			return img
		},
		cpdSeparate(){
			var img='';
			if(!this.result.attr.list.length || !this.result.attr.list[0].img)
				img=require('assets/images/separate.jpg');
			return img
		}
	}
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
				height:160px;
				text-align:center;
			}
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