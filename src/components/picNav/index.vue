<template>
	<div class="picNav">
		<div>
			<template v-for="item of result.attr.list">
				<div class="imgBox">
					<img :class="{visibility:!item.img}" :src="item.img" />
					<span v-text="item.text"></span>
				</div>
			</template>
		</div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'picNav',
	props: ["result","index","data"]	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.picNav{
		min-height:50px;
		div{
			overflow:hidden;
		}
		.imgBox{
			width:25%;
			float:left;
			text-align:center;
			overflow:hidden;
			.visibility{
				visibility:hidden;
			}
			img{
				width:100%;
				height:80px;
				border:none;
			}
		}
	}
</style>