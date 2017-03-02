<template>
	<div ref="actions" class="actions">
	    <div class="modal"></div>
		<ul>
			<li>编辑</li>
			<li v-on:click="addClick" v-on:mousedown.stop>加内容</li>
			<li v-on:click="open" v-on:mousedown.stop>删除</li>
		</ul>
	    <mu-dialog :open="dialog" title="提示" @close="close">
	    	是否确定删除？
		    <mu-flat-button slot="actions" primary @click="confirm" label="确定"/>
		    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
	    </mu-dialog>
	</div>
</template>
<script>
export default {
  	name: 'actions',
	props: ["result","index","data"],
	data(){
		return {
			dialog: false
		}
	},
	methods:{
		addClick(){
			this.$store.state.sidebar.isHidden=false;
			this.$store.state.sidebar.isRegion=true;
			this.$store.state.index.active=this.index;
			this.$store.state.sidebar.top=this.$refs.actions.parentNode.parentNode.offsetTop;
		},
	    open(){
	      this.dialog = true
	    },
	    close(){
	      this.dialog = false
	    },
	    confirm(){
			this.$store.state.index.isDelete=true;
			this.$store.state.sidebar.isHidden=true;
			this.$store.state.index.data.splice(this.index,1);
			this.$store.state.index.active=null;
			this.dialog = false
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
		.modal{			
			width:100%;
			height:100%;
			background:gray;
			opacity:0.1;
		}
	}
	.actions{
		/*width:calc(~'100% - 4px');
		height:calc(~'100% - 4px');*/
		width:100%;
		height:100%;
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
