<template>
	<div class="imageAd">
		<div v-if="/^(carousel)$/.test(result.attr.type)" :class="result.attr.carousel">
			<div class="imgBox carousel">
				<img v-if="!result.attr.list.length" :src="cpdcarousel" />
				<div v-else>
					<ul :style="{width:result.attr.list.length*3.2+'rem'}">
						<!--<li v-for="item of result.attr.list">
							<img :src="item.img" />
							<p v-show="item.text" v-text="item.text"></p>
						</li>-->
						<li>
							<img :src="result.attr.list[0].img" :class="{noImg:!result.attr.list[0].img}" />
							<p v-text="result.attr.list[0].text || '请设置导航名称'"></p>
						</li>
					</ul>
					<div class="pointer">
						<span v-for="item of result.attr.list"></span>
					</div>
				</div>
			</div>
		</div>
		<div v-if="/^(separate)$/.test(result.attr.type)" :class="result.attr.separate">
			<img v-if="!result.attr.list.length" :src="cpdSeparate" />
			<template v-else v-for="item of result.attr.list">
				<div class="imgBox">
					<img :src="item.img" :class="{noImg:!item.img}" />
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
<style lang="less">
.imageAd{
	div{
		overflow:hidden;
	}
	.big{
		.imgBox{
			/*margin:0 4px;*/
			margin:0 .04rem;
		}
		img{
			width:100%;
			margin:0 auto;
			&.noImg{
				height:100px;
			}
		}
	}
	.small{
		>div{
			width:50%;
			float:left;
		}
		img{
			width:100%;
			/*height:160px;*/
			height:1.6rem;
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
		    /*padding: 5px 10px;*/
		    padding: .05rem .1rem;
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
		    /*padding: 5px 10px;*/
		    padding: .05rem .1rem;
		    text-align:center;
		    position: absolute;
		    bottom: 0.04rem;
			left:0;
		    z-index: 9;
			.swiper-pagination-bullet{
				opacity:.7;
			    background: #eee;
			}
			.swiper-pagination-bullet-active{
				background-color:#007aff;
			}
		}
	}
}
</style>
<style lang="less" scoped>	
.imageAd{
	min-height:50px;
	.carousel{
		ul{
			min-height:100px;
			li{
				position:relative;
				width:3.2rem;
				float:left;
				.noImg{
					height:100px;
				}
			}	
		}
		.pointer{
			width:100%;
			bottom:0;
			margin:0;
			span{
				display:inline-block;
				/*width:5px;
				height:5px;*/
				/*margin:0 3px;*/
				width:.08rem;
				height:.08rem;
				margin:0 .05rem;
				border-radius:50%;
			    background: #eee;
			    &:nth-child(1){
			    	background-color:#007aff;
			    }
			}
		}
	}	
}
</style>