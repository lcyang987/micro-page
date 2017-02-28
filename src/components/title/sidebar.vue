<template>
	<div class="titleSidebar" v-if="result" :class="">
		<div>
			<mu-text-field hintText="" labelFloat label="标题名" fullWidth v-model="result.attr.title"/>
		</div>
		<div class="demo-tip-setting">
			<p>
				标题模版：
				<mu-radio label="传统" nativeValue="normal" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="微信图文" nativeValue="wechat" v-model="result.attr.type" class="demo-radio"/>
			</p>
		</div>
		<div v-show="result.attr.type=='normal'">
			<div>
				<mu-text-field hintText="" labelFloat label="副标题" fullWidth v-model="result.attr.normal.subtitle"/>
				<mu-date-picker autoOk v-on:change="subtitleChange" mode="landscape" hintText="日期"/>
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
					<input type="color" style="width:210px;height:24px;" v-model="result.attr.normal.backgroundColor">
				</p>				
			</div>
			<mu-raised-button fullWidth v-if="!result.attr.normal.textNav.isShow" class="demo-raised-button push" label="添加一个文本导航" icon="add" primary v-on:click="show"/>
			<div v-if="result.attr.normal.textNav.isShow" class="textNav">
				<div>
					<mu-text-field fullWidth hintText="导航名称" v-model="result.attr.normal.textNav.text"/>
				</div>
				<mu-raised-button v-if="result.attr.normal.textNav.link.id" style="width:59%;float:left" class="demo-raised-button" :label="result.attr.normal.textNav.link.text" :href="result.attr.normal.textNav.link.url" target="_blank" primary />
				<bottomSheetComponent v-if="result.attr.normal.textNav.link" :width="result.attr.normal.textNav.link.id?'31%':'100%'" :link="result.attr.normal.textNav.link"></bottomSheetComponent>
  				<mu-icon-button tooltipPosition="top-center" tooltip="关闭" class="hide" icon="close" v-on:click="hide"/>
			</div>
		</div>
		<div v-show="result.attr.type=='wechat'">
			<div class="demo-tip-setting">
				<p>
					<mu-date-picker labelFloat label="日期" v-model="result.attr.wechat.date" autoOk v-on:change="subtitleChange" mode="landscape" hintText="日期"/>
				</p>
			</div>
			<div>
				<mu-text-field hintText="" labelFloat label="作者" fullWidth v-model="result.attr.wechat.author"/>
			</div>
			<div>				
				<mu-text-field hintText="" labelFloat label="链接标题" fullWidth v-model="result.attr.wechat.textNav.text"/>
			</div>
			<div class="demo-tip-setting">
				<p>
					链接地址：
				</p>
				<p>
					<mu-radio label="引导关注" nativeValue="focusOn" v-model="result.attr.wechat.type" class="demo-radio"/>
					<mu-radio label="其他链接" nativeValue="other" v-model="result.attr.wechat.type" class="demo-radio"/>
				</p>
			</div>
			<div v-if="result.attr.wechat.type==='other'" class="textNav">
				<mu-raised-button v-if="result.attr.wechat.textNav.link.id" style="width:69%;float:left" class="demo-raised-button" :label="result.attr.wechat.textNav.link.text" :href="result.attr.wechat.textNav.link.url" target="_blank" primary />
				<bottomSheetComponent v-if="result.attr.wechat.textNav.link" :width="result.attr.wechat.textNav.link.id?'31%':'100%'" :link="result.attr.wechat.textNav.link"></bottomSheetComponent>
			</div>
		</div>
	</div>
</template>
<script>
import originData from 'assets/originData.js';
export default {
  	name: 'titleSidebar',
	props: ["result","active"],
	components:{
		originData
	},
	methods:{
		subtitleChange(value){
			this.result.attr.normal.subtitle=value;
		},
		show(){
			this.result.attr.normal.textNav.isShow=true;
		},
		hide(){
			this.result.attr.normal.textNav.isShow=false;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
</style>