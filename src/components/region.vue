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
//import originData from 'assets/originData.js';
//import regionData from 'assets/regionData.js';
export default {
  	name: 'region',
  	methods:{
  		click(item){
			if(item.type){
				if(/sidebar/.test(this.$parent.$el.className) && this.$store.state.index.active>=0){
					var json=_.cloneDeep(this.$store.state.region.originData[item.type]);
					this.$store.state.index.data.splice(this.$store.state.index.active+1,0,json);
				}else{
					var json = _.cloneDeep(this.$store.state.region.originData[item.type]);
					this.$store.state.index.data.push(json);
				}
			}
  		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '~assets/css/dragDrop.css'
</style>
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
