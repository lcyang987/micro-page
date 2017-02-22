<template>
	<div class="design">
		<section ref="list">
			<template v-for="(item,i) in $store.state.index.data" v-if="state">
				<div @click="click(item,i)" :item="i" @mousedown="mousedown(item,i)" >
					<component :is="item.type+'Component'" data="$store.state.index.data" :item="i" :result="item" :index="i"></component>
				</div>
			</template>
		</section>
		<regionComponent :data="$store.state.index.data"></regionComponent>
		<sidebarComponent :data="$store.state.index.data" v-if="$store.state.index.active !== null" ref="sidebar" :result="data[$store.state.index.active]" :active="$store.state.index.active"></sidebarComponent>
		<div v-on:click="returnData" style="text-align:center">return data</div>
	</div>
</template>
<script>
import DragDrop from 'assets/js/dragDrop.js';
//import data from 'assets/data.js';
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
  	data () {
  	  	return {
  	  		data:this.$store.state.index.data,
  	  		active:this.$store.state.index.active,
  	  		state:this.$store.state.index.state,
  	  		isMove:false
  	  	}
  	},
  	methods:{
  		returnData(){
  			console.log(this.data)
  		},
  		setMove(opt){
			setTimeout(()=>{
				this.dragDrop=new DragDrop({
					eles:this.$refs.list.children
				})
			},1)
  		},
  		mousedown(item,i){
  			var obj=this.$refs.list.querySelector('[item="'+i+'"]');
  			obj.onmousemove=ev=>{
  				this.mousemove();
  			}
  			obj.onmouseup=ev=>{
  				obj.onmousemove=obj.onmouseup=null;
  			}
  		},
  		mousemove(){
//			console.log(this.isMove,'move')
  			this.isMove=true;
  		},
  		click(item,i){
			this.$store.commit('showSidebar',{					
					list:this.$refs.list,
					i:i,
					ower:this
				});
//			this.$store.state.index.active=i;
//			setTimeout(()=>{	
//              this.$store.state.sidebar.isHidden=false;
//				this.$store.state.sidebar.top=this.$refs.list.querySelector('[item="'+i+'"]').offsetTop;
//				var eles=this.$refs.list.children;
//				for(var ii=0;ii<eles.length;ii++){
//					if(ii!=eles[ii].getAttribute('item')){
//			  			if(this.isMove===true){
//			  				this.refreshData();
//			  				this.isMove=false;
//			  				return;
//			  			}
//			  		}
//				}
//			},0);
			
  		},
  		setActive(index){
  			if(!this.$refs.list)
  				return;
  			if(this.$refs.list.querySelector('[active="true"]'))
  				this.$refs.list.querySelector('[active="true"]').removeAttribute('active');
			this.$refs.list.children[index].setAttribute('active',true);
			DragDrop.prototype.actionHeight(this.$refs.list.children[index],this.$refs.list.children[index].querySelector('.actions'))					
			this.active=index;
  		},
  		refreshData(isTrue){
  			if(!this.$refs.list.querySelector('[active="true"]')){
				this.setMove();
				if(!this.isDelete)
  					return;
  			}
  			var active=this.$refs.list.querySelector('[active="true"]');
  			var eles=this.$refs.list.children;
  			for(var i=0;i<eles.length;i++){
  				eles[i].setAttribute('index',i);
  			}
  			if(this.isDelete){
  				if(active)
  					active.removeAttribute('active');
  			}else{
  				if(active){
		  			var item=active.getAttribute('item');
		  			var index=active.getAttribute('index');
		  		}
				this.$refs.list.style.height=this.$refs.list.offsetHeight+'px';
				var result=_.cloneDeep(this.data[item]);
				this.data.splice(item,1)
				this.data.splice(index,0,result);
				this.state=false;
  			}
			setTimeout(()=>{
				this.state=true;
				setTimeout(()=>{
					this.setMove();
					this.$refs.list.style.height='';
					if(!this.isDelete)
						this.setActive(index);
					else
						this.isDelete=false
				},0);
			},0);
  		}
	},
	watch:{
		data(){
			if(this.state)
				this.refreshData();
		}
	},
 	mounted(){
 		this.setMove();
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '~assets/css/dragDrop.css'
</style>
<style lang="less" scoped>
	.design{
		/*section{
			box-sizing:initial;			
		}*/
		/*box-sizing:initial;*/		
		position:relative;
		width:320px;
		margin:0 auto;
		margin-top:20px;
		box-shadow: 0 0 0 1px #c5c5c5;
		section{
			width:320px;
		}
	}
</style>
