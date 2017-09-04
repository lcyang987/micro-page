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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app, .home, body, html {
    width: 100%;
    height: 100%;
    overflow:hidden;
}
<style lang="less">
body{
	background-color:white !important;
	margin:0;
	a{
		color:black;
	}
	ul,li{
		margin:0;
		padding:0;
		list-style: none;
	}
}
img{
	display:block;
}
</style>
