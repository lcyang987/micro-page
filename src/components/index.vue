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
import picNavComponent from './picNav/index';
import imageAdComponent from './imageAd/index';
import showcaseComponent from './showcase/index';
import goodsComponent from './goods/index';
import _ from 'lodash';
export default {
  	name: 'index',
  	data(){
  		return {
  			active:null,
  			isMove:false
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
		textNavComponent,
		picNavComponent,
		imageAdComponent,
		showcaseComponent,
		goodsComponent
	},
  	methods:{
  		returnData(){
  			console.log(JSON.stringify(this.$store.state.index.data))
  			console.log(JSON.stringify(this.$store.state.dialog))
  		},
  		mousedown(ev){
  			this.isMove=true;
  			var isActive;
  			if(this.$store.state.index.active==this.active)
  				isActive=true;
			var state=this.$store.state;
			var downScrollTop=document.body.scrollTop;
			var oEvent=ev || window.event;
			var list=this.$refs.list.querySelectorAll('.list');
			var obj=this.$refs.list.children[this.active];
			var mouseDown={
				x:oEvent.clientX+document.body.scrollLeft,
				y:oEvent.clientY+document.body.scrollTop
			}
			var disY=oEvent.clientY-obj.offsetTop;
			var placeholder=document.createElement('div');
			var moveY=oEvent.clientY;
			var directionTop;
			this.$refs.list.insertBefore(placeholder,obj);
			placeholder.style.height=Math.floor(obj.offsetHeight)+'px';
			[obj.style.position,obj.style.top,obj.style.zIndex]=['absolute',oEvent.clientY-disY+'px','123'];
			document.body.style.userSelect='none';
			var elementsFor=()=>{
	  			for(var i=0;i<list.length;i++){
	  				if(list[i]!=obj)
					if(i+1==this.active || i-1==this.active)
					if(i>this.active){
						if(!directionTop && list[i].offsetTop+list[i].offsetHeight/2<obj.offsetTop+obj.offsetHeight-obj.offsetParent.offsetTop){
							state.index.data.splice(this.active+2,0,state.index.data[this.active]);
							state.index.data.splice(this.active,1);
							elementsChange(i);
							directionTop=!directionTop;
							if(!isActive && i===state.index.active)
								state.index.active--;
						}
					}else{
						if(directionTop && list[i].offsetTop+list[i].offsetHeight/2>obj.offsetTop+obj.offsetHeight/2-obj.offsetParent.offsetTop){
							state.index.data.splice(this.active-1,0,state.index.data[this.active]);
							state.index.data.splice(this.active+1,1);
							elementsChange(i);
							if(!isActive && i===state.index.active)
								state.index.active++;
						}
					}
	  			}
			}
			var elementsChange=(i)=>{
				var nowStyle=obj.getAttribute('style');
				obj.removeAttribute('style');
				this.active=i;
				obj=list[i];
				obj.style=nowStyle;
				if(isActive)
					state.index.active=i;
				this.$refs.list.insertBefore(placeholder,obj);
			}
			window.onscroll=()=>{
				disY-=document.body.scrollTop-downScrollTop;
				directionTop=document.body.scrollTop<downScrollTop;
	  			obj.style.top=moveY-disY+'px';
	  			elementsFor();
				downScrollTop=document.body.scrollTop;
			}
			window.onmousemove=ev=>{
	  			var oEvent=ev || window.event;
	  			directionTop=moveY>oEvent.clientY;
	  			moveY=oEvent.clientY;
	  			obj.style.top=moveY-disY+'px';
	  			elementsFor();
			}
			window.onmouseup=ev=>{
	  			var oEvent=ev || window.event;
				obj.removeAttribute('style');
				this.$refs.list.removeChild(placeholder);
				document.body.style.userSelect='';
				window.onmousemove=window.onmouseup=window.onscroll=null;
				var mouseUp={
					x:oEvent.clientX+document.body.scrollLeft,
					y:oEvent.clientY+document.body.scrollTop
				}
				if(Math.abs(mouseDown.x-mouseUp.x)<3 && Math.abs(mouseDown.y-mouseUp.y)<3){
					state.index.active=this.active;
					state.sidebar.isHidden=false;
					state.sidebar.isRegion=false;
				}
				if(!state.sidebar.isHidden)
					state.sidebar.top=list[state.index.active].offsetTop;
				this.isMove=false;
			}
  		},
  		mouseenter(item,i){
  			if(!this.isMove)
  				this.active=i;
  		},
  		mouseleave(item,i){
  			if(!this.isMove)
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
		width:320px;
		/*position:relative;
		margin:0 auto;
		margin-top:20px;*/
		position:absolute;
		top:20px;
		left:calc(~'50% - 160px');
		
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
