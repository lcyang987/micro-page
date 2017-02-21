<template>
	<div class="titleSidebar" v-if="result" :class="">
		<div>
			<label for="title"> <em>*</em>标题名：
				<input type="text" id="title" v-model="result.attr.title">
			</label>
		</div>
		<div>
			标题模版：
			<label for="normal">
				<input type="radio" id="normal" value="normal" v-model="result.attr.type" v-on:click="setHeight">
				传统样式
			</label>
			<label for="wechat">
				<input type="radio" id="wechat" value="wechat" v-model="result.attr.type" v-on:click="setHeight">
				微信图文页样式
			</label>
		</div>
		<div v-show="result.attr.type=='normal'">
			<div>
				副标题：
				<input type="text" v-model="result.attr.normal.subtitle" v-on:keydown="setHeight">
				<a class="time">
					日期
					<input v-on:change="subtitleChange" type="datetime-local" />
				</a>
			</div>
			<div>
				显示:
				<label for="left">
					<input type="radio" id="left" value="left" v-model="result.attr.normal.textAlign">
					居左显示
				</label>
				<label for="center">
					<input type="radio" id="center" value="center" v-model="result.attr.normal.textAlign">
					居中显示
				</label>
				<label for="right">
					<input type="radio" id="right" value="right" v-model="result.attr.normal.textAlign">
					居右显示
				</label>
			</div>
			<div>
				背景颜色： 
				<input type="color" v-model="result.attr.normal.backgroundColor">
			</div>
		</div>
		<div v-show="result.attr.type=='wechat'">
			<div>
				日期：
				<!--<input type="text" v-model="result.attr.wechat.date" v-on:keydown="setHeight">-->
				<input v-on:change="dateChange" type="date" />
			</div>
			<div>
				作者：
				<input type="text" v-model="result.attr.wechat.author" v-on:keydown="setHeight">
			</div>
			<div>
				链接标题：
				<input type="text" v-model="result.attr.wechat.link.title" v-on:keydown="setHeight">
			</div>
			<div>
				链接地址：
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
</template>
<script>
export default {
  	name: 'titleSidebar',
	props: ["result","active"],
	methods:{
		subtitleChange(ev){
			this.result.attr.normal.subtitle=ev.target.value.replace('T',' ');
			this.setHeight();
		},
		dateChange(ev){
			this.result.attr.wechat.date=ev.target.value.replace('T',' ');
			this.setHeight();
		},
		setHeight(){
			setTimeout(()=>{
				let setHeight=this.$parent.$parent.dragDrop.constructor.prototype.actionHeight;
				let active=this.$parent.$parent.$refs.list.querySelector("[item='"+this.active+"']");
				setHeight(active);
			},0)
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
	padding-right:20px;
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
</style>
