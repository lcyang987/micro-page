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
		<div ref="items" class="list">
			<section class="item" v-for="(item,i) of result.attr.list" v-if="result.attr.list.length" @mousedown="mousedown(i)">
				<div>
					<img draggable="false" width="120" height="120" :src="item.img" :alt="item.img?'':'暂无图片'" />
					<mu-raised-button @click="click(item)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
				</div>
				<div>
					<mu-text-field labelFloat label="导航名称" hintText="" v-model="item.text" style="width:100%"/>
					<mu-raised-button draggable="false" v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :href="item.link.url" target="_blank" primary />
					<bottomSheetComponent :width="'100%'" :link="item.link"></bottomSheetComponent>
				</div>
				<mu-icon-button v-if="result.attr.list.length<10" class="insert" icon="add" v-on:click="insert(i)"/>
				<mu-icon-button class="remove" icon="close" v-on:click="remove(i)"/>
			</section>
		</div>
		<mu-raised-button fullWidth v-if="result.attr.list.length<10" class="demo-raised-button push" label="添加一个图片广告" icon="add" primary v-on:click="push"/>
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
			this.result.attr.list.splice(i+1,0,_.cloneDeep(originData.imageAd.originData));
		},
		push(){
			this.result.attr.list.push(_.cloneDeep(originData.imageAd.originData));
		},
		remove(i){
			this.result.attr.list.splice(i,1);
		}
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
    		top: -5px;
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