<template>
	<div class="design">
		<section ref="list">
			<template v-for="(item,i) in $store.state.index.data" v-if="$store.state.index.state">
				<div class="list" @mousedown="mousedown" @mouseenter="mouseenter(item,i)" @mouseleave="mouseleave" :class="{active:i===active}" :active="$store.state.index.active===i">
					<component :is="item.type+'Component'" data="$store.state.index.data" :item="i" :result="item" :index="i"></component>
				</div>
			</template>
		</section>
		<regionComponent></regionComponent>
		<sidebarComponent v-if="$store.state.index.active !== null" ref="sidebar" :result="$store.state.index.data[$store.state.index.active]"></sidebarComponent>
		<div v-on:click="returnData" style="text-align:center">return data</div>
		<dialogComponent></dialogComponent>
	</div>
</template>
<script>
import sidebarComponent from './sidebar';
import regionComponent from './region';
import lineComponent from './line/index';
import whiteComponent from './white/index';
import noticeComponent from './notice/index';
import searchComponent from './search/index';
import titleComponent from './title/index';
import textNavComponent from './textNav/index';
import _ from 'lodash';
export default {
  	name: 'index',
  	data(){
  		return {
  			active:null
  		}
  	},
	components: {
		sidebarComponent,
		regionComponent,
		lineComponent,
		whiteComponent,
		noticeComponent,
		searchComponent,
		titleComponent,
		textNavComponent
	},
  	methods:{
  		returnData(){
  			console.log(JSON.stringify(this.$store.state.index.data))
  		},
  		mousedown(ev){
  			var isActive;
  			if(this.$store.state.index.active==this.active)
  				isActive=true;
  			else
				this.$store.state.index.active=null
			var oEvent=ev || window.event;
			var list=this.$refs.list.querySelectorAll('.list');
			var obj=this.$refs.list.children[this.active];
			var disY=oEvent.clientY-obj.offsetTop;
			var placeholder=document.createElement('div');
			this.$refs.list.insertBefore(placeholder,obj);
			placeholder.style.height=obj.offsetHeight+'px';		
			obj.style.position='absolute';
			obj.style.top=oEvent.clientY-disY+'px';
			obj.style.zIndex='123';
			document.body.style.userSelect='none';
			function elementsChange(opt){
				opt._this.active=opt.i;
				var nowStyle=opt.obj.getAttribute('style');
				opt.obj.removeAttribute('style');
				opt.obj=opt.list[opt.i];
				opt.obj.style=nowStyle;
				if(isActive)
					opt._this.$store.state.index.active=opt.i;
				opt._this.$refs.list.insertBefore(placeholder,opt.list[opt.i]);
				return opt.obj
			}
			window.onmousemove=ev=>{
	  			var oEvent=ev || window.event;
	  			var y=oEvent.clientY;
	  			obj.style.top=y-disY+'px';
	  			for(var i=0;i<list.length;i++){
	  				if(list[i]!=obj)
					if(i+1==this.active || i-1==this.active)
					if(i>this.active){
						if(list[i].offsetTop<obj.offsetTop){
							this.$store.state.index.data.splice(this.active+2,0,this.$store.state.index.data[this.active]);
							this.$store.state.index.data.splice(this.active,1);
							obj=elementsChange({
								_this:this,
								list:list,
								i:i,
								obj:obj
							})
						}
					}else{
						if(list[i].offsetTop>obj.offsetTop){
							this.$store.state.index.data.splice(this.active-1,0,this.$store.state.index.data[this.active]);
							this.$store.state.index.data.splice(this.active+1,1);
							obj=elementsChange({
								_this:this,
								list:list,
								i:i,
								obj:obj
							})
						}
					}
	  			}
			}
			window.onmouseup=ev=>{
				obj.removeAttribute('style');
				this.$refs.list.removeChild(placeholder);
				document.body.style.userSelect='';
				window.onmousemove=window.onmouseup=null;
				this.$store.state.index.active=this.active;
				this.$store.state.sidebar.isHidden=false;
				this.$store.state.sidebar.isRegion=false;
				this.$store.state.sidebar.top=obj.offsetTop;
			}
  		},
  		mouseenter(item,i){
  			this.active=i;
  		},
  		mouseleave(item,i){
  			this.active=null;
  		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '~assets/css/dragDrop.css'
</style>
<style lang="less" scoped>
	.design{
		position:relative;
		width:320px;
		margin:0 auto;
		margin-top:20px;
		box-shadow: 0 0 0 1px #c5c5c5;
		section{
			width:320px;
		}
		.list{
			width:320px;
			position:relative;
			background:white;
		}
	}
</style>
