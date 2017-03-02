<template>
	<div class="goodsSidebar" v-if="result" >
		<div class="demo-tip-setting">
			<p>
				选择商品：
				<mu-float-button icon="add" mini class="demo-float-button"/>
			</p>
			<p>
				列表样式：
			</p>
			<p>
				<mu-radio label="大图" nativeValue="big" v-model="result.attr.type" class="demo-radio" @change="change"/>
				<mu-radio label="小图" nativeValue="small" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="1大2小" nativeValue="12" v-model="result.attr.type" class="demo-radio" @change="change"/>
				<mu-radio label="列表" nativeValue="list" v-model="result.attr.type" class="demo-radio" @change="change"/>
			</p>
		</div>
		<div class="demo-tip-setting">
			<p>
				<mu-radio label="卡片" nativeValue="card" v-model="result.attr.style" class="demo-radio"/>
				<mu-radio label="瀑布" nativeValue="falls" v-model="result.attr.style" v-show="/^(small)$/.test(result.attr.type)" class="demo-radio"/>
				<mu-radio label="极简" nativeValue="easy" v-model="result.attr.style" @change="btnChange" class="demo-radio"/>
				<mu-radio label="促销" nativeValue="sale" v-model="result.attr.style" v-show="/^(small)$/.test(result.attr.type)" class="demo-radio"/>
			</p>
		</div>
		<div class="demo-tip-setting" v-show="(((!/^(sale)$/.test(result.attr.style) && /^(small)$/.test(result.attr.type)) || (!/^(easy)$/.test(result.attr.style) && /^(big)$/.test(result.attr.type))) && (!/^(easy)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type))) || (!/^(easy)$/.test(result.attr.style) && /^(12)$/.test(result.attr.type)) || /^(list)$/.test(result.attr.type)">
			<mu-checkbox label="显示购买按钮" v-model="result.attr.display.btn" class="demo-checkbox"/>
			<p v-show="result.attr.display.btn && !/^(sale)$/.test(result.attr.style)">
				<mu-radio label="样式1" nativeValue="1" v-model="result.attr.btnStyle" class="demo-radio"/>
				<mu-radio label="样式2" nativeValue="2" v-model="result.attr.btnStyle" class="demo-radio"/>
				<mu-radio label="样式3" nativeValue="3" v-model="result.attr.btnStyle" v-show="(!/^(easy)$/.test(result.attr.style) && /^(list)$/.test(result.attr.type)) || !/^(list)$/.test(result.attr.type)" class="demo-radio"/>
				<mu-radio label="样式4" nativeValue="4" v-model="result.attr.btnStyle" class="demo-radio"/>
			</p>
		</div>
		<div class="demo-tip-setting">
			<p v-show="(!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && (!/^(easy)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type))">
				<mu-checkbox label="显示商品名" v-model="result.attr.display.name" class="demo-checkbox"/>
			</p>
			<p v-show="/^(big)$/.test(result.attr.type)">
				<mu-checkbox label="显示简介" v-model="result.attr.display.info" class="demo-checkbox"/>
			</p>
			<p v-show="(!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type))">
				<mu-checkbox label="显示价格" v-model="result.attr.display.price" class="demo-checkbox"/>
			</p>
		</div>
	</div>
</template>
<script>
import _ from 'lodash';
import originData from 'assets/originData.js';
export default {
  	name: 'goodsSidebar',
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
		push(){
			this.result.attr.list.push(_.cloneDeep(originData.imageAd.attr.list[0]));
		},
		remove(i){
			this.result.attr.list.splice(i,1);
		},
		change(){
			if(/falls|sale/.test(this.result.attr.style))
				this.result.attr.style='card';
		},
		btnChange(){
			if(/^(3)$/.test(this.result.attr.btnStyle) && /^(list)$/.test(this.result.attr.type))
				this.result.attr.btnStyle='1';
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