<template>
	<section class="region">
		<h4>添加内容</h4>
		<ul>
			<li v-for="item in $store.state.region.regionData" :class="{isTrue:item.type}" v-text="item.text" v-on:click="click(item)"></li>
		</ul>
	</section>
</template>
<script>
import _ from 'lodash';
export default {
  	name: 'region',
  	methods:{
  		click(item){
			if(item.type){
				var state=this.$store.state;
				state.sidebar.isHidden=false;
				state.sidebar.isRegion=false;
				if(/sidebar/.test(this.$parent.$el.className) && state.index.active>=0){
					state.index.data.splice(state.index.active+1,0,_.cloneDeep(state.region.originData[item.type]));
					state.index.active+=1;
					setTimeout(()=>{
						state.sidebar.top=this.$parent.$parent.$refs.item.querySelectorAll('.item')[state.index.active].offsetTop;
					},0);
				}else{
					state.index.data.push(_.cloneDeep(state.region.originData[item.type]));
					state.index.active=state.index.data.length-1;
					setTimeout(()=>{
						state.sidebar.top=this.$parent.$refs.item.querySelectorAll('.item')[state.index.active].offsetTop;
					},0);
				}
			}
  		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.region{
		box-sizing:initial;
	    text-align:center;
	    font-size:12px;
	    ul{	    	
		    margin:0;
		    padding:0;
			li{
				list-style: none;
				display:inline-block;
			    width: 56px;
			    height: 40px;
			    line-height: 40px;
			    border:1px solid #ddd;
			    margin:5px 2px;
				&.isTrue{
					background:white;
			   		color:steelblue;
			    	cursor:pointer;
				    &:hover{
				    	text-decoration:underline
				    }
				}
				background:gray;
				color:#ddd;
				cursor:not-allowed;
				user-select:none;
			}
	    }
	}	
</style>
