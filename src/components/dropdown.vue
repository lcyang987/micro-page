<template>
<div>
  <mu-dropDown-menu value="" @change="handleChange" autoWidth>
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
    	this.$store.state.dialog.state=true;
    	this.$store.state.dialog.title=value;
    }
  }
}
</script>