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
		<section v-for="(item,i) of result.attr.list">
			<div>
				<img width="120" height="120" :src="item.img" :alt="item.img?'':'暂无图片'" />
				<mu-raised-button @click="click(item)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
			</div>
			<div>
				<mu-text-field labelFloat label="导航名称" hintText="" v-model="item.text" style="width:100%"/>
				<mu-raised-button v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :href="item.link.url" target="_blank" primary />
				<bottomSheetComponent :width="'100%'" :link="item.link"></bottomSheetComponent>
			</div>
			<mu-icon-button class="remove" icon="close" v-on:click="remove(i)"/>
		</section>
		<mu-raised-button fullWidth v-show="!result.attr.list.length || (result.attr.list && result.attr.list.length<10 && result.attr.list[result.attr.list.length-1] && result.attr.list[result.attr.list.length-1].img)" class="demo-raised-button push" label="添加一个图片广告" icon="add" primary v-on:click="push"/>
	</div>
</template>
<script>
import _ from 'lodash';
import originData from 'assets/originData.js';
export default {
  	name: 'imageAdSidebar',
	props: ["result","active"],
	components:{
		originData
	},
	methods:{
		click(item){			
  			this.$store.state.dialog.link=item;
	    	var _this=this;
	    	this.$http.get('picNav.txt',{a:1,b:2},{emulateJSON:true}).then(
	    		function(response){
	    			if(response.data.success){
	    				var data=response.data.data;
	    				var dialog=_this.$store.state.dialog;
	    				dialog.state=true;
	    				dialog.title=data.title;
	    				dialog.data=data.list;
	    				dialog.timer=setTimeout(()=>{
	    					dialog.loading=true;
	    				},500);
	    			}else{
	    				
	    			}
	    		},
	    		function(response){
	    			
	    		}
	    	);
		},
		insert(i){
			this.result.attr.list.splice(i+1,0,_.cloneDeep(originData.imageAd.attr.list[0]));
		},
		push(){
			this.result.attr.list.push(_.cloneDeep(originData.imageAd.attr.list[0]));
		},
		remove(i){
			this.result.attr.list.splice(i,1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	section{
		clear:both;
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