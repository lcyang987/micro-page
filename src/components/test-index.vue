<template>
	<div class="design">
		<listComponent v-for="(item,i) in data" :data="data" :item="item" :i="i"></listComponent>
		<regionComponent :data="data"></regionComponent>
		<sidebarComponent :data="data" v-if="active !== null" ref="sidebar" :result="data[active]" :active="active"></sidebarComponent>
		<div v-on:click="returnData(true)" style="text-align:center;padding:10px;">return data</div>
	</div>
</template>
<script>
import data from 'assets/data.js';
import sidebarComponent from './sidebar';
import regionComponent from './region';
import listComponent from './list';
import _ from 'lodash';
export default {
  	name: 'index',
	components: {
		listComponent,
		sidebarComponent,
		regionComponent
	},
  	data () {
  	  	return {
  	  		data,
  	  		active:null
  	  	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '~assets/css/dragDrop.css'
</style>
<style lang="less" scoped>
	.design{
		position:relative;
		width:320px;
		margin:0 auto;
		margin-top:20px;
		box-shadow: 0 0 0 1px #c5c5c5;
		section{
			width:320px;
		}
	}
</style>
