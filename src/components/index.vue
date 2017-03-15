<template>
	<div class="design">
		<section ref="item" class="dataList">
			<template v-for="(item,i) in $store.state.index.data" v-if="$store.state.index.state">
				<div class="item" :index="i" @mousedown="mousedown" @mouseenter="mouseenter(item,i)" @mouseleave="mouseleave" :class="{active:i===active}" :active="$store.state.index.active===i">
					<component :is="item.type+'Component'" :result="item"></component>
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
  			const arr=_.cloneDeep(this.$store.state.index.data);
  			for(let i of arr){
  				delete i.originData;
  			}
//			console.log(JSON.stringify(arr));
			console.log(this.$store.state.index.data)
//			console.log(JSON.stringify(this.$store.state.dialog))
  		},
  		mousedown(ev){
  			this.isMove=true;
  			var isActive;
  			if(this.$store.state.index.active==this.active)
  				isActive=true;
			var state=this.$store.state;
			var downScrollTop=document.body.scrollTop;
			var oEvent=ev || window.event;
			var item=this.$refs.item.querySelectorAll('.item');
			var obj=this.$refs.item.children[this.active];
			var mouseDown={
				x:oEvent.clientX+document.body.scrollLeft,
				y:oEvent.clientY+document.body.scrollTop
			}
			var disY=oEvent.clientY-obj.offsetTop;
			var placeholder=document.createElement('div');
			var moveY=oEvent.clientY;
			var directionTop;
			this.$refs.item.insertBefore(placeholder,obj);
			placeholder.style.height=Math.floor(obj.offsetHeight)+'px';
			[obj.style.position,obj.style.top,obj.style.zIndex]=['absolute',oEvent.clientY-disY+'px','123'];
			document.body.style.userSelect='none';
			var elementsFor=()=>{
	  			for(var i=0;i<item.length;i++){
	  				if(item[i]!=obj)
					if(i+1==this.active || i-1==this.active)
					if(i>this.active){
						if(!directionTop && item[i].offsetTop+item[i].offsetHeight/2<obj.offsetTop+obj.offsetHeight){
							state.index.data.splice(this.active+2,0,state.index.data[this.active]);
							state.index.data.splice(this.active,1);
							elementsChange(i);
							directionTop=!directionTop;
							if(!isActive && i===state.index.active)
								state.index.active--;
						}
					}else{
						if(directionTop && item[i].offsetTop+item[i].offsetHeight/2>obj.offsetTop){
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
				obj=item[i];
				obj.style=nowStyle;
				if(isActive)
					state.index.active=i;
				this.$refs.item.insertBefore(placeholder,obj);
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
				this.$refs.item.removeChild(placeholder);
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
					state.sidebar.top=item[state.index.active].offsetTop;
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
<style lang="less" scoped>
	.design{
		box-shadow: 0 0 0 1px #c5c5c5;
		&:before{
			content:'';
			display:block;
			width:320px;
			height:64px;
			background: url(~assets/images/titlebar.png);			
		}
		top:20px;
	}
</style>
<style lang="less">
	.design{
		/*width:320px;*/
		width:3.2rem;
		/*left:calc(~'50% - 160px');*/
		left:calc(~'50% - 1.6rem');
		position:absolute;
		.dataList{
		    padding-bottom: 11px;
		    min-height: 200px;
			box-shadow:0 1px 0 1px #c5c5c5;
			position:relative;
			&:before{
				content:'';
				border:8px solid transparent;
				border-bottom-color:#c5c5c5;
				position:absolute;
				bottom:0;
				left:calc(~'50% - 8px');
			}
			&:after{
				content:'';
				border:6px solid transparent;
				border-bottom-color:white;
				position:absolute;
				bottom:-2px;
				left:calc(~'50% - 6px');
			}
		}
		section{
			width:100%;
		}
		.item{
			width:100%;
			position:relative;
			background:white;
		}
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
			    position: absolute;
			    z-index:998;
			    left: 0;
			    top: 0;
			}
		}
	}
</style>
