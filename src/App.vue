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
body, html {
    overflow-x: initial !important;
    overflow-y: initial !important;
    
}
*, :after, :before {
    box-sizing: initial !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
