<template>
	<div class="titleSidebar" v-if="result" :class="">
		<div>
			<label for="title">
				
				<span><em>*</em>标题名：</span>
				<input type="text" id="title" v-model="result.attr.title">
			</label>
		</div>
		<div>
			<span>标题模版：</span>
			<label for="normal">
				<input type="radio" id="normal" value="normal" v-model="result.attr.type">
				传统样式
			</label>
			<label for="wechat">
				<input type="radio" id="wechat" value="wechat" v-model="result.attr.type">
				微信图文页样式
			</label>
		</div>
		<div v-show="result.attr.type=='normal'">
			<div>
				<span>副标题：</span>
				<input type="text" v-model="result.attr.normal.subtitle">
				<a class="time">
				日期
					<input v-on:change="subtitleChange" type="datetime-local" />
				</a>
			</div>
			<div>
				<span>显示：</span>
				<label for="left">
					<input type="radio" id="left" value="left" v-model="result.attr.normal.textAlign">
					居左
				</label>
				<label for="center">
					<input type="radio" id="center" value="center" v-model="result.attr.normal.textAlign">
					居中
				</label>
				<label for="right">
					<input type="radio" id="right" value="right" v-model="result.attr.normal.textAlign">
					居右
				</label>
			</div>
			<div>
				<span>背景颜色： </span>
				<input type="color" v-model="result.attr.normal.backgroundColor">
			</div>
			<button class="hide" v-show="!result.attr.normal.textNav.isShow" v-on:click="show">添加一个文本导航</button>
			<div v-show="result.attr.normal.textNav.isShow" class="textNav">
				<div>导航名称：<input type="text" v-model="result.attr.normal.textNav.text"  /></div>
				<div>链接到：
					<!--<input type="text" v-model="result.attr.normal.textNav.link.id"  />-->
					<dialogComponent></dialogComponent>
				</div>
				<button class="remove" v-on:click="hide">×</button>
			</div>
		</div>
		<div v-show="result.attr.type=='wechat'">
			<div>
				<span>日期： </span>
				<input v-on:change="dateChange" type="date" />
			</div>
			<div>
				<span>作者： </span>
				<input type="text" v-model="result.attr.wechat.author">
			</div>
			<div>
				<span>链接标题： </span>
				<input type="text" v-model="result.attr.wechat.link.title">
			</div>
			<div>
				<span>链接地址： </span>
				<div class="linkBlock">
					<label for="focusOn">
						<input type="radio" id="focusOn" value="focusOn" v-model="result.attr.wechat.type">
						引导关注
					</label>
					<br>
					<label for="other">
						<input type="radio" id="other" value="other" v-model="result.attr.wechat.type">
						其他链接
					</label>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import originData from 'assets/originData.js';
import dialogComponent from 'components/dialog';
export default {
  	name: 'titleSidebar',
	props: ["result","active"],
	components:{
		originData,
		dialogComponent
	},
	methods:{
		subtitleChange(ev){
			this.result.attr.normal.subtitle=ev.target.value.replace('T',' ');
		},
		dateChange(ev){
			this.result.attr.wechat.date=ev.target.value.replace('T',' ');
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
	.remove{
	    position: absolute;
	    top: 0;
	    right: -14px;
	    background: gray;
	    color: white;
	    border-radius: 50%;
	    padding: 5px;
	    width: 12px;
	    height: 12px;
	    line-height: 12px;
	    border: none;
	}
}
button.hide{
	width:100%;
	height:45px;
	text-indent:35px;
	padding:0;
	text-align:left;
	border: 1px solid #e5e5e5;
	background:white;
	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdEQjk5OEE2RkRERDExRTM4RDY0OTI0RDg2RjJCOEE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdEQjk5OEE3RkRERDExRTM4RDY0OTI0RDg2RjJCOEE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0RCNzIwN0ZGREREMTFFMzhENjQ5MjREODZGMkI4QTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0RCNzIwODBGREREMTFFMzhENjQ5MjREODZGMkI4QTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6AJc34AAAA4ElEQVR42mJ02c2ADESAuAiIfYBYDSp2A4g3AfEkIH4DU8iCpCkYiOcCMT8DKtCH4nwgTgLitSBBJiRNq7FoQgZ8UDXBMI2iQDwPiBmRVe12+Q/GaIARqlYMpDEXahqxAKS2AKTRj4F04AMKHA1k56EDZDHXPXDfqDMxkAd+sUDjSR/NRLhNyGJI4B4TNHJJBVtBGqcA8ScSNIHUTgA59RUoRTAyMK75z4A1IJDBf2jqeQULnLVATaFA+jMem0ByoehJDgTWALESELcD8RUg/g3EX4H4PBC3QOXWwhQDBBgAUkU1FNOZJvUAAAAASUVORK5CYII=);
	background-repeat:no-repeat;
	background-position:10px center;
	&:focus{
		outline:none;
	}
	&:active{
		background-color:#eee;
	}
}
</style>