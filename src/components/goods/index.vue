<template>
	<div class="goods" v-if="result.attr.list">
		<template v-if="result.attr.style!=='falls'">
			<div v-for="item,i of list" :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" v-if="item instanceof Object===false || item.img">
				<div class="goodsBox" :class="result.attr.style">
					<div class="imgBox">
						<img v-if="list instanceof Array" :src="item.img" alt="暂无图片"/>
						<img v-else :src="item.img||require('assets/images/p'+(i+1)+'.jpg')"/>
					</div>
					<div class="other">
						<h4 :class="{show:result.attr.display.text}" v-text="item.text||'此处显示商品名称'"></h4>
						<p :class="{show:result.attr.display.info}" v-text="item.info||'此处显示商品简介'"></p>
						<b v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price" :class="{show:result.attr.display.price}" v-text="result.attr.display.price?item.price||'￥9999.00':''"></b>
						<span :class="['btn'+result.attr.btn,{show:result.attr.display.btn}]"></span>
						<strong class="sale">我要<br/>抢购</strong>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="fallsLayout">
				<div v-for="item,i of list" :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" v-if="(item instanceof Object===false || item.img) && i%2==0">
					<div class="goodsBox" :class="result.attr.style">
						<div class="imgBox">
							<img v-if="list instanceof Array" :src="item.img" alt="暂无图片"/>
							<img v-else :src="item.img||require('assets/images/p'+(i+1)+'.jpg')"/>
						</div>
						<div class="other">
							<h4 :class="{show:result.attr.display.text}" v-text="item.text||'此处显示商品名称'"></h4>
							<b v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price" :class="{show:result.attr.display.price}" v-text="result.attr.display.price?item.price||'￥9999.00':''"></b>
							<span :class="['btn'+result.attr.btn,{show:result.attr.display.btn}]"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="fallsLayout">
				<div v-for="item,i of list" :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" v-if="(item instanceof Object===false || item.img) && i%2==1">
					<div class="goodsBox" :class="result.attr.style">
						<div class="imgBox">
							<img v-if="list instanceof Array" :src="item.img" alt="暂无图片"/>
							<img v-else :src="item.img||require('assets/images/p'+(i+1)+'.jpg')"/>
						</div>
						<div class="other">
							<h4 :class="{show:result.attr.display.text}" v-text="item.text||'此处显示商品名称'"></h4>
							<b v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price" :class="{show:result.attr.display.price}" v-text="result.attr.display.price?item.price||'￥9999.00':''"></b>
							<span :class="['btn'+result.attr.btn,{show:result.attr.display.btn}]"></span>
						</div>
					</div>
				</div>
			</div>
		</template>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
	name: 'goods',
	props: ["result"],
	computed:{
		list(){
			if(this.result.attr.list.length&&this.result.attr.list[0].img){
				return this.result.attr.list
			}else{
				if(this.result.attr.type==='small')
					return 4;
				else
					return 3;
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.goods{
		overflow:hidden;
		/*padding:5px;*/
		padding:.05rem;
		h4,p{
			margin:0;
			font-size:12px;
		}
		>div{			
			/*padding:5px;*/
			padding:0.05rem;
		}
		.fallsLayout{
			float:left;
			width:50%;
			/*padding:0 5px;*/
			padding:0 .05rem;
			.small{
				width:100%;
				border:1px solid #e5e5e5;
				margin:5px 0;
				/*border:.01rem solid #e5e5e5;
				margin:.05rem 0;*/
				img{
					height:auto;
				}
				.falls{
					/*padding:5px;*/
					padding:.05rem;
				}
			}
		}
		.big{
			.goodsBox.card{
				.other{
					p.show{
						display:block !important;
					}
				}
			}
			.goodsBox.easy{
				border:none;
				.other{
					position:relative;
					h4.show{
						display:block !important;
						position:absolute;
						padding:0;
						width:95%;
						font-size:12px;
						background:rgba(0,0,0,0.4);
						color:white;
						/*right:8px;
						bottom:8px;
						padding:2px 3px;
						border-radius:3px;*/
						right:.08rem;
						bottom:.08rem;
						padding:.02rem .03rem;
						border-radius:.03rem;
						& + p + b{
							background:none !important;
						}
					}
					b{
						display:none;
					}
					b.show{
						display:block !important;
						position:absolute;
						padding:0;
						font-size:12px;
						background:rgba(0,0,0,0.4);
						color:white;
						/*right:8px;
						bottom:8px;
						padding:2px 3px;
						border-radius:3px;*/
						right:.08rem;
						bottom:.08rem;
						padding:.02rem .03rem;
						border-radius:.03rem;
					}
					span{
						display:none;
					}
				}
			}
		}
		.small{
			width:50%;
			float:left;
			img{
				/*height:133px;*/
				height:1.33rem;
			}
			.goodsBox.easy{
				.other{
					position:relative;
					b.show{
						display:block !important;
						position:absolute;
						padding:0;
						font-size:12px;
						background:rgba(0,0,0,0.4);
						color:white;
						/*right:8px;
						bottom:8px;
						padding:2px 3px;
						border-radius:3px;*/
						right:.08rem;
						bottom:.08rem;
						padding:.02rem .03rem;
						border-radius:.03rem;
					}
				}
			}
			.goodsBox.sale{
				/*border:1px solid #e5e5e5;*/
				border:.01rem solid #e5e5e5;
				img{
					position:relative;
					z-index: 2;
				}
				.other{
					&>*{
						display:none;
					}
					b{
						display:block;
						visibility:visible;
						padding:9px 0;
						/*text-indent:5px;*/
						text-indent:.05rem;
					}
					strong{
						display:block;
						position:absolute;
						background:red;
						color:white;
						bottom:0;
						right:0;
						padding:4px 8px;
						line-height:16px;
					}
				}
				
			}
		}
		.arrange12{
			&.ismall{
				width:50%;
				float:left;
				.goodsBox{
					img{
						/*height:133px;*/
						height:1.33rem;
					}
					.other{
						h4{
							display:none;
						}
					}
					&.easy{
						.other{
							h4.show{
								display:none !important;
							}
						}
					}
				}
			}
			.goodsBox{
				.other{
					h4.show,b.show{
						display:block;
					}
				}
				&.easy{
					.other{
						position:relative;
						h4.show{
							display:block !important;
							position:absolute;
							padding:0;
							width:95%;
							font-size:12px;
							background:rgba(0,0,0,0.4);
							color:white;
							/*right:8px;
							bottom:8px;
							padding:2px 3px;
							border-radius:3px;*/
							right:.08rem;
							bottom:.08rem;
							padding:.02rem .03rem;
							border-radius:.03rem;
						}
						b.show{
							display:block !important;
							position:absolute;
							padding:0;
							font-size:12px;
							background:rgba(0,0,0,0.4);
							color:white;
							/*right:8px;
							bottom:8px;
							padding:2px 3px;
							border-radius:3px;*/
							right:.08rem;
							bottom:.08rem;
							padding:.02rem .03rem;
							border-radius:.03rem;
						}
					}
				}
			}
			&.ibig{
				clear:both;
				.easy{
					.other{
						h4.show{
							& + p + b{
								background:none !important;
							}
						}
					}
				}
			}
		}
		.list{
			.imgBox{
				width:40%;
				float:left;
			}
			.other{
				width:55%;
				float:right;
				h4{
					display:block;
				}
				b{
					display:block;
					visibility:visible;
				}
			}
			.easy{
				/*padding-bottom:5px;*/
				padding-bottom:.05rem;
			}
		}
		.small,.arrange12{
			.goodsBox.easy{
				.other{
					&>*{
						display:none!important;
					}
				}
			}
		}
		.big,.list{
			.easy{
				/*border-bottom:1px solid #e5e5e5;*/
				border-bottom:.01rem solid #e5e5e5;
			}
		}
		.goodsBox{
			&:before{
				content:'';
				display:block;
				clear:both;
			}
			&:after{
				content:'';
				display:block;
				clear:both;
			}
			&.card{
				/*border:1px solid #e5e5e5;
				padding:5px;*/
				border:.01rem solid #e5e5e5;
				padding:.05rem;
			}
			position:relative;
			.imgBox{
				img{
					width:100%;
				}
			}
			.other{
				&>*{
					display:none;
					padding:5px 0;
					/*padding:.05rem 0;*/
				}
				.show{
					display:block;
					visibility:visible;
				}
				p{
					display:none !important;
				}
				b{
					padding-top:10px;
					/*padding-top:.1rem;*/
					display:block;
					visibility:hidden;
					color:#ff6600;
				}
				span{
					position:absolute;
					background-image: url(~assets/images/goods_btn.png);
					&.btn1{
						width:30px;
						height:25px;
						/*bottom:7px;
						right:6px;*/
						bottom:.07rem;
						right:.06rem;
					}
					&.btn2{
						width:20px;
						height:20px;
						background-position-y:-24px;
						/*bottom:8px;
						right:8px;*/
						bottom:.08rem;
						right:.08rem;
					}
					&.btn3{
						width:40px;
						height:23px;
						background-position-y:-45px;
						/*bottom:5px;
						right:-5px;*/
						bottom:.05rem;
						right:-.05rem;
					}
					&.btn4{
						width:37px;
						height:20px;
						background-position-y:-68px;
						/*bottom:8px;
						right:8px;*/
						bottom:.08rem;
						right:.08rem;
					}
				}
			}
		}
	}
</style>