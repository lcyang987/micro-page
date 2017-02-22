<template>
	<div class="actions" v-on:click="editClick">
		<ul>
			<li>编辑</li>
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
			this.sideBarShow();
			if(this.$store.state.sidebar)
				this.$store.state.sidebar.isRegion=false;
				
		},
		addClick(){
			console.log(this.index)
			this.$store.state.index.notEdit=true;
			this.$store.state.index.active=this.index;
			setTimeout(()=>{
				this.sideBarShow();
				if(this.$store.state.sidebar)
					this.$store.state.sidebar.isRegion=true;
				this.$store.state.sidebar.top=this.$parent.$parent.$refs.list.querySelector('[item="'+this.index+'"]').offsetTop;
				this.$store.state.index.notEdit=false;
				setTimeout(()=>{
					this.$parent.$parent.setActive(this.index);
					this.$store.state.region.active=parseInt(this.$parent.$parent.$refs.list.querySelector("[item='"+this.index+"'").getAttribute('index'));
				},0);
			},0);
		},
		deleteClick(){
			console.log(this.$store.state.index.data)
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
	.actions{
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
