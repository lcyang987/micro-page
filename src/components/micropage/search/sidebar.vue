<template>
	<div class="lineSidebar" v-if="result" :class="">
		<div class="demo-tip-setting">
      背景色选择已被取消，暂无选项
			<!-- <p>
				背景色：
        <el-color-picker v-model="result.attr.backgroundColor"></el-color-picker>
			</p> -->
		</div>
	</div>
</template>
<script>
export default {
  name: 'lineSidebar',
  props: ['result']
}
</script>
