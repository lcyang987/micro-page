<template>
	<div class="titleSidebar" v-if="result" :class="">
		<div>
      <mu-text-field ref="title" :errorText="result.validator.title.errorText" @textOverflow="result.validator.title.errorText = result.attr.title.length > result.validator.title.max ? '超过啦！' : ''" v-model="result.attr.title" :maxLength="result.validator.title.max" v-inputValidator="{
        'require':result.require.title,
        'value':result.attr.title,
        'validator':result.validator.title
      }" label="标题名" fullWidth labelFloat/>
		</div>
		<div class="demo-tip-setting">
			<p>
				标题模版：
				<mu-radio label="传统" nativeValue="normal" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="微信图文" nativeValue="wechat" v-model="result.attr.type" class="demo-radio"/>
			</p>
		</div>
		<div v-if="/^(normal)$/.test(result.attr.type)">
			<div>
        <mu-text-field ref="normalSubtitle" :errorText="result.validator.normal.subtitle.errorText" @textOverflow="result.validator.normal.subtitle.errorText = result.attr.normal.subtitle.length > result.validator.normal.subtitle.max ? '超过啦！' : ''" v-model="result.attr.normal.subtitle" :maxLength="result.validator.normal.subtitle.max" v-inputValidator="{
          'require':result.require.normal.subtitle,
          'value':result.attr.normal.subtitle,
          'validator':result.validator.normal.subtitle
        }" label="副标题" fullWidth labelFloat style="width:65%"/>
				<mu-raised-button class="demo-raised-button" label="日期">
					<mu-date-picker autoOk v-on:change="subtitleChange" mode="landscape" class="subtitleDate"/>
				</mu-raised-button>
			</div>
			<div class="demo-tip-setting">
				<p>
					显示：
				</p>
				<p>
					<mu-radio label="居左" nativeValue="left" v-model="result.attr.normal.textAlign" class="demo-radio"/>
					<mu-radio label="居中" nativeValue="center" v-model="result.attr.normal.textAlign" class="demo-radio"/>
					<mu-radio label="居右" nativeValue="right" v-model="result.attr.normal.textAlign" class="demo-radio"/>
				</p>
			</div>
			<div class="demo-tip-setting">
				<p>
					背景颜色：
          <el-color-picker v-model="result.attr.normal.backgroundColor"></el-color-picker>
					文字颜色：
          <el-color-picker v-model="result.attr.normal.fontColor"></el-color-picker>
				</p>
			</div>
			<mu-raised-button fullWidth v-if="!result.attr.normal.textNav.isShow" class="demo-raised-button push" label="添加一个文本导航" icon="add" primary v-on:click="show"/>
			<div v-if="result.attr.normal.textNav.isShow" class="textNav">
				<div>
          <mu-text-field ref="normalTextNavText" :errorText="result.validator.normal.textNav.text.errorText" @textOverflow="result.validator.normal.textNav.text.errorText = result.attr.normal.textNav.text.length > result.validator.normal.textNav.text.max ? '超过啦！' : ''" v-model="result.attr.normal.textNav.text" :maxLength="result.validator.normal.textNav.text.max" v-inputValidator="{
            'require':result.require.normal.textNav.text,
            'value':result.attr.normal.textNav.text,
            'validator':result.validator.normal.textNav.text
          }" label="导航名称" fullWidth labelFloat/>
				</div>
				<mu-raised-button v-if="result.attr.normal.textNav.link.id" style="width:59%;float:left" class="demo-raised-button" :label="result.attr.normal.textNav.link.text" :title="result.attr.normal.textNav.link.text" :href="result.attr.normal.textNav.link.url" target="_blank" primary />
				<popoverComponent v-linkValidator="{'require':result.require.normal.textNav.link,'value':result.attr.normal.textNav.link}" v-if="result.attr.normal.textNav.link" :width="result.attr.normal.textNav.link.id?'31%':'100%'" :link="result.attr.normal.textNav.link" :destination="{name: 'normal.textNav.link'}"></popoverComponent>
  				<mu-icon-button tooltipPosition="top-center" tooltip="关闭" class="hide" icon="close" v-on:click="hide"/>
			</div>
		</div>
		<div v-if="/^(wechat)$/.test(result.attr.type)">
			<div class="demo-tip-setting">
				<p>
					<mu-date-picker labelFloat label="日期" v-model="result.attr.wechat.date" autoOk v-on:change="wechatDateChange" mode="landscape" hintText="日期"/>
				</p>
			</div>
			<div>
        <mu-text-field ref="wechatAuthor" :errorText="result.validator.wechat.author.errorText" @textOverflow="result.validator.wechat.author.errorText = result.attr.wechat.author.length > result.validator.wechat.author.max ? '超过啦！' : ''" v-model="result.attr.wechat.author" :maxLength="result.validator.wechat.author.max" v-inputValidator="{
          'require':result.require.wechat.author,
          'value':result.attr.wechat.author,
          'validator':result.validator.wechat.author
        }" label="作者" fullWidth labelFloat/>
			</div>
			<div>
        <mu-text-field ref="wechatTextNavText" :errorText="result.validator.wechat.textNav.text.errorText" @textOverflow="result.validator.wechat.textNav.text.errorText = result.attr.wechat.textNav.text.length > result.validator.wechat.textNav.text.max ? '超过啦！' : ''" v-model="result.attr.wechat.textNav.text" :maxLength="result.validator.wechat.textNav.text.max" v-inputValidator="{
          'require':result.require.wechat.textNav.text,
          'value':result.attr.wechat.textNav.text,
          'validator':result.validator.wechat.textNav.text
        }" label="链接标题" fullWidth labelFloat/>
			</div>
      <!-- 后端并未有此功能，暂时不需要 -->
			<!-- <div class="demo-tip-setting">
				<p>
					链接地址：
				</p>
				<p>
					<mu-radio label="引导关注" nativeValue="focusOn" v-model="result.attr.wechat.type" class="demo-radio"/>
					<mu-radio label="其他链接" nativeValue="other" v-model="result.attr.wechat.type" class="demo-radio"/>
				</p>
			</div> -->
			<div v-if="/^(other)$/.test(result.attr.wechat.type)" class="textNav">
				<mu-raised-button v-if="result.attr.wechat.textNav.link.id" style="width:65%;float:left" class="demo-raised-button" :label="result.attr.wechat.textNav.link.text" :title="result.attr.wechat.textNav.link.text" :href="result.attr.wechat.textNav.link.url" target="_blank" primary />
        <popoverComponent v-linkValidator="{'require':result.require.wechat.textNav.link,'value':result.attr.wechat.textNav.link}" v-if="result.attr.wechat.textNav.link" :width="result.attr.wechat.textNav.link.id?'31%':'100%'" :link="result.attr.wechat.textNav.link" :destination="{name: 'wechat.textNav.link'}"></popoverComponent>
      </div>
		</div>
	</div>
</template>
<script>
import originData from 'assets/micropage/originData.js'
export default {
  name: 'titleSidebar',
  props: ['result', 'active'],
  components: {
    originData
  },
  methods: {
    subtitleChange (value) {
      this.result.attr.normal.subtitle = value
    },
    wechatDateChange (value) {
      this.result.attr.wechat.date = value
    },
    show () {
      this.result.attr.normal.textNav.isShow = true
    },
    hide () {
      this.result.attr.normal.textNav.isShow = false
    }
  },
  mounted () {
    if (this.$refs.title) {
      this.$refs.title.charLength = this.result.attr.title.length
    }
    if (this.$refs.normalSubtitle) {
      this.$refs.normalSubtitle.charLength = this.result.attr.normal.subtitle.length
    }
    if (this.$refs.normalTextNavText) {
      this.$refs.normalTextNavText.charLength = this.result.attr.normal.textNav.text.length
    }
    if (this.$refs.wechatAuthor) {
      this.$refs.wechatAuthor.charLength = this.result.attr.wechat.author.length
    }
    if (this.$refs.wechatTextNavText) {
      this.$refs.wechatTextNavText.charLength = this.result.attr.wechat.textNav.text.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.titleSidebar{
	em{
		color:red
	}
	.time{
		position:relative;
		display:inline-block;
		padding-right:8px;
		&:hover{
			input{
				display:block;
			}
		}
		input{
			display:none;
			position:absolute;
			top:-3px;
			left:34px;
			&:hover{
				input{
					display:block;
				}
			}
		}
	}
	.linkBlock{
	    width: 214px;
	    display: inline-block;
	    vertical-align: top;
	}
	span{
		display:inline-block;
		width:70px;
		text-align:right;
	}
	.textNav{
		position:relative;
	}
	button.hide{
		position:absolute;
		top:-10px;
		right:-10px;
	}
	.subtitleDate{
	    top: 0;
	    left: 0;
	    position: absolute;
	    opacity: 0;
	   	input{
	    	cursor: pointer !important;
	    }
	}
}
</style>
