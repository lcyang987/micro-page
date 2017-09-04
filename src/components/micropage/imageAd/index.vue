<template>
	<div class="imageAd" style="display:block !important">
		<div v-if="/^(carousel)$/.test(result.attr.type)" :class="result.attr.carousel">
			<div class="imgBox carousel">
				<img v-if="!result.attr.list.length" :src="cpdcarousel" />
				<div v-else>
					<ul :style="{width:result.attr.list.length*320+'px'}">
		        <template v-for="item, i of result.attr.list">
						<li>
							<img :src="item.img" :class="{noImg:!item.img}" />
							<p v-show="!i && item.text" v-text="item.text"></p>
						</li>
    			  </template>
					</ul>
					<div class="pointer">
						<span v-for="item of result.attr.list"></span>
					</div>
				</div>
			</div>
		</div>
		<div v-if="/^(separate)$/.test(result.attr.type)" :class="result.attr.separate">
			<img v-if="!result.attr.list.length" :src="result.attr.separate === 'big' ? cpdSeparate : cpdSeparateSmall" />
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
// import {mapActions} from 'vuex'
export default {
  name: 'imageAd',
  props: ['result'],
  computed: {
    cpdcarousel () {
      var img = ''
      if (this.result.attr.list.length && this.result.attr.list[0].img) {
        img = this.result.attr.list[0].img
      } else {
        img = require('assets/micropage/images/carousel.jpg')
      }
      return img
    },
    cpdSeparate () {
      var img = ''
      if (!this.result.attr.list.length || !this.result.attr.list[0].img) { img = require('assets/micropage/images/separate.jpg') }
      return img
    },
    cpdSeparateSmall () {
      var img = ''
      if (!this.result.attr.list.length || !this.result.attr.list[0].img) { img = require('assets/micropage/images/separate-small.jpg') }
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
			// margin:0 .04rem;
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
	}
}
</style>
<style lang="less" scoped>
.imageAd{
	min-height:50px;
	.carousel{
		ul{
			li{
				// position:relative;
				float:left;
        list-style:none;
			}
		}
		.pointer{
		  padding: 5px 10px;
      bottom: 2px;
			width:100%;
			margin:0;
	    position: absolute;
      text-align:center;
			span{
				width:5px;
				height:5px;
				margin:0 3px;
				display:inline-block;
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

<style lang="less" scope>
.imageAd{
	.big{
		.imgBox{
			// margin:0 4px;
		}
	}
	.small{
		img{
			height:160px;
		}
	}
	.imgBox{
		p{
		  padding: 5px 10px;
		}
	}
	.carousel{
		img{
			width:100%;
      float:left;
		}
		ul{
			min-height:100px;
			li{
				width:320px;
				.noImg{
					height:100px;
				}
			}
		}
	}
}
</style>
