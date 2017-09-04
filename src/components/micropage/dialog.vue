<template>
<div>
  <mu-dialog :open="dialog.state" :title="dialog.title" dialogClass="dialog">
    <picTableComponent v-if="dialog.type === 'pic'"></picTableComponent>
    <tableComponent v-else></tableComponent>
  	<paginationComponent :search="dialog.search" slot="actions"></paginationComponent>
    <mu-flat-button primary label="关闭" @click="close" slot="actions"/>
  </mu-dialog>
</div>
</template>

<script>
import paginationComponent from 'micropage/pagination'
import picTableComponent from 'micropage/picTable'
import tableComponent from 'micropage/table'
import {mapGetters} from 'vuex'
export default {
  props: ['text'],
  computed: mapGetters([
    'dialog'
  ]),
  components: {
    paginationComponent,
    picTableComponent,
    tableComponent
  },
  destroyed () {
    this.dialog.search = {
      url: '',
      form: {},
      count: 0,
      destination: {}
    }
  },
  methods: {
    close () {
      clearTimeout(this.dialog.timer);
      [this.dialog.state, this.dialog.loading] = [false, false]
    }
  }
}
</script>

<style lang="less">
	.dialog{
    min-width:1000px;
    .gridlist-demo-container{
      max-height:640px;
    }
    position:relative;
	}
</style>
