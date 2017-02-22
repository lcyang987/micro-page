// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Vuex from 'vuex'
import actionsComponent from 'components/actions';
import originData from 'assets/originData.js';
import regionData from 'assets/regionData.js';
import data from 'assets/data.js';
//Vue.use(actionsComponent)
Vue.component('actionsComponent', actionsComponent)
Vue.use(Vuex)
Vue.use(MuseUI)
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
		}
	},
	mutations: {
		//  sidebarTop (state) {
		//    state.sidebar.top+=10
		//  },
		  showSidebar(state,opt){		  	
		  	state.index.active=opt.i;
		  	state.sidebar.isHidden=false;
		  	state.sidebar.top=opt.list.querySelector('[item="'+opt.i+'"]').offsetTop
		  	var eles=opt.list.children;		  
		  	for(var ii=0;ii<eles.length;ii++){
							if(ii!=eles[ii].getAttribute('item')){
					  			if(opt.ower.isMove===true){
					  				opt.ower.refreshData();
					  				opt.ower.isMove=false;
					  				return;
					  			}
					  		}
						}
		  }
	}

})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})