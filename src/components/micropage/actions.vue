<template>
	<div ref="actions" class="actions">
    <div class="modal"></div>
    <el-popover
      ref="popover"
      placement="top"
      width="150"
      v-model="popoverShow">
      <p>确定要删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="popoverClose()">取消</el-button>
        <el-button type="primary" size="mini" @click="popoverConfirm()">确定</el-button>
      </div>
    </el-popover>
    <ul>
      <li>编辑</li>
      <li v-on:click="addClick" v-on:mousedown.stop>加内容</li>
      <li v-popover:popover v-on:mousedown.stop>删除</li>
    </ul>
    <!-- <el-button v-popover:popover5>删除</el-button> -->
    <!-- <ul>
      <li>编辑</li>
      <li v-on:click="addClick" v-on:mousedown.stop>加内容</li>
      <li v-on:click="open" v-on:mousedown.stop>删除</li>
    </ul>
    <mu-dialog :open="dialog" title="提示" @close="close">
    	是否确定删除？
      <mu-flat-button slot="actions" primary @click="confirm" label="确定"/>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    </mu-dialog> -->
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'actions',
  props: ['result'],
  data () {
    return {
      // dialog: false,
      popoverShow: false
    }
  },
  computed: mapGetters([
    'index',
    'sidebar'
  ]),
  methods: {
    addClick () {
      let active = parseInt(this.$refs.actions.parentNode.parentNode.getAttribute('index'));
      [this.sidebar.isHidden, this.sidebar.isRegion, this.index.active, this.sidebar.top] = [false, true, active, this.$refs.actions.parentNode.parentNode.offsetTop]
    },
    // open () {
    //   this.dialog = true
    // },
    // close () {
    //   this.dialog = false
    // },
    confirm () {
      let active = parseInt(this.$refs.actions.parentNode.parentNode.getAttribute('index'))
      this.index.data.splice(active, 1);
      [this.sidebar.isHidden, this.index.isDelete, this.index.active, this.dialog] = [true, true, null, false]
    },
    popoverConfirm () {
      this.confirm()
      this.popoverClose()
    },
    popoverClose () {
      this.popoverShow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '~assets/micropage/css/dragDrop.css'
</style>
<style lang="less" scoped>
	.actions{
		width:100%;
		height:100%;
		ul{
			position: absolute;
	    bottom: 0;
	    right: 0;
			margin:0;
			padding:0;
			z-index:18;
			li{
				list-style: none;
				float:left;
			    background-color: rgba(0,0,0,0.3);
			    color: #fff;
			    padding: 0 5px;
			    margin-left: 1px;
			    font-size: 12px;
			    &:hover{
			    	color: #ddd;
    				cursor: pointer;
			    }
			}
		}
	}
</style>
