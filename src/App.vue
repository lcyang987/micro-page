<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
	margin:0;
}
img{
	display:block;
}
/*body, html {
    overflow-x: initial !important;
    overflow-y: initial !important;
    
}
*, :after, :before {
    box-sizing: initial !important;
}*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.demo-tip-setting p{
  display: flex;
  align-items: center;
  white-space:nowrap;
}
.demo-tip-setting .mu-radio {
  margin-left: 32px;
}
.demo-tip-setting .mu-radio:first-child{
  margin-left: 0;
}
.demo-tip-setting .mu-switch {
  margin-left: 8px;
}
</style>
