<template>
	<div class="showcaseSidebar" v-if="result" >
		<div class="demo-tip-setting">
			<p>
				<mu-text-field v-listInputValidator="{'require':result.require.title,'value':result.attr.title}" labelFloat label="橱窗标题" hintText="" v-model="result.attr.title"/>
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
		  		<mu-text-field v-inputValidator="{'require':result.require.contentDescription,'value':result.attr.contentDescription,'validator':result.validator.contentDescription}" :errorText="errorTxt" @textOverflow="testOverflow" labelFloat label="内容说明" hintText="50字以内" multiLine :rows="3" :rowsMax="6" :maxLength="result.validator.contentDescription.max" v-model="result.attr.contentDescription"/>
			</p>
		</div>
		<div ref="items" class="list">
			<section class="item" v-for="(item,i) of result.attr.list" @mousedown="mousedown(i)">
				<div>
					<img draggable="false" width="120" height="120" :src="item.img" :alt="item.img?'':'暂无图片'" />
					<mu-raised-button v-imgValidator="{'require':result.require.list.img,'value':item.img}" @click="click(item)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
				</div>
				<div>
					<mu-raised-button draggable="false" v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :href="item.link.url" target="_blank" primary />
					<bottomSheetComponent v-linkValidator="{'require':result.require.list.link,'value':item.link}" :width="'100%'" :link="item.link"></bottomSheetComponent>
				</div>
			</section>
		</div>
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
	data(){
		return {
			errorTxt:''
		}
	},
	methods:{
		testOverflow(isOverflow){
			this.errorTxt=isOverflow?'超过啦！':'';
		},
		click(item){			
  			this.$store.state.dialog.link=item;
			this.$store.dispatch('ajax',{
				url:'picNav.txt',
				method:'get',
				data:{
					a:'lhb',
				}
			});
		},
		mousedown(i){
			this.$store.commit('dragDrop',{
				oEvent:event,
				items:this.$refs.items,
				obj:this.$refs.items.children[i],
				data:this.result.attr.list,
				active:i
			});
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
	},
	mounted(){
		if(!this.result.attr.contentDescription)
			return;
		let old=this.result.attr.contentDescription;
//		this.result.attr.contentDescription=old.slice(0,-1)+' '+old.slice(-1);
		this.result.attr.contentDescription=old+' ';
		setTimeout(()=>{
			this.result.attr.contentDescription=old;
		},0);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.list{
		position:relative;
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
		position:relative;
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