<template>
	<section v-if="item">
		<div v-if="item.type==='line'" :item="i" v-on:click="click(item,i)">{{item.str}}
			<lineComponent :data="data" :result="item" :index="i"></lineComponent>
		</div>
		<div v-if="item.type==='white'" :item="i" v-on:click="click(item,i)">{{i}}
			<whiteComponent :data="data" :result="item" :index="i"></whiteComponent>
		</div>
	</section>
</template>
<script>
import DragDrop from 'assets/js/dragDrop.js';
import lineComponent from './line/index';
import whiteComponent from './white/index';
import _ from 'lodash';
export default {
  	name: 'index',
  	props:["data","item","i"],
	components: {
		lineComponent,
		whiteComponent
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	
</style>
