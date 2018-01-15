<template>
	<div class="imageAdSidebar" v-if="result" >
		<div class="demo-tip-setting">
			<p>
				显示方式：
				<mu-radio label="轮播" nativeValue="carousel" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="分开" nativeValue="separate" v-model="result.attr.type" class="demo-radio"/>
			</p>
		</div>
		<div class="demo-tip-setting" v-show="/^(separate)$/.test(result.attr.type)">
			<p>
				显示大小：
				<mu-radio label="大图" nativeValue="big" v-model="result.attr.separate" class="demo-radio"/>
				<mu-radio label="小图" nativeValue="small" v-model="result.attr.separate" class="demo-radio"/>
			</p>
		</div>
		<div ref="items" class="list">
			<section class="item" v-for="item,i of result.attr.list" v-if="result.attr.list.length" @mousedown="mousedown(i)">
				<div>
					<img draggable="false" width="120" height="120" :src="item.img.replace(/\/w\/\d+\/h\/\d+$/, '') + '/w/640/h/640'" :alt="item.img? '' : result.attr.type === 'separate' && result.attr.separate === 'small' ? '尺寸:320x320' : '尺寸:640x640'" />
					<mu-raised-button v-imgValidator="{'require':result.require.list.img,'value':item.img}" @click="click(i)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
				</div>
				<div>
          <mu-text-field ref="list" :errorText="item.errorText" @textOverflow="item.errorText = item.text.length>result.validator.list.text.max ? '超过啦' : ''" v-model="item.text" :maxLength="result.validator.list.text.max" label="导航名称" labelFloat v-inputValidator="{
            'require':result.require.list.text,
            'value':item.text,
            'validator':result.validator.list.text
          }" style="width:100%"/>
          <mu-raised-button draggable="false" v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :title="item.link.text" :href="item.link.url" target="_blank" primary />
          <popoverComponent v-linkValidator="{'require':result.require.list.link,'value':item.link}" :width="item.link.id && !result.require.list.link ? '' : '100%'" :style="[{float: item.link.id && !result.require.list.link ? 'left' : ''},{width: item.link.id ? '97px' : ''}]" :link="item.link" :destination="{name: 'list', num: i, attr: 'link'}"></popoverComponent>
          <mu-raised-button draggable="false" v-if="item.link.id && !result.require.list.link" style="min-width:45px" @click="removeLink(i)" class="demo-raised-button" label="删除" secondary />
				</div>
				<mu-icon-button v-if="result.attr.list.length<10" class="insert" icon="add" v-on:click="insert(i)"/>
				<mu-icon-button class="remove" icon="close" v-on:click="remove(i)"/>
			</section>
		</div>
		<mu-raised-button fullWidth v-if="result.attr.list.length<10" class="demo-raised-button push" label="添加一个图片广告" icon="add" primary v-on:click="push"/>
	</div>
</template>
<script>
import _ from 'lodash'
import originData from 'assets/micropage/originData.js'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'imageAdSidebar',
  props: ['result', 'active'],
  components: {
    originData
  },
  computed: mapGetters([
    'dialog'
  ]),
  methods: {
    ...mapActions([
      'initSearchForm',
      'dragDrop'
    ]),
    click (i) {
      this.initSearchForm({
        url: 'picture/pictureList.json',
        type: 'pic',
        // picSize: '/w/640/h/640',
        count: 0,
        form: {
          // bussId: '7928d9adbaed48918c4b268a324ec99f',
          bussType: 'TEAM',
          groupId: '',
          pageSize: 20,
          currentPage: 1
        },
        destination: {
          name: 'list',
          num: i
        }
      })
    },
    mousedown (i) {
      this.dragDrop({
        oEvent: event,
        items: this.$refs.items,
        obj: this.$refs.items.children[i],
        data: this.result.attr.list,
        active: i
      })
    },
    insert (i) {
      this.result.attr.list.splice(i + 1, 0, _.cloneDeep(originData.imageAd.originData))
    },
    push () {
      this.result.attr.list.push(_.cloneDeep(originData.imageAd.originData))
    },
    remove (i) {
      this.result.attr.list.splice(i, 1)
    },
    removeLink (i) {
      for (var j in this.result.attr.list[i].link) {
        this.result.attr.list[i].link[j] = ''
      }
    }
  },
  mounted () {
    if (this.$refs.list) {
      for (var i = 0; i < this.$refs.list.length; i++) {
        this.$refs.list[i].charLength = this.result.attr.list[i].text.length
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .imageAdSidebar{
    width:315px;
  }
	.list{
		position:relative;
	}
	section{

		&:before{
			content:'';
			clear:both;
			display:block;
		}
		&:after{
			content:'';
			clear:both;
			display:block;
		}
		position:relative;
		>div{
			width:50%;
			float:left;
			margin-bottom:10px;
			img{
				vertical-align:bottom;
				text-align:center;
				line-height:120px;
			}
		}
		>div:nth-child(1){
			margin-top:2px;
		}
		.insert,.remove{
  		top: -5px;
			position:absolute;
		}
		.insert{
			right: 35px;
		}
		.remove{
			right: -10px;
		}
	}
</style>
