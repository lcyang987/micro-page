<template>
	<div class="textNavSidebar" v-if="result" >
		<template v-for="(item,i) of result.attr.list">
			<section>
				<div>
					<mu-text-field hintText="导航名称" v-model="item.text"/>
				</div>
				<dropdownComponent :result="item"></dropdownComponent>
				<button class="insert" v-on:click="insert(i)">+</button>
				<button class="remove" v-on:click="remove(i)">×</button>
			</section>
		</template>
		<button class="push" v-on:click="push">添加一个文本导航</button>
	</div>
</template>
<script>
import _ from 'lodash';
import originData from 'assets/originData.js';
export default {
  	name: 'textNavSidebar',
	props: ["result","active"],
	components:{
		originData
	},
	methods:{
		insert(i){
			this.result.attr.list.splice(i+1,0,_.cloneDeep(originData.textNav.attr.list[0]));
		},
		push(){
			this.result.attr.list.push(_.cloneDeep(originData.textNav.attr.list[0]));
		},
		remove(i){
			this.result.attr.list.splice(i,1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	input{
		width:70%;
	}
	section{
		position:relative;
		button{
		    position: absolute;
			right: -14px;
		    background: gray;
		    color: white;
		    border-radius: 50%;
		    padding: 5px;
		    width: 12px;
		    height: 12px;
		    line-height: 12px;
		    border: none;
		    opacity:0.4;
		    &:hover{
		    	opacity:0.8;
		    }
		    &:active{
		    	opacity:1;
		    }
		}
		.insert{
			top:3px;
		}
		.remove{
    		top: 30px;
		}
	}
	button.push{
		width:100%;
		height:45px;
		text-indent:35px;
		padding:0;
		text-align:left;
		border: 1px solid #e5e5e5;
		background:white;
		background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdEQjk5OEE2RkRERDExRTM4RDY0OTI0RDg2RjJCOEE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdEQjk5OEE3RkRERDExRTM4RDY0OTI0RDg2RjJCOEE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0RCNzIwN0ZGREREMTFFMzhENjQ5MjREODZGMkI4QTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0RCNzIwODBGREREMTFFMzhENjQ5MjREODZGMkI4QTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6AJc34AAAA4ElEQVR42mJ02c2ADESAuAiIfYBYDSp2A4g3AfEkIH4DU8iCpCkYiOcCMT8DKtCH4nwgTgLitSBBJiRNq7FoQgZ8UDXBMI2iQDwPiBmRVe12+Q/GaIARqlYMpDEXahqxAKS2AKTRj4F04AMKHA1k56EDZDHXPXDfqDMxkAd+sUDjSR/NRLhNyGJI4B4TNHJJBVtBGqcA8ScSNIHUTgA59RUoRTAyMK75z4A1IJDBf2jqeQULnLVATaFA+jMem0ByoehJDgTWALESELcD8RUg/g3EX4H4PBC3QOXWwhQDBBgAUkU1FNOZJvUAAAAASUVORK5CYII=);
		background-repeat:no-repeat;
		background-position:10px center;
		&:focus{
			outline:none;
		}
		&:active{
			background-color:#eee;
		}
	}
		
	span{
		display:inline-block;
		width:70px;
		text-align:right;
	}
</style>