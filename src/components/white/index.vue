<template>
	<div class="white">
		<div :style="{height:result.attr.height+'px'}"></div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
import actionsComponent from '../actions';
export default {
  	name: 'white',
	props: ["result","index","data"],
	components:{
		actionsComponent
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	
</style>
