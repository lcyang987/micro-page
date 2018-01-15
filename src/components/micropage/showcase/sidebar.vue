<template>
	<div class="showcaseSidebar" v-if="result" >
		<div class="demo-tip-setting">
			<p>
        <mu-text-field ref="title" :errorText="result.validator.title.errorText" @textOverflow="result.validator.title.errorText = result.attr.title.length > result.validator.title.max ? '超过啦！' : ''" v-model="result.attr.title" :maxLength="result.validator.title.max" v-inputValidator="{
          'require':result.require.title,
          'value':result.attr.title,
          'validator':result.validator.title
        }" label="橱窗标题" fullWidth labelFloat/>
			</p>
			<p>
				显示方式：
				<mu-radio label="默认" nativeValue="prominent" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="3列" nativeValue="column" v-model="result.attr.type" class="demo-radio"/>
			</p>
			<p>
				图片间隙：
				<mu-radio label="保留" nativeValue="keep" v-model="result.attr.space" class="demo-radio"/>
				<mu-radio label="清除" nativeValue="clear" v-model="result.attr.space" class="demo-radio"/>
			</p>
			<p>
        <mu-text-field ref="contentTitle" :errorText="result.validator.contentTitle.errorText" @textOverflow="result.validator.contentTitle.errorText = result.attr.contentTitle.length > result.validator.contentTitle.max ? '超过啦！' : ''" v-model="result.attr.contentTitle" :maxLength="result.validator.contentTitle.max" v-inputValidator="{
          'require':result.require.contentTitle,
          'value':result.attr.contentTitle,
          'validator':result.validator.contentTitle
        }" label="内容标题" fullWidth labelFloat/>
			</p>
			<p>
          <mu-text-field ref="contentDescription" :errorText="result.validator.contentDescription.errorText" @textOverflow="result.validator.contentDescription.errorText = result.attr.contentDescription.length > result.validator.contentDescription.max ? '超过啦！' : ''" v-model="result.attr.contentDescription" :maxLength="result.validator.contentDescription.max" v-inputValidator="{
            'require':result.require.contentDescription,
            'value':result.attr.contentDescription,
            'validator':result.validator.contentDescription
          }" label="内容说明" :rows="2" fullWidth multiLine labelFloat/>
			</p>
		</div>
		<div ref="items" class="list">
			<section class="item" v-for="(item,i) of result.attr.list" @mousedown="mousedown(i)">
				<div>
					<img draggable="false" width="120" height="120" :src="item.img.replace(/\/w\/\d+\/h\/\d+$/, '') + '/w/450/h/450'" :alt="item.img?'': i === 0 ? result.attr.type === 'column' ? '尺寸:220x220' : '尺寸:450x450' : '尺寸:220x220'" />
					<mu-raised-button v-imgValidator="{'require':result.require.list.img,'value':item.img}" @click="click(i)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
				</div>
				<div>
					<mu-raised-button draggable="false" v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :title="item.link.text" :href="item.link.url" target="_blank" primary />
          <popoverComponent v-linkValidator="{'require':result.require.list.link,'value':item.link}" :width="'100%'" :link="item.link" :destination="{name: 'list', num: i, attr: 'link'}"></popoverComponent>
        </div>
			</section>
		</div>
	</div>
</template>
<script>
import _ from 'lodash'
import originData from 'assets/micropage/originData.js'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'showcaseSidebar',
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
      'micropageAjax',
      'dragDrop'
    ]),
    click (i) {
      this.initSearchForm({
        url: 'picture/pictureList.json',
        type: 'pic',
        // picSize: '/w/450/h/450',
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
      this.result.attr.list.splice(i + 1, 0, _.cloneDeep(originData.imageAd.attr.list[0]))
    },
    push () {
      this.result.attr.list.push(_.cloneDeep(originData.imageAd.attr.list[0]))
    },
    remove (i) {
      this.result.attr.list.splice(i, 1)
    }
  },
  mounted () {
    this.$refs.title.charLength = this.result.attr.title.length
    this.$refs.contentTitle.charLength = this.result.attr.contentTitle.length
    this.$refs.contentDescription.charLength = this.result.attr.contentDescription.length
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.list{
		position:relative;
    .item{
      width:258px;
    }
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
    		top: -10px;
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
