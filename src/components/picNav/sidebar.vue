<template>
	<div class="picNavSidebar" v-if="result" >
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
		</section>
	</div>
</template>
<script>
import _ from 'lodash';
export default {
  	name: 'picNavSidebar',
	props: ["result","active"],
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	section{
		clear:both;
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
	}
</style>