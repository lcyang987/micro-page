<template>
	<div ref="items" class="picNavSidebar list" v-if="result" >
		<section class="item" v-for="(item,i) of result.attr.list" @mousedown="mousedown(i)">
			<div>
				<img draggable="false" width="120" height="120" :src="item.img.replace(/\/w\/\d+\/h\/\d+$/, '') + '/w/160/h/160'" :alt="item.img?'':'尺寸:160x160'" />
				<mu-raised-button v-imgValidator="i !== 0 ? {} : {
          'require':result.require.list.img,
          'value':item.img
        }" @click="click(i)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
			</div>
			<div>
        <mu-text-field ref="list" :errorText="item.errorText" @textOverflow="item.errorText = item.text.length > result.validator.list.text.max ? '超过啦' : ''" v-model="item.text" :maxLength="result.validator.list.text.max" label="导航名称" labelFloat v-inputValidator="i !== 0 ? {} : {
          'require':result.require.list.text,
          'value':item.text,
          'validator':result.validator.list.text
        }" style="width:100%"/>
        <mu-raised-button draggable="false" v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :title="item.link.text" :href="item.link.url" target="_blank" primary />
        <popoverComponent v-linkValidator="i !== 0 ? {} : {
          'require':result.require.list.link,
          'value':item.link
        }" :width="'100%'" :link="item.link" :destination="{
          name: 'list',
          num: i,
          attr: 'link'
        }"></popoverComponent>
			</div>
		</section>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'picNavSidebar',
  props: ['result', 'active'],
  computed: mapGetters([
    'dialog'
  ]),
  methods: {
    ...mapActions([
      'dragDrop',
      'initSearchForm'
    ]),
    click (i) {
      this.initSearchForm({
        url: 'picture/pictureList.json',
        type: 'pic',
        // picSize: '/w/160/h/160',
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
    }
  },
  mounted () {
    for (var i = 0; i < this.$refs.list.length; i++) {
      this.$refs.list[i].charLength = this.result.attr.list[i].text.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.list{
		position:relative;
    width:315px;
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
	}
</style>
