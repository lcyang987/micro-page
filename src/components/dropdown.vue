<template>
<div>
  <mu-dropDown-menu value="" @change="handleChange" style="width:100%">
    <mu-menu-item value="" title="请选择"/>
    <mu-menu-item value="1" title="星期一"/>
    <mu-menu-item value="2" title="星期二"/>
    <mu-menu-item value="3" title="星期三"/>
    <mu-menu-item value="4" title="星期四"/>
    <mu-menu-item value="5" title="星期五"/>
    <mu-menu-item value="6" title="星期六"/>
    <mu-menu-item value="7" title="星期日"/>
  </mu-dropDown-menu>
  
</div>
</template>

<script>
export default {
  methods: {
    handleChange (value) {
    	if(!value)
    		return;
    	var _this=this;
    	this.$http.get('json.txt',{a:1,b:2},{emulateJSON:true}).then(
    		function(response){
    			if(response.data.success){
    				var data=response.data.data;
    				_this.$store.state.dialog.state=true;
    				_this.$store.state.dialog.title=data.title;
    				_this.$store.state.dialog.data=data.list;
    				setTimeout(()=>{
    					_this.$store.state.dialog.loading=true;
    				},3000);
    			}else{
    				
    			}
    		},
    		function(response){
    			
    		}
    	);
    }
  }
}
</script>