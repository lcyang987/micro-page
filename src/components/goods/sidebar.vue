<template>
	<div class="goodsSidebar" v-if="result" >
		<div class="demo-tip-setting">
			<p>
				选择商品：
				<mu-float-button icon="add" mini class="demo-float-button" @click="click"/>
			</p>
			<p>
				列表样式：
			</p>
			<p>
				<mu-radio label="大图" nativeValue="big" v-model="result.attr.type" class="demo-radio" @change="change"/>
				<mu-radio label="小图" nativeValue="small" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="1大2小" nativeValue="arrange12" v-model="result.attr.type" class="demo-radio" @change="change"/>
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
		<div class="demo-tip-setting">
			<p v-show="(!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && (!/^(easy)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && !/^(list)$/.test(result.attr.type)">
				<mu-checkbox :label="result.attr.type==='arrange12'?'显示商品名(小图不显示名称)':'显示商品名'" v-model="result.attr.display.text" class="demo-checkbox"/>
			</p>
			<p v-show="/^(big)$/.test(result.attr.type) && /^(card)$/.test(result.attr.style)">
				<mu-checkbox label="显示简介" v-model="result.attr.display.info" class="demo-checkbox"/>
			</p>
			<p v-show="(!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && !/^(list)$/.test(result.attr.type)">
				<mu-checkbox label="显示价格" v-model="result.attr.display.price" class="demo-checkbox"/>
			</p>
		</div>
		<div class="demo-tip-setting" v-show="(((!/^(sale)$/.test(result.attr.style) && /^(small)$/.test(result.attr.type)) || (!/^(easy)$/.test(result.attr.style) && /^(big)$/.test(result.attr.type))) && (!/^(easy)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type))) || (!/^(easy)$/.test(result.attr.style) && /^(arrange12)$/.test(result.attr.type)) || /^(list)$/.test(result.attr.type)">
			<mu-checkbox label="显示购买按钮" v-model="result.attr.display.btn" class="demo-checkbox"/>
			<p v-show="result.attr.display.btn && !/^(sale)$/.test(result.attr.style)">
				<mu-radio label="样式1" nativeValue="1" v-model="result.attr.btn" class="demo-radio"/>
				<mu-radio label="样式2" nativeValue="2" v-model="result.attr.btn" class="demo-radio"/>
				<mu-radio label="样式3" nativeValue="3" v-model="result.attr.btn" v-show="(!/^(easy)$/.test(result.attr.style) && /^(list)$/.test(result.attr.type)) || !/^(list)$/.test(result.attr.type)" class="demo-radio"/>
				<mu-radio label="样式4" nativeValue="4" v-model="result.attr.btn" class="demo-radio"/>
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
		remove(i){
			this.result.attr.list.splice(i,1);
		},
		change(){
			if(/falls|sale/.test(this.result.attr.style))
				this.result.attr.style='card';
			setTimeout(()=>{
				if(/^(easy)$/.test(this.result.attr.style) && /^(list)$/.test(this.result.attr.type))
					this.btnChange();
			},0);
		},
		btnChange(){
			if(/^(3)$/.test(this.result.attr.btn) && /^(list)$/.test(this.result.attr.type))
				this.result.attr.btn='1';
		},
		click(item){
			console.log(this.result)
			this.result.attr.list.push(_.cloneDeep(this.result.originData));
  			this.$store.state.dialog.link=this.result.attr.list[this.result.attr.list.length-1];
			this.$store.dispatch('ajax',{
				url:'picNav.txt',
				method:'get',
				data:{
					a:'lhb',
				}
			});
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