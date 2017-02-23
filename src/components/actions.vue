<template>
	<div class="actions">
		<ul>
			<li v-on:click.stop="editClick" v-on:mousedown.stop>编辑</li>
			<li v-on:click.stop="addClick" v-on:mousedown.stop>加内容</li>
			<li v-on:click.stop="deleteClick" v-on:mousedown.stop>删除</li>
		</ul>
	</div>
</template>
<script>
export default {
  	name: 'actions',
	props: ["result","index","data"],
	methods:{
		editClick(){
			this.$store.state.index.active=this.index;
			this.sideBarShow();
			if(this.$store.state.sidebar)
				this.$store.state.sidebar.isRegion=false;
		},
		addClick(){
			this.sideBarShow();
			this.$store.state.sidebar.isRegion=true;
			this.$store.state.index.active=this.index;
		},
		deleteClick(){
			if(confirm('是否删除')){
				this.$store.state.index.isDelete=true;
				setTimeout(()=>{
					if(this.$store.state.sidebar)
						this.$store.state.sidebar.isHidden=true;
					this.$store.state.index.data.splice(this.index,1);
				},0);
			}
		},
		sideBarShow(){
			if(this.$store.state.sidebar)
				this.$store.state.sidebar.isHidden=false;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.active{
		.actions{
			display:block;
		}
		.hover{
			display:block;
		}
	}
	.actions{
		width:calc(~'100% - 4px');
		height:calc(~'100% - 4px');
		ul{
			position: absolute;
		    bottom: 0;
		    right: 0;
			margin:0;
			padding:0;
			li{
				list-style: none;
				float:left;
			    background-color: rgba(0,0,0,0.3);
			    color: #fff;
			    padding: 0 5px;
			    margin-left: 1px;
			    font-size: 12px;
			    &:hover{
			    	color: #ddd;
    				cursor: pointer;
			    }
			}
		}
	}
</style>
