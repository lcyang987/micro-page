<template>
	<div class="line">
		<div :class="[result.attr.type,{padding:result.attr.padding}]" :style="{'border-bottom-color':result.attr.color}"></div>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  name: 'line',
  props: ['result']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.line{
		padding:10px 0;
		.solid,.dashed,.dotted{
			border-bottom-width:1px;
		}
		.solid{
			border-bottom-style:solid;
		}
		.dashed{
			border-bottom-style:dashed;
		}
		.dotted{
			border-bottom-style:dotted;
		}
		.padding{
			/*margin:0 10px;*/
			margin:0 .1rem;
		}
	}
</style>

<style lang="less" scope>
	.line{
    .padding{
      margin:0 10px;
    }
  }
</style>
