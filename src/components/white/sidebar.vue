<template>
	<div class="whiteSidebar" v-if="result">
		高度 
		<div class="height">
			<span :style="[{left:height}]" v-on:mousedown="heightMousedown"></span>
		</div>
		{{result.attr.height}}
	</div>
</template>
<script>
export default {
  	name: 'whiteSidebar',
	props: ["result","active"],
	computed:{
		height(){
			return this.result.attr.height+'px';
		}
	},
	methods:{
		heightMousedown(ev){
			let active=this.$parent.$parent.$refs.list.querySelector("[item='"+this.active+"']");
			let oEvent=ev||window.event;
			const disX=oEvent.clientX;
			const oldOpacity=this.result.attr.height;
			document.body.style.userSelect='none';
			window.onmousemove=ev=>{
				let oEvent=ev||window.event;
				let l;
				if(oldOpacity+(oEvent.clientX-disX)<30)
					l=30;
				else if(oldOpacity+(oEvent.clientX-disX)>100)
					l=100;
				else 
					l=oldOpacity+(oEvent.clientX-disX);
				this.result.attr.height=l;
			}
			window.onmouseup=ev=>{
				window.onmousemove=window.onmouseup=null;
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.height{
		width:100px;
		height:4px;
		display:inline-block;
		vertical-align:middle;
		background:steelblue;
		position:relative;
		border-radius:3px;
		margin:0 10px;
		span{
			border-radius:50%;
			width:16px;
			height:16px;
			display:block;
			position:absolute;
			top:-7px;
			background:white;
			border:1px solid gray;
			margin-left:-8px;
		}
		&:before{
			content:'';
			background:white;
			width:30px;
			height:4px;
			display:block;
			opacity:0.7;
		}
	}
</style>
