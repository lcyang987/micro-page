<template>
	<div class="textNav">
		<template v-for="item of result.attr.list">
			<p v-text="item.text?item.text: '未设置『文本导航』'" ></p>
		</template>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
import actionsComponent from '../actions';
export default {
  	name: 'textNav',
	props: ["result","index","data"],
	components:{
		actionsComponent
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.textNav{
		padding:10px;
		overflow:hidden;
		p{
			margin:0;
			padding:0;
			white-space:nowrap;
		}
	}
</style>