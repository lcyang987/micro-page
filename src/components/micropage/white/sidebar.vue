<template>
	<div class="whiteSidebar" style="width:200px">
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
  props: ['result']
}
</script>
