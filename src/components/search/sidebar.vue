<template>
	<div class="lineSidebar" v-if="result" :class="">
		<div>
			<label for="Color"> 背景色： 
				<input type="color" id="Color" v-model="result.attr.backgroundColor">
			</label>
			<button v-on:click="click">重置</button>
		</div>
	</div>
</template>
<script>
export default {
  	name: 'lineSidebar',
	props: ["result"],
	methods:{
		click(){
			this.result.attr.backgroundColor='#ffffff';
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
