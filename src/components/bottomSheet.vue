<template>
<div>
  <mu-raised-button @click="openBottomSheet" :label="link.id?'修改':'设置链接到页面的地址'" :style="{width:width}" />
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet">
      <mu-sub-header>
        	请选择一个
      </mu-sub-header>
      <template v-for="item,i in data">
	      <mu-list-item :title="item.title" @click="click(item)"/>
      </template>
    </mu-list>
  </mu-bottom-sheet>
</div>
</template>

<script>
export default {
	props:["link","width"],
  data () {
    return {
    	data:[{
    		id:1,
    		title:'阴阳师'
    	},{
    		id:2,
    		title:'贪吃蛇大作战'
    	},{
    		id:3,
    		title:'一划到底'
    	},{
    		id:4,
    		title:'全民斗地主'
    	}],
      bottomSheet: false
    }
  },
  methods: {
  	click(item){
//		console.log(item)
  		console.log(this.link)
  		this.$store.state.dialog.link=this.link;
    	if(!item.id)
    		return;
    	var _this=this;
    	this.$http.get('json.txt',{a:1,b:2},{emulateJSON:true}).then(
    		function(response){
    			if(response.data.success){
    				var data=response.data.data;
    				_this.$store.state.dialog.state=true;
    				_this.$store.state.dialog.title=data.title;
    				_this.$store.state.dialog.data=data.list;
    				_this.$store.state.dialog.timer=setTimeout(()=>{
    					_this.$store.state.dialog.loading=true;
    				},500);
    			}else{
    				
    			}
    		},
    		function(response){
    			
    		}
    	);
  	},
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    }
  }
}
</script>