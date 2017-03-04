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
//Vue.use(actionsComponent)
import actionsComponent from 'components/actions';
Vue.component('actionsComponent', actionsComponent)
import dialogComponent from 'components/dialog';
Vue.component('dialogComponent', dialogComponent)
import dropdownComponent from 'components/dropdown';
Vue.component('dropdownComponent', dropdownComponent)
import bottomSheetComponent from 'components/bottomSheet';
Vue.component('bottomSheetComponent', bottomSheetComponent)
Vue.use(Vuex)
Vue.use(MuseUI)
import VueResource from 'vue-resource';

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
			isDelete:false
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