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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
<style>
	html{
		font-size: calc(100vw/3.2) !important;
	}
</style>