<template>
	<div class="groupBuy" v-if="result.attr.list" :class="{noTopWhite: !result.attr.topWhite}">
		<div v-for="item, i of list" :class="result.attr.type" v-if="item instanceof Object === false || item.img">
			<div class="groupBuyBox">
				<div class="imgBox">
					<img v-if="list instanceof Array" :src="item.img + '/w/640/h/640'"/>
          <img v-else :src="require('assets/micropage/images/p'+(i+1)+'.jpg')" />
          <div v-if="result.attr.type !== 'big'" class="activity">
            <span v-text="item.groupPeople ? item.groupPeople + '人团': '9人团'"></span>
          </div>
				</div>
        <div v-if="result.attr.type === 'big'" class="remainTime">
          <span v-text="item.groupPeople ? item.groupPeople + '人团': '9人团'"></span>
          <div class="detail">
            <div>距结束仅剩：</div>
            <ul>
              <li class="m-num" v-text="item.remainTime ? Math.floor(item.remainTime/60/60/24) < 10 ? '0' + Math.floor(item.remainTime/60/60/24) : Math.floor(item.remainTime/60/60/24) : '01'"></li>
              <li class="m-str">天</li>
              <li class="m-num" v-text="item.remainTime ? Math.floor(item.remainTime/60/60)%24 < 10 ? '0' + Math.floor(item.remainTime/60/60)%24 : Math.floor(item.remainTime/60/60)%24 : '05'"></li>
              <li class="m-str">时</li>
              <li class="m-num" v-text="item.remainTime ? Math.floor(item.remainTime/60)%60 < 10 ? '0' + Math.floor(item.remainTime/60)%60 : Math.floor(item.remainTime/60)%60 : '12'"></li>
              <li class="m-str">分</li>
              <li class="m-num" v-text="item.remainTime ? item.remainTime%60 < 10 ? '0' + item.remainTime%60 : item.remainTime%60 : '24'"></li>
              <li class="m-str">秒</li>
            </ul>
          </div>
        </div>
				<div class="other">
          <div class="textBox">
            <div v-if="result.attr.type !== 'list'" class="bought" v-text="item.bought >= 0 ? item.bought > 9999 ? '已团' + (item.bought / 10000).toFixed(1) + '万件' : '已团' + (item.bought || 0) + '件' : '已团9999件'"></div>
					  <h4 v-text="item.text || '此处显示商品名称'"></h4>
            <div v-if="result.attr.type === 'list'" class="bought" v-text="item.bought >= 0 ? item.bought > 9999 ? '已团' + (item.bought / 10000).toFixed(1) + '万件' : '已团' + (item.bought || 0) + '件' : '已团9999件'"></div>
          </div>
          <div class="box">
            <div class="price">
              <b class="currency">￥</b><b class="int" v-text="item.price ? ('' + item.price).split('.')[0] : '88'"></b><b class="decimal" v-text="item.price ? ('' + item.price).split('.')[1] ? '.' + ('' + item.price).split('.')[1] : '' : '.00'"></b>
            </div>
            <del v-text="item.originalPrice ? '￥' + item.originalPrice : '￥99.00'"></del>
            <div v-if="result.attr.type !== 'small'" class="m-btn">
              <span>去开团</span>
            </div>
          </div>
				</div>
			</div>
		</div>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  name: 'groupBuy',
  props: ['result'],
  computed: {
    list () {
      if (this.result.attr.list.length && this.result.attr.list[0].img) {
        return this.result.attr.list
      } else {
        if (this.result.attr.type === 'small') {
          return 4
        } else if (this.result.attr.type === 'list') {
          return 3
        } else {
          return 1
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
  @red: #e13636;
	.design .groupBuy{
    overflow:hidden;
    padding:2px;
    &.noTopWhite{
      margin-top:-4px;
    }
		>div{
			padding:2px;
		}
		.groupBuyBox{
      border: 1px solid #e5e5e5;
      background-color:white;
      .bought{
        font-size: 12px;
        color: @red;
        background-color: #ffd9da;
        border-radius: 20px;
        padding: 2px 6px;
      }
      .remainTime{
        background-color: @red;
        height: 40px;
        padding: 4px 0;
        &>*{
          height: 16px;
          line-height: 16px;
          float:left;
          color: white;
        }
        span{
          line-height: 32px;
          margin-left: 5%;
          width: 25%;
          display: inline-block;
          font-size: 20px;
        }
        .detail{
          width: 70%;
          display:inline-block;
          text-align:center;
          >*{
            font-size: 12px;
          }
          ul{
            display: inline-block;
            li{
              float: left;
              list-style: none;
            }
            .m-num{
              background-color: #333;
              padding: 0 2px;
              margin: 0 5px;
              border-radius: 2px;
            }
          }
        }
      }
      .imgBox{
        position:relative;
        img{
          width:100%;
        }
        .activity{
          position:absolute;
          line-height: 24px;
          white-space: nowrap;
          top: 2px;
          left: 2px;
          color: white;
          opacity: 0.9;
          padding: 1px;
          border: 1px solid #ef4d4a;
          border-radius: 50%;
          transform: rotateZ(-30deg);
          span{
            font-size: 12px;
            background-color: #ef4d4a;
            display:block;
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align:center;
            position: relative;
            border-radius: 50%;
            z-index: 1;
          }
        }
      }
			.other{
        padding: 0 8px;
        .textBox{
          overflow: hidden;
        }
				h4{
          font-size:12px;
          line-height:22px;
          font-weight:normal;
          margin: 4px 0;
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
        .box{
          position: relative;
          line-height:30px;
          padding-bottom: 4px;
          margin:0 auto;
          del{
            font-size:12px;
            color:#999;
          }
          .m-btn{
            display: inline-block;
            float: right;
            text-align:center;
            span{
              display: inline-block;
              background: @red;
              color:white;
              height: 28px;
              line-height: 28px;
              border-radius: 15px;
              padding: 0 16px;
            }
          }
        }
			}
		}
    .small{
      width: 50%;
      display: inline-block;
      float: left;
      img{
        width: 145px;
        height: 145px;
      }
      del{
        float:right;
      }
      .other{
        .textBox{
          height: 44px;
          margin-top: 4px;
        }
      }
    }
    .big{
      .textBox{
        margin: 6px 0;
        height: 22px;
      }
      .price{
        b{
          font-size:12px !important;
        }
        .int{
          font-size:26px !important;
        }
      }
      img{
        height: 300px;
      }
    }
		.list{
      .groupBuyBox{
        overflow:hidden;
  			.imgBox{
  				width:120px;
          float:left;
          img{
            width: 120px;
            height: 120px;
          }
  			}
        .other{
          width:calc(~'100% - 120px');
          float:left;
          height: 120px;
          .textBox{
            height: 88px;
            h4{
              max-height: 60px;
              line-height: 20px;
              overflow: hidden;
            }
            .bought{
              display:inline;
            }
          }
          .box{
            .m-btn{
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
    .big, .small{
      .textBox>*{
        display:inline;
      }
    }
	}
</style>
