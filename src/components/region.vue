<template>
	<section class="region">
		<h4>添加内容</h4>
		<ul>
			<li v-for="item in regionData" :class="{isTrue:item.type}" v-text="item.text" v-on:click="click(item)"></li>
		</ul>
	</section>
</template>
<script>
import _ from 'lodash';
//import originData from 'assets/originData.js';
//import regionData from 'assets/regionData.js';
export default {
  	name: 'region',
  	props:["data"],
  	data(){
  		return {
  			regionData:this.$store.state.region.regionData,
  			originData:this.$store.state.region.originData,
  			active:this.$store.state.region.active,
  		}
  	},
  	methods:{
  		click(item){
			if(item.type){
				if(this.active!=null){
					this.data.splice(this.active+1,0,_.cloneDeep(this.originData[item.type]));
				}else{
					let json = _.cloneDeep(this.originData[item.type]);
					this.data.push(json);
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
