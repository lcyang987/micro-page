<template>
  <div>
    <div class="modal" v-loading.fullscreen.lock="index.fullLoading"></div>
    <div class="fixedMicropage" @click="modalClose">
      <div class="design" @click.stop>
    		<section ref="item" class="dataList">
          <div v-if="!index.isLoad" style="text-align:center;padding:30px 0px">
            <mu-circular-progress :size="120" :strokeWidth="5"/>
          </div>
    			<template v-for="(item,i) in index.data" v-if="index.state">
    				<div class="item" :index="i" @mousedown="indexDragDrop({
                _this:_self
            })" @mouseenter="mouseenter(item,i)" @mouseleave="mouseleave" :class="{active:i===index.current}" :active="index.active===i">
    					<component :is="item.type+'Component'" :result="item"></component>
    				</div>
    			</template>
    		</section>
    		<regionComponent></regionComponent>
    		<mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="index.topPopup">{{index.topPopupText}}</mu-popup>
    		<dialogComponent v-if="dialog.state"></dialogComponent>
      </div>
  		<sidebarComponent @click.stop.native v-if="index.active !== null" ref="sidebar" :result="index.data[index.active]" :active="index.active"></sidebarComponent>
      <div class="operations" @click.stop @mouseenter="templateShow" @mouseleave="templateLeave">
    		<div class="template" ref="template">
  		    <!-- <mu-text-field v-model="result.attr.content" v-inputValidator="{'require':result.require.content,'value':result.attr.content,'validator':result.validator.content}" labelFloat :errorText="errorTxt" @textOverflow="testOverflow" label="公告" fullWidth multiLine :rows="3" :rowsMax="6" :maxLength="parseInt(result.validator.content.max)"/> -->
          <mu-text-field ref="templateName" label="模板名称" @blur="blur" :errorText="nameErrorTxt" @textOverflow="testNameOverflow" :maxLength="20" labelFloat v-model="index.name" :disabled="!index.isLoad"/>
          <mu-text-field ref="templateIntroduction" label="模板描述" @blur="blur" :errorText="introductionErrorTxt" @textOverflow="testIntroductionOverflow" :maxLength="40" labelFloat v-model="index.introduction" :disabled="!index.isLoad"/>
        </div>
        <div style="display:flex;position:relative;z-index:99">
          <mu-raised-button @click="publishClick" label="发布" style="flex-grow:1" secondary :disabled="!index.isLoad || index.validateTime"></mu-raised-button>
          <mu-raised-button @click="draftClick" label="草稿" style="flex-grow:1" primary :disabled="!index.isLoad || index.validateTime" v-if="index.isDraft !== 'n'"></mu-raised-button>
          <mu-raised-button :label="index.editTime? index.oneClick? '确认不保存' :'不保存关闭' : '关闭'" @click="closeClick" style="flex-grow:1"/></mu-raised-button>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import sidebarComponent from './sidebar'
import regionComponent from './region'
import lineComponent from './line'
import whiteComponent from './white'
import noticeComponent from './notice'
import searchComponent from './search'
import titleComponent from './title'
import textNavComponent from './textNav'
import picNavComponent from './picNav'
import imageAdComponent from './imageAd'
import showcaseComponent from './showcase'
import goodsComponent from './goods'
import groupBuyComponent from './groupBuy'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      isFocus: false,
      nameErrorTxt: '',
      introductionErrorTxt: ''
    }
  },
  computed: {
    ...mapGetters([
      'index',
      'region',
      'sidebar',
      'dialog'
    ])
  },
  components: {
    sidebarComponent,
    regionComponent,
    lineComponent,
    whiteComponent,
    noticeComponent,
    searchComponent,
    titleComponent,
    textNavComponent,
    picNavComponent,
    imageAdComponent,
    showcaseComponent,
    goodsComponent,
    groupBuyComponent
  },
  methods: {
    ...mapActions([
      'setIndexData',
      'clearIndexData',
      'validateData',
      'indexDragDrop',
      'changeStatus'
    ]),
    testNameOverflow (isOverflow) {
      this.nameErrorTxt = isOverflow ? '超过啦！' : ''
    },
    testIntroductionOverflow (isOverflow) {
      this.introductionErrorTxt = isOverflow ? '超过啦！' : ''
    },
    templateLeave () {
      this.isFocus = false
      if (document.activeElement === this.$refs.templateName.$el.querySelector('input') || document.activeElement === this.$refs.templateIntroduction.$el.querySelector('input')) {
      } else {
        this.templateHide()
      }
    },
    blur () {
      if (!this.isFocus) {
        this.templateHide()
      }
    },
    templateHide () {
      this.index.nameTimer = setTimeout(() => {
        this.$refs.template.style.marginBottom = -155 + 'px'
      }, 200)
    },
    templateShow () {
      this.isFocus = true
      clearTimeout(this.index.nameTimer)
      this.$refs.template.style.marginBottom = 0
    },
    publishClick () {
      this.validateData({
        obj: this,
        url: 'micropage/saveAndUpPage.json'
      })
    },
    draftClick () {
      this.validateData({
        obj: this,
        url: 'micropage/savePageDraft.json'
      })
    },
    mouseenter (item, i) {
      if (!this.index.isMove) { this.index.current = i }
    },
    mouseleave (item, i) {
      if (!this.index.isMove) { this.index.current = null }
    },
    modalClose () {
      if (!this.index.dontClose) { this.close() }
    },
    closeClick () {
      if (!this.index.editTime) {
        this.close()
      }
      if (this.index.oneClick) {
        this.close()
      }
      this.index.oneClick = true
      setTimeout(() => {
        this.index.oneClick = false
      }, 2000)
    },
    close () {
      this.$router.history.go(-1)
      this.index.topPopup = false
    }
  },
  destroyed () {
    this.clearIndexData()
  },
  created () {
    this.setIndexData({
      obj: this,
      form: this.$route.query,
      url: 'micropage/queryPageConfigByPageNo.json'
    })
  },
  mounted () {
    const modal = document.querySelector('.modal')
    const fixedMicropage = document.querySelector('.fixedMicropage')
    const centerBox = document.querySelector('.centerBox')
    const operations = document.querySelector('.operations')
    modal.style.width = centerBox.offsetWidth + 'px'
    modal.style.top = fixedMicropage.style.top = centerBox.offsetTop + 'px'
    modal.style.left = fixedMicropage.style.left = centerBox.offsetLeft + 'px'
    modal.style.height = fixedMicropage.style.height = 'calc(100% - ' + centerBox.offsetTop + 'px)'
    // operations.style.left = 'calc(40% - 22px)'
    operations.style.left = 'calc(40% - 37px)'
  },
  watch: {
    'index.data': {
      handler: function (val, oldVal) {
        if (!this.index.name) {
          this.index.toolTipTimer = true
        }
        if (this.index.toolTipTimer) {
          this.changeStatus()
        } else {
          this.index.toolTipTimer = true
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.design{
    user-select: none;
		position: absolute;
    background: white;
		box-shadow: 0 0 0 1px #c5c5c5;
		width:320px !important;
		left: calc(~'40% - 160px') !important;
    margin-bottom: 60px;
		&:before{
			content: '';
			display: block;
			width: 320px;
			height: 64px;
			background: url(~assets/micropage/images/titlebar.png);
      position: fixed;
      z-index: 20;
		}
	}
  .modal{
    width: 100%;
    background: black;
    opacity: 0.4;
    position: fixed;
    z-index: 10;
  }
  .fixedMicropage{
    position: fixed;
    z-index: 11;
    width: 100%;
    overflow-y: scroll;
  }
  .modal-close{
    position: fixed;
    margin-top: 20px;
    font-size: 50px;
    z-index: 12;
  }
  .operations{
    width:320px;
    display: flex;
    flex-direction: column;
    bottom: 0px;
    position: fixed;
    z-index: 99;
  }
  .template{
    transition:ease 0.3s;
    margin-bottom: -155px;
    text-align: center;
    padding-top: 10px;
    background: white;
    border: 2px solid #c5c5c5;
    border-radius: 15px 15px 0 0;
  }
</style>
<style lang="less">
	.design{
		.dataList{
      margin-top:64px;
	    padding-bottom: 11px;
	    min-height: 200px;
			box-shadow:0 1px 0 1px #c5c5c5;
			position:relative;
      background-color: #f0f0f0;
			&:before{
				content:'';
				border:8px solid transparent;
				border-bottom-color:#c5c5c5;
				position:absolute;
				bottom:0;
				left:calc(~'50% - 8px');
			}
			&:after{
				content:'';
				border:6px solid transparent;
				border-bottom-color:white;
				position:absolute;
				bottom:-2px;
				left:calc(~'50% - 6px');
			}
		}
		section{
			width:100%;
		}
		.item{
			width:100%;
			position:relative;
			// background:white;
      overflow:hidden;
		}
		.active{
			.actions{
				display:block;
			}
			.hover{
				display:block;
			}
			.modal{
				width:100%;
				height:100%;
				background:gray;
				opacity:0.1;
		    position: absolute;
		    z-index:16;
		    left: 0;
		    top: 0;
			}
		}
	}
</style>
<style lang="css">
.demo-popup-top {
  background:#03a9f4 !important;
  color:white !important;
  width: 100%;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
.mu-raised-button-label{
  text-transform: none;
}
ul, li{
  margin:0;
  padding:0;
}
</style>
