<template>
	<div class="showcaseSidebar" v-if="result" >
		<div class="demo-tip-setting">
			<p>
				<mu-text-field labelFloat label="橱窗标题" hintText="" v-model="result.attr.title"/>
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
				<mu-text-field labelFloat label="内容标题" hintText="" v-model="result.attr.contentTitle"/>
			</p>
			<p>
		  		<mu-text-field labelFloat label="内容说明" hintText="50字以内" multiLine :rows="3" :rowsMax="6" :maxLength="50" v-model="result.attr.contentDescription"/>
			</p>
		</div>
		<section v-for="(item,i) of result.attr.list">
			<div>
				<img width="120" height="120" :src="item.img" :alt="item.img?'':'暂无图片'" />
				<mu-raised-button @click="click(item)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
			</div>
			<div>
				<mu-raised-button v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :href="item.link.url" target="_blank" primary />
				<bottomSheetComponent :width="'100%'" :link="item.link"></bottomSheetComponent>
			</div>
		</section>
	</div>
</template>
<script>
import _ from 'lodash';
import originData from 'assets/originData.js';
export default {
  	name: 'showcaseSidebar',
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
	    				[dialoge.state,dialog.title,dialog.data]=[true,data.title,data.list];
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