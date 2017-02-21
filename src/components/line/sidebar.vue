<template>
	<div class="lineSidebar" v-if="result" :class="">
		<div>
			<label for="color"> 颜色 
				<input type="color" id="color" v-model="result.attr.color">
			</label>
			<label for="padding">
				<input type="checkbox" id="padding" value="padding" v-model="result.attr.padding">
				左右留边
			</label>
		</div>
		<div>样式:
			<label for="solid">
				<input type="radio" id="solid" value="solid" v-model="result.attr.type">
				实线
			</label>
			<label for="dashed">
				<input type="radio" id="dashed" value="dashed" v-model="result.attr.type">
				虚线
			</label>
			<label for="dotted">
				<input type="radio" id="dotted" value="dotted" v-model="result.attr.type">
				点线
			</label>
		</div>
	</div>
</template>
<script>
export default {
  	name: 'lineSidebar',
	props: ["result"],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
