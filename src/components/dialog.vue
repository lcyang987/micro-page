<template>
<div>
  <!--<mu-raised-button :label="text" @click="open" style="width:100%" />-->
  <mu-dialog :open="$store.state.dialog.state" :title="$store.state.dialog.title" dialogClass="dialog">
    <!--<mu-menu>
      <mu-menu-item :title="' [' + i + '] ' + list.text + ' , ' + list.time" v-for="(list,i) in $store.state.dialog.data"/>
    </mu-menu>-->
    <tableComponent></tableComponent>
  	<paginationComponent v-if="$store.state.dialog.state" slot="actions"></paginationComponent>
    <mu-flat-button primary label="关闭" @click="close" slot="actions"/>
  </mu-dialog>
</div>
</template>

<script>
import paginationComponent from 'components/pagination';
import tableComponent from 'components/table';
export default {
	props:["text"],
	components:{
		paginationComponent,
		tableComponent
	},
  methods: {
    close () {
    	let dialog=this.$store.state.dialog;
    	clearTimeout(dialog.timer);
 			[dialog.state,dialog.loading]=[false,false];
    }
  }
}
</script>

<style lang="less">
	.dialog{
		max-width:900px;
	}
</style>