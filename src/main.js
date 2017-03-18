// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Vuex from 'vuex'
import originData from 'assets/originData.js';
import regionData from 'assets/regionData.js';
import data from 'assets/data.js';
import actionsComponent from 'components/actions';
Vue.component('actionsComponent', actionsComponent)
import dialogComponent from 'components/dialog';
Vue.component('dialogComponent', dialogComponent)
import bottomSheetComponent from 'components/bottomSheet';
Vue.component('bottomSheetComponent', bottomSheetComponent)
Vue.use(Vuex)
Vue.use(MuseUI)
import VueResource from 'vue-resource';
Vue.directive('inputValidator', {
  inserted: function (el,binding) {
    if(vue.$store.state.index.validateSuccess){
  	let json=binding.value;
  	if((json.require&&!json.value) || (json.validator&&json.value&&((json.validator.min && json.value.length<json.validator.min) || (json.validator.max && json.value.length>json.validator.max)))){
		el.querySelectorAll('textarea')[1].focus();
		vue.$store.state.index.validateSuccess=false;
	}
   }
  }
})
Vue.directive('listInputValidator', {
  inserted: function (el,binding) {
    if(vue.$store.state.index.validateSuccess){
  	let json=binding.value;
  	if((json.require&&!json.value) || (json.validator&&json.value&&((json.validator.min && json.value.length<json.validator.min) || (json.validator.max && json.value.length>json.validator.max)))){
		el.querySelector('input').focus();
		vue.$store.state.index.validateSuccess=false;
	}
   }
  }
})
Vue.directive('linkValidator', {
  inserted: function (el,binding) {
  	let json=binding.value;
    if(vue.$store.state.index.validateSuccess){
	  	for(var item in json.value){
	  		if(!json.value[item]){
				el.querySelector('button').style.boxShadow='0 0 7px red';
				el.querySelector('button').addEventListener('mouseover',function(){
					this.style.boxShadow='';
				},false);
				vue.$store.state.index.validateSuccess=false;
			}
	  	}
  	}
  }
})
Vue.directive('imgValidator', {
  inserted: function (el,binding) {
  	let json=binding.value;
    if(vue.$store.state.index.validateSuccess){
  		if(!json.value){
			el.style.boxShadow='0 0 7px red';
			el.addEventListener('mouseover',function(){
				this.style.boxShadow='';
			},false);
			vue.$store.state.index.validateSuccess=false;
		}
  	}
  }
})

//开启debug模式
Vue.config.debug = true;
Vue.use(VueResource);
// ..

const store = new Vuex.Store({
	state: {
		sidebar: {
			top: 0,
			isHidden: true,
			isRegion: false
		},
		index: {
			data,
			active: null,
			state: true,
			notEdit:false,
			isDelete:false,
			validateSuccess:false
		},
		region: {
			regionData,
			originData,
			active: null
		},
		dialog:{
			state:false,
			timer:null,
			loading:false,
			title:null,
			data:null,
			link:null
		}
	},
	actions:{
		ajax(vuex,opt){
			vuex.commit('vueResource',opt)
		}
	},
	mutations: {
		dragDrop(state,opt){
			var downScrollTop=document.body.scrollTop;
			var item=opt.items.querySelectorAll(".item");
			var mouseDown={
				x:opt.oEvent.clientX+document.body.scrollLeft,
				y:opt.oEvent.clientY+document.body.scrollTop
			}
			var disY=opt.oEvent.clientY-opt.obj.offsetTop;
			var placeholder=document.createElement('div');
			var moveY=opt.oEvent.clientY;
			var directionTop;
			opt.items.insertBefore(placeholder,opt.obj);
			placeholder.style.height=Math.floor(opt.obj.offsetHeight)+'px';
			[opt.obj.style.position,opt.obj.style.top,opt.obj.style.zIndex]=['absolute',opt.oEvent.clientY-disY+'px','123'];
			document.body.style.userSelect='none';
			var elementsFor=()=>{
	  			for(var i=0;i<item.length;i++){
	  				if(item[i]!=opt.obj)
					if(i+1==opt.active || i-1==opt.active)
					if(i>opt.active){
						if(!directionTop && item[i].offsetTop+item[i].offsetHeight/2<opt.obj.offsetTop+opt.obj.offsetHeight){
							opt.data.splice(opt.active+2,0,opt.data[opt.active]);
							opt.data.splice(opt.active,1);
							elementsChange(i);
							directionTop=!directionTop;
						}
					}else{
						if(directionTop && item[i].offsetTop+item[i].offsetHeight/2>opt.obj.offsetTop){
							opt.data.splice(opt.active-1,0,opt.data[opt.active]);
							opt.data.splice(opt.active+1,1);
							elementsChange(i);
						}
					}
	  			}
			}
			var elementsChange=(i)=>{
				var nowStyle=opt.obj.getAttribute('style');
				opt.obj.removeAttribute('style');
				opt.active=i;
				opt.obj=item[i];
				opt.obj.style=nowStyle;
				opt.items.insertBefore(placeholder,opt.obj);
			}
			window.onscroll=()=>{
				disY-=document.body.scrollTop-downScrollTop;
				directionTop=document.body.scrollTop<downScrollTop;
	  			opt.obj.style.top=moveY-disY+'px';
	  			elementsFor();
				downScrollTop=document.body.scrollTop;
	  			return false;
			}
			window.onmousemove=ev=>{
	  			directionTop=moveY>event.clientY;
	  			moveY=event.clientY;
	  			opt.obj.style.top=moveY-disY+'px';
	  			elementsFor();
				var mouseMove={
					y:event.clientY+document.body.scrollTop
				}
				if(Math.abs(mouseDown.y-mouseMove.y)>5)
	  				return false;
			}
			window.onmouseup=ev=>{
				opt.obj.removeAttribute('style');
				opt.items.removeChild(placeholder);
				document.body.style.userSelect='';
				window.onmousemove=window.onmouseup=window.onscroll=null;
			}
		},
		vueResource(state,opt){
	    	vue.$http[opt.method](opt.url,{params:opt.data,emulateJSON:true}).then(
	    		function(response){
	    			if(response.data.success){
	    				var data=response.data.data;
	    				var dialog=vue.$store.state.dialog;
	    				dialog.state=true;
	    				dialog.title=data.title;
	    				dialog.data=data.list;
	    				dialog.timer=setTimeout(()=>{
	    					dialog.loading=true;
	    				},500);
	    			}else{
	    				
	    			}
	    		},
	    		function(response){
	    			
	    		}
	    	);
		}
	}
})
/* eslint-disable no-new */
const vue=new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})