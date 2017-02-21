<template>
	<div class="line">
		<div :class="[result.attr.type,{padding:result.attr.padding}]" :style="{'border-bottom-color':result.attr.color}"></div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
import actionsComponent from '../actions';
export default {
  	name: 'line',
	props: ["result","index","data"],
	components:{
		actionsComponent
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.line{
		padding:10px 0;
		.solid{
			border-bottom:1px solid black;
		}
		.dashed{
			border-bottom:1px dashed red;
		}
		.dotted{
			border-bottom:1px dotted blue;
		}
		.padding{
			margin:0 10px;
		}
	}
</style>