<template>
	<div class="goods" v-if="result.attr.list">
		<template v-for="item,i of list">
			<div :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" >
				<div class="goodsBox" :class="result.attr.style">
					<div class="imgBox">
						<img :src="item.img||require('assets/images/p'+(i+1)+'.jpg')"/>
					</div>
					<div class="other">
						<h4 :class="{show:result.attr.display.text}" v-text="item.text||'此处显示商品名称'"></h4>
						<p :class="{show:result.attr.display.info}" v-text="item.info||'此处显示商品简介'"></p>
						<b :class="{show:result.attr.display.price}" v-text="item.price||'￥9999.00'"></b>
						<span :class="['btn'+result.attr.btn,{show:result.attr.display.btn}]"></span>
					</div>
				</div>
			</div>
		</template>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'goods',
	props: ["result","index","data"],
	computed:{
		list(){
			if(this.result.attr.list[0].img){
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
<style lang="less" scoped>
	.goods{
		overflow:hidden;
		padding:5px;
		padding-bottom:10px;
		h4,p{
			margin:0;
		}
		>div{			
			padding:5px;
		}
		.big{
			.goodsBox{
				.other{
					p.show{
						display:block !important;
					}
				}
			}
		}
		.small{
			width:50%;
			float:left;
			.goodsBox.easy{
				.other{
					position:relative;
					b.show{
						display:block !important;
						position:absolute;
						padding:0;
						font-size:12px;
						background:rgba(0,0,0,0.4);
						right:8px;
						bottom:8px;
						color:white;
						padding:2px 3px;
						border-radius:3px;
					}
				}
			}
		}
		.arrange12{
			&.ismall{
				width:50%;
				float:left;
				.goodsBox{
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
							right:8px;
							bottom:8px;
							color:white;
							padding:2px 3px;
							border-radius:3px;
						}
						b.show{
							display:block !important;
							position:absolute;
							padding:0;
							font-size:12px;
							background:rgba(0,0,0,0.4);
							right:8px;
							bottom:8px;
							color:white;
							padding:2px 3px;
							border-radius:3px;
						}
					}
				}
			}
			&.ibig{
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
				}
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
				border-bottom:1px solid #e5e5e5;
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
				border:1px solid #e5e5e5;
			}
			position:relative;
			padding:5px;
			.imgBox{
				img{
					width:100%;
				}
			}
			.other{
				&>*{
					display:none;
					padding:5px 0;
				}
				.show{
					display:block;
				}
				p{
					display:none !important;
				}
				b{
					color:#ff6600;
				}
				span{
					position:absolute;
					background-image: url(~assets/images/goods_btn.png);
					&.btn1{						
						width:30px;
						height:25px;
						bottom:7px;
						right:6px;
					}
					&.btn2{						
						width:20px;
						height:20px;
						bottom:10px;
						right:10px;
						background-position-y:-24px;
					}
					&.btn3{						
						width:40px;
						height:23px;
						bottom:5px;
						right:-5px;
						background-position-y:-45px;
					}
					&.btn4{						
						width:37px;
						height:20px;
						bottom:8px;
						right:8px;
						background-position-y:-68px;
					}
				}
			}
		}
	}
</style>