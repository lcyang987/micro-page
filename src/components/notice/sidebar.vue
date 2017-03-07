<template>
	<div class="noticeSidebar">
  		<mu-text-field labelFloat label="公告" fullWidth hintText="" multiLine :rows="3" :rowsMax="6" :maxLength="50" v-model="result.attr.content"/>
	</div>
</template>
<script>
export default {
  	name: 'noticeSidebar',
	props: ["result"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
