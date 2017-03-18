<template>
	<div class="noticeSidebar">
  		<mu-text-field v-inputValidator="{'require':result.require.content,'value':result.attr.content,'validator':result.validator.content}" labelFloat :errorText="errorTxt" @textOverflow="testOverflow" v-model="result.attr.content" label="公告" fullWidth multiLine :rows="3" :rowsMax="6" :maxLength="parseInt(result.validator.content.max)"/>
	</div>
</template>
<script>
export default {
  	name: 'noticeSidebar',
	props: ["result"],
	data(){
		return {
			errorTxt:''
		}
	},
	methods:{
		testOverflow(isOverflow){
			this.errorTxt=isOverflow?'超过啦！':'';
		}
	},
	mounted(){
		if(!this.result.attr.content)
			return;
		let old=this.result.attr.content;
//		this.result.attr.content=old.slice(0,-1)+' '+old.slice(-1);
		this.result.attr.content=old+' ';
		setTimeout(()=>{
			this.result.attr.content=old;
		},0);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>