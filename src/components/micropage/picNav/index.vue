<template>
	<div class="picNav">
		<div>
			<template v-for="item of result.attr.list">
				<div class="imgBox">
					<img :class="{visibility:!item.img}" :src="item.img ? item.img.replace(/\/w\/\d+\/h\/\d+$/, '') + '/w/160/h/160' : ''" />
					<span v-text="item.text"></span>
				</div>
			</template>
		</div>
		<actionsComponent :result="result"></actionsComponent>
	</div>
</template>
<script>
export default {
  name: 'picNav',
  props: ['result']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.picNav{
		min-height:50px;
    background-color: white;
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
				/*height:80px;*/
				height:.8rem;
				border:none;
			}
		}
	}
</style>
<style lang="less" scope>
	.picNav{
		.imgBox{
			img{
				height:80px;
			}
      span{
        word-wrap: break-word;
      }
		}
	}
</style>
