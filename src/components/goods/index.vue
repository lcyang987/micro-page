<template>
	<div class="goods" v-if="result.attr.list">
		<div :class="result.attr.type">
			<template v-for="item,i of list">
				<div class="imgBox">
					<img :src="item.img||imgs[i]"/>
				</div>
			</template>
		</div>
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'goods',
	props: ["result","index","data"],
	data(){
		return {
			imgs:[
				require('assets/images/p1.jpg'),
				require('assets/images/p2.jpg'),
				require('assets/images/p3.jpg'),
				require('assets/images/pn.jpg')
			]
		}
	},
	computed:{
		list(){
			if(this.result.attr.list[0].img){
				return this.result.attr.list
			}else{
				return 4;
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.goods{
		.imgBox{
			img{
				width:100%;
			}
		}
	}
</style>