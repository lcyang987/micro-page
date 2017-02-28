<template>
	<div class="demo-tip-setting">
		<p>
			高度：
		</p>
		<p>
			<mu-slider v-model="result.attr.height" :min="30"  class="demo-slider"/>
		</p>
	</div>
</template>
<script>
export default {
  	name: 'whiteSidebar',
	props: ["result"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
