<template>
	<div class="lineSidebar" v-if="result" :class="">
		<!--<div>
			<label for="Color"> 背景色： 
				<input type="color" id="Color" v-model="result.attr.backgroundColor">
			</label>
			<button v-on:click="click">重置</button>
		</div>-->
		<div class="demo-tip-setting">
			<p>
				背景色：
				<input type="color" style="width:120px;height:36px;margin-right:20px" id="color" v-model="result.attr.backgroundColor">
				<mu-raised-button class="demo-raised-button push" label="重置" primary v-on:click="click"/>
			</p>
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
