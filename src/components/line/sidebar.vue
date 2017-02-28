<template>
	<div class="lineSidebar" v-if="result" :class="">
		<div class="demo-tip-setting">
			<p>
				颜色：
				<input type="color" style="width:240px;height:24px;" id="color" v-model="result.attr.color">
			</p>
			<p>
				<mu-radio label="实线" nativeValue="solid" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="虚线" nativeValue="dashed" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="点线" nativeValue="dotted" v-model="result.attr.type" class="demo-radio"/>
			</p>
			<mu-checkbox label="左右留边" v-model="result.attr.padding" class="demo-checkbox"/>
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
