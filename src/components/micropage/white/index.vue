<template>
	<div class="white">
		<div :style="{height:result.attr.height+'px'}"></div>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  name: 'white',
  props: ['result']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
