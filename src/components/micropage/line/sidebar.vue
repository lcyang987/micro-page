<template>
	<div class="lineSidebar" v-if="result" :class="">
		<div class="demo-tip-setting">
			<p>
				颜色：
        <el-color-picker v-model="result.attr.color"></el-color-picker>
  			<mu-checkbox label="左右留边" v-model="result.attr.padding" class="demo-checkbox" style="margin-left:20px"/>
			</p>
			<p>
				<mu-radio label="实线" nativeValue="solid" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="虚线" nativeValue="dashed" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="点线" nativeValue="dotted" v-model="result.attr.type" class="demo-radio"/>
			</p>
		</div>
	</div>
</template>
<script>
export default {
  name: 'lineSidebar',
  props: ['result']
}
</script>
