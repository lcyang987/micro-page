<template>
	<div class="design">
		<section ref="list">
			<template v-for="(item,i) in $store.state.index.data" v-if="$store.state.index.state">
				<div @click="click(item,i)" :item="i" @mousedown="mousedown(item,i)" >
					<component :is="item.type+'Component'" data="$store.state.index.data" :item="i" :result="item" :index="i"></component>
				</div>
			</template>
		</section>
		<regionComponent :data="$store.state.index.data"></regionComponent>
		<sidebarComponent :data="$store.state.index.data" v-if="$store.state.index.active !== null" ref="sidebar" :result="$store.state.index.data[$store.state.index.active]" :active="$store.state.index.active"></sidebarComponent>
		<div v-on:click="returnData" style="text-align:center">return data</div>
	</div>
</template>
<script>
import DragDrop from 'assets/js/dragDrop.js';
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
  	methods:{
  		returnData(){
  			console.log(this.$store.state.index.data)
  		},
  		setMove(opt){
			setTimeout(()=>{
				new DragDrop({
					eles:this.$refs.list.children
				})
			},0)
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
  			this.$store.state.index.isMove=true;
  		},
  		click(item,i){
  			setTimeout(()=>{
				this.$store.commit('showSidebar',{
						list:this.$refs.list,
						i:i,
						ower:this
					});
  			},0);
			var result=_.cloneDeep(this.$store.state.index.data[i]);
			this.$store.state.index.data.splice(i,1)
			this.$store.state.index.data.splice(i,0,result);
			this.setMove();
			setTimeout(()=>{
				this.$store.state.index.active=this.$refs.list.querySelector('[item="'+i+'"]').getAttribute('index');
				console.log(this.$store.state.index.active)
			},0);
  		}
	},
	watch:{
		'$store.state.index.data'(){
 			this.setMove(); 			
		},
		'$store.state.index.active'(){
  			setTimeout(()=>{
				if(this.$refs.list.querySelector('[active="true"]'))
					this.$refs.list.querySelector('[active="true"]').removeAttribute('active');
				this.$refs.list.querySelector('[index="'+this.$store.state.index.active+'"]').setAttribute('active',true);
//	  			setTimeout(()=>{
//					this.$store.commit('showSidebar',{
//							list:this.$refs.list,
//							i:this.$store.state.index.active,
//							ower:this
//						});
//	  			},0);
  			},0);
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
