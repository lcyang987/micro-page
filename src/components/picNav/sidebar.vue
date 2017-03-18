<template>
	<div ref="items" class="picNavSidebar list" v-if="result" >
		<section class="item" v-for="(item,i) of result.attr.list" @mousedown="mousedown(i)">
			<div>
				<img draggable="false" width="120" height="120" :src="item.img" :alt="item.img?'':'暂无图片'" />
				<mu-raised-button v-imgValidator="{'require':result.require.list.img,'value':item.img}" @click="click(item)" style="width:120px;" :label="item.img?'修改图片':'选择图片'"></mu-raised-button>
			</div>
			<div>
				<mu-text-field v-listInputValidator="{'require':result.require.list.text,'value':item.text,'validator':result.validator.list.text}" labelFloat label="导航名称" hintText="" v-model="item.text" style="width:100%"/>
				<mu-raised-button draggable="false" v-if="item.link.id" style="width:100%" class="demo-raised-button" :label="item.link.text" :href="item.link.url" target="_blank" primary />
				<bottomSheetComponent v-linkValidator="{'require':result.require.list.link,'value':item.link}" :width="'100%'" :link="item.link"></bottomSheetComponent>
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
	}
</style>