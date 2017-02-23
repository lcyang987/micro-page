<template>
<div>
  <!--<mu-raised-button :label="text" @click="open" style="width:100%" />-->
  <mu-dialog :open="$store.state.dialog.state" :title="$store.state.dialog.title" dialogClass="dialog" scrollable>
    <mu-menu>
      <mu-menu-item :title="'menu item ' + menu" v-for="menu in menus"/>
    </mu-menu>
  	<paginationComponent slot="actions"></paginationComponent>
    <mu-flat-button primary label="关闭" @click="close" slot="actions"/>
  </mu-dialog>
</div>
</template>

<script>
import paginationComponent from 'components/pagination';
export default {
	props:["text"],
	components:{
		paginationComponent
	},
  data () {
    const menus = []
    for (let i = 0; i < 30; i++) {
      menus.push(i + 1)
    }
    return {
      menus
    }
  },
  methods: {
    close () {
      this.$store.state.dialog.state=false;
    }
  }
}
</script>

<style lang="less">
	.dialog{
		max-width:900px;
	}
</style>