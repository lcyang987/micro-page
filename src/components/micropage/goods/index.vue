<template>
	<div class="goods" v-if="result.attr.list" :class="{noTopWhite: !result.attr.topWhite}">
		<template v-if="result.attr.style!=='falls'">
			<div v-for="item,i of list" :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" v-if="item instanceof Object===false || item.img">
				<div class="goodsBox" :class="result.attr.style">
					<div class="imgBox">
            <template v-if="list instanceof Array">
              <img v-if="item.img" :src="item.img + '/w/640/h/640'" />
  						<div v-if="item.totalStock === 0" class="soldOut"></div>
            </template>
            <img v-else :src="require('assets/micropage/images/p'+(i+1)+'.jpg')" />
					</div>
					<div class="other">
						<h4 :class="{'m-show':result.attr.display.text}" v-text="item.text ? item.text.length > 35 ? item.text.substring(0, 35) + '...' : item.text : '此处显示商品名称'"></h4>
						<p :class="{'m-show':result.attr.display.info}" v-text="item.info||'此处显示商品简介'"></p>
						<i v-if="typeof(result.attr.display.specification) !== 'undefined'" :class="{'m-show':result.attr.display.specification}" v-text="item.specification ? '规格:' + item.specification : '此处显示规格'"></i>
            <div class="price" v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price" :class="{'m-show':result.attr.display.price}">
              <b class="currency">￥</b><b class="int" v-text="item.price ? ('' + item.price).split('.')[0] : '99'"></b><b class="decimal" v-text="item.price ? ('' + item.price).split('.')[1] ? '.' + ('' + item.price).split('.')[1] : '' : '.00'"></b>
            </div>
						<!-- <b v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price || result.attr.style==='sale'" :class="{'m-show':result.attr.display.price}" v-text="result.attr.display.price && item.price? '￥' + item.price : '￥9999.00'"></b> -->
						<span :class="['btn'+result.attr.btn,{'m-show':result.attr.display.btn}]"></span>
						<strong class="sale">马上抢</strong>
					</div>
				</div>
			</div>
		</template>
		<!-- <template v-else>
			<div class="fallsLayout">
				<div v-for="item,i of list" :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" v-if="(item instanceof Object===false || item.img) && i%2==0">
					<div class="goodsBox" :class="result.attr.style">
						<div class="imgBox">
              <template v-if="list instanceof Array">
                <img v-if="item.img" :src="item.img + '/w/640/h/640'" />
    						<div v-if="item.totalStock === 0" class="soldOut"></div>
              </template>
              <img v-else :src="require('assets/micropage/images/p'+(i+1)+'.jpg')" />
						</div>
						<div class="other">
							<h4 :class="{'m-show':result.attr.display.text}" v-text="item.text||'此处显示商品名称'"></h4>
              <div class="price" v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price" :class="{'m-show':result.attr.display.price}">
                <b class="currency">￥</b><b class="int" v-text="item.price ? ('' + item.price).split('.')[0] : '99'"></b><b class="decimal" v-text="item.price ? ('' + item.price).split('.')[1] ? '.' + ('' + item.price).split('.')[1] : '' : '.00'"></b>
              </div>
							<span :class="['btn'+result.attr.btn,{'m-show':result.attr.display.btn}]"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="fallsLayout">
				<div v-for="item,i of list" :class="[result.attr.type,{ismall:/^arrange12$/.test(result.attr.type) && i%3!==0},{ibig:/^arrange12$/.test(result.attr.type) && i%3===0}]" v-if="(item instanceof Object===false || item.img) && i%2==1">
					<div class="goodsBox" :class="result.attr.style">
						<div class="imgBox">
              <template v-if="list instanceof Array">
                <img v-if="item.img" :src="item.img + '/w/640/h/640'" />
    						<div v-if="item.totalStock === 0" class="soldOut"></div>
              </template>
              <img v-else :src="require('assets/micropage/images/p'+(i+1)+'.jpg')" />
						</div>
						<div class="other">
							<h4 :class="{'m-show':result.attr.display.text}" v-text="item.text||'此处显示商品名称'"></h4>
              <div class="price" v-if="result.attr.display.text || (result.attr.type==='big' && result.attr.display.info) || result.attr.display.price" :class="{'m-show':result.attr.display.price}">
                <b class="currency">￥</b><b class="int" v-text="item.price ? ('' + item.price).split('.')[0] : '99'"></b><b class="decimal" v-text="item.price ? ('' + item.price).split('.')[1] ? '.' + ('' + item.price).split('.')[1] : '' : '.00'"></b>
              </div>
							<span :class="['btn'+result.attr.btn,{'m-show':result.attr.display.btn}]"></span>
						</div>
					</div>
				</div>
			</div>
		</template> -->
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  name: 'goods',
  props: ['result'],
  computed: {
    list () {
      if (this.result.attr.list.length && this.result.attr.list[0].img) {
        return this.result.attr.list
      } else {
        if (this.result.attr.type === 'big') {
          return 1
        } else if (this.result.attr.type === 'small') {
          return 4
        } else {
          return 3
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
  @red: #e13636;
	.design .goods{
    h4{
      color: black;
    }
    &.noTopWhite{
      margin-top:-4px;
    }
    .imgBox{
      position: relative;
      .soldOut{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.9;
        background-image: url('~assets/micropage/images/sold_out.png');
        background-size: contain;
      }
    }
    .other{
      i{
        font-size: 12px;
        font-style:normal;
        color: #999;
      }
      .price{
        display:inline;
        b{
          color: @red;
          font-size: 16px;
        }
        .currency{
          font-weight: normal;
          font-size: 12px;
        }
      }
    }
    // background-color: #e5e5e5;
		.big, .small, .arrange12,{
      h4{
        height:56px;
        overflow:hidden;
      }
			.goodsBox.easy{
				.other{
					&>*{
						display:none!important;
					}
				}
			}
      .easy{
        .price{
          b{
            color: white !important;
          }
        }
      }
		}
    .goodsBox{
      position:relative;
      background-color: white;
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
        .m-show{
          display:block;
          visibility:visible !important;
        }
        p{
          display:none !important;
        }
        .price{
          padding:10px 0 8px;
          display:block;
          visibility:hidden;
        }
      }
    }
    overflow:hidden;
		padding:2px;
    .other h4{
      font-weight:normal;
    }
		h4,p{
			margin:0;
			font-size:12px;
		}
		>div{
			padding:2px;
		}
		.fallsLayout{
			float:left;
			width:50%;
      padding: 0 2px;
      img{
        height:auto !important;
      }
			.small{
  			float:left;
				width:100%;
				border:1px solid #e5e5e5;
				margin: 2px 0;
        .other{
          padding: 0 8px !important;
          h4{
            height: 40px;
          }
          .price{
            padding: 10px 0 8px !important;
          }
        }
  			.goodsBox.easy{
  				.other{
  					position:relative;
  					.price.m-show{
  						display:block !important;
  						position:absolute;
  						padding:0;
  						font-size:12px;
  						background:rgba(0,0,0,0.4);
  						color:white;
  					}
  				}
  			}
  			.goodsBox.sale{
  				border:.01rem solid #e5e5e5;
  				img{
  					position:relative;
  					z-index: 2;
  				}
  				.other{
  					&>*{
  						display:none;
  					}
  					.price{
  						display:block;
  						visibility:visible;
  						padding:10px 0 8px;
  					}
  					strong{
  						display:block;
  						position:absolute;
  						background:@red;
  						color:white;
  						bottom:9px;
  						right:8px;
  						padding:4px 8px;
  						line-height:16px;
              border-radius: 3px;
              font-size:12px;
              font-weight:normal;
  					}
  				}
  			}
			}
		}
		.big{
      .goodsBox.card{
        .imgBox{
          img{
            height: 310px;
          }
        }
				.other{
					h4.m-show{
            height:26px;
            font-size:14px;
            padding-bottom:0;
          }
					p.m-show{
            color: #999;
						display:block !important;
            padding: 0;
            max-height: 36px;
            overflow: hidden;
            line-height: 18px;
					}
        }
      }
			.goodsBox.easy{
				border:none;
        .imgBox{
          img{
            height: 312px;
          }
        }
				.other{
					position:relative;
					h4.m-show{
						right:0;
						bottom:0;
						padding:8px 12px;
            font-size:12px;
            line-height:21px;
						display:block !important;
						position:absolute;
						width:100%;
						background:rgba(0,0,0,0.4);
						color:white;
						& + p + i +.price{
							background:none !important;
						}
					}
					.price{
						display:none;
					}
					.price.m-show{
						right:0;
						bottom:0;
						padding:8px 12px;
						display:block !important;
						position:absolute;
						padding:5px 12px !important;
            font-size:14px;
						background:rgba(0,0,0,0.4);
						color:white;
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
      .easy{
        img{
          height: 154px;
        }
      }
      .other{
        padding: 0 8px !important;
        h4{
          height: 40px;
        }
        .price{
          padding: 10px 0 8px !important;
        }
      }
			img{
				height:152px;
			}
			.goodsBox.easy{
				.other{
					position:relative;
					.price.m-show{
						display:block !important;
						position:absolute;
						font-size:12px;
						background:rgba(0,0,0,0.4);
						color:white;
						right:0;
						bottom:0;
            width: 100%;
						padding:5px 8px !important;
					}
				}
			}
			.goodsBox.sale{
				border:1px solid #e5e5e5;
				img{
					position:relative;
					z-index: 2;
				}
				.other{
					&>*{
						display:none;
					}
					.price{
						display:block;
						visibility:visible;
						padding:10px 0 8px;
					}
					strong{
						display:block;
						position:absolute;
						background:@red;
						color:white;
						bottom:9px;
						right:8px;
						padding:4px 8px;
						line-height:16px;
            border-radius: 3px;
            font-size:12px;
            font-weight:normal;
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
						height:152px;
					}
					.other{
            padding: 0 8px;
						h4{
              height: 40px;
							display:none;
						}
            .price.m-show{
              width: 100%;
              padding: 10px 0 8px;
            }
					}
					&.easy{
						.other{
							h4.m-show{
								display:none !important;
							}
						}
					}
				}
			}
			.goodsBox{
				.other{
					h4.m-show, .price.m-show{
						display:block;
					}
				}
				&.easy{
					.other{
						position:relative;
						h4.m-show{
							display:block !important;
							position:absolute;
							padding:0;
							width:100%;
							font-size:12px;
							background:rgba(0,0,0,0.4);
							color:white;
						}
						.price.m-show{
							display:block !important;
							position:absolute;
							padding:0;
							font-size:12px;
							background:rgba(0,0,0,0.4);
							color:white;
						}
					}
				}
			}
			&.ibig{
				clear:both;
        .card{
          .imgBox{
            img{
              height:310px;
            }
          }
					.other{
						h4.m-show{
              height: 26px;
              font-size: 14px;
              padding-bottom: 0;
            }
          }
        }
				.easy{
          .imgBox{
            img{
              height:312px;
            }
          }
					.other{
						h4.m-show{
              font-size:12px;
              line-height:21px;
							// & + p + b{
							// 	background:none !important;
							// }
							& + p + i + .price{
								background:none !important;
							}
						}
            .price.m-show{
              font-size:14px;
              border-radius: 0;
              right: 0;
              bottom: 0;
              padding: 8px 12px;
              display: block !important;
              position: absolute;
              padding: 5px 12px !important;
              font-size: 14px;
              background: rgba(0, 0, 0, 0.4);
              color: white;
            }
					}
				}
			}
			.goodsBox{
				&.easy{
					.other{
						h4.m-show{
							right:0;
							bottom:0;
							padding:8px 12px;
						}
						.price.m-show{
							right:0;
							bottom:0;
							padding:8px 12px;
						}
					}
				}
			}
		}
		.list{
      .goodsBox{
  			.imgBox{
  				width:120px;
          float:left;
          img{
            width: 120px;
            height: 120px;
          }
  			}
        &.card{
          imgBox{
            float:left;
          }
          .other{
            width: 178px;
          }
        }
        &.easy{
          padding-bottom: 4px;
          .other{
            width: 180px;
          }
        }
  			.other{
          float:left;
  				h4{
            display:block !important;
  				}
  				.price.m-show{
            display:block !important;
  					visibility:visible !important;
            position:absolute;
            padding: 3px 0;
            left: 130px;
            bottom: 4px;
            font-size:16px;
  				}
          span.m-show{
  					display:block !important;
  					// &.btn1{
            //   bottom: 15px;
            // }
  					// &.btn2{
            //   bottom: 15px;
            // }
  					// &.btn3{
            //   bottom: 14px;
            // }
  					// &.btn4{
            //   bottom: 17px;
            // }
          }
  			}
  			.easy{
  				padding-bottom:10px;
  			}
      }
		}
		.big,.list{
			.easy{
				border-bottom:1px solid #e5e5e5;
			}
		}
		.goodsBox{
			&.card{
				border:1px solid #e5e5e5;
			}
			.other{
        padding:0 12px;
				span{
          background-size:50px;
          background-repeat: no-repeat;
          background-image: url(~assets/micropage/images/goods_btn.png);
          position:absolute;
					&.btn1{
            width:32px;
            height:25px;
						bottom:10px;
						right:6px;
					}
					&.btn2{
            width:20px;
            height:20px;
            background-position-y:-25px;
						bottom:10px;
						right:8px;
					}
					&.btn3{
            width:40px;
            height:23px;
            background-position-y:-45px;
						bottom:7px;
						right:-5px;
					}
					&.btn4{
            width:37px;
            height:20px;
            background-position-y:-68px;
						bottom:11px;
						right:8px;
					}
				}
			}
		}
	}
</style>
