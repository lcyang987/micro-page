<template>
	<div class="groupBuySidebar" v-if="result" >
    <div class="demo-tip-setting">
      <p>
        编辑模式：
      </p>
      <p>
        <mu-radio label="删除及查看" nativeValue="edit" v-model="result.attr.mode" class="demo-radio"/>
        <mu-radio label="调换位置" nativeValue="move" v-model="result.attr.mode" class="demo-radio"/>
      </p>
    </div>
		<div v-if="result.attr.list">
      <div ref="items" class="product-list" style="display:inline">
        <div v-for="item,i in result.attr.list" @mousedown="mousedown(i)" class="item" :class="{move:result.attr.mode === 'move'}">
    			<mu-chip @delete="remove(i)" class="product" showDelete v-if="item.img" @click="open(item.url)" :disabled="result.attr.mode === 'move'">
			      <mu-avatar imgClass="productImg" ref="productImg" :size="40" :src="item.img"/>
            <mu-avatar style="margin-left:6px;margin-right:-6px" v-show="result.attr.mode === 'move'" :size="20" icon="swap_horiz"/>
    			</mu-chip>
        </div>
      </div>
			<mu-float-button icon="add" mini class="demo-float-button" @click="click"/>
		</div>
		<div class="demo-tip-setting">
			<p>
				列表样式：
			</p>
			<p>
				<mu-checkbox label="顶部留白" v-model="result.attr.topWhite" class="demo-checkbox"/>
      </p>
			<p>
				<mu-radio label="大图" nativeValue="big" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="小图" nativeValue="small" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="列表" nativeValue="list" v-model="result.attr.type" class="demo-radio"/>
				<!-- <mu-radio label="横向" nativeValue="scroll" v-model="result.attr.type" class="demo-radio"/> -->
			</p>
		</div>
	</div>
</template>
<script>
import urlParams from 'assets/urlParams'
import {mapActions} from 'vuex'
export default {
  name: 'groupBuySidebar',
  props: ['result', 'active'],
  methods: {
    ...mapActions([
      'initSearchForm',
      'micropageAjax',
      'goodsDragDrop'
    ]),
    remove (i) {
      this.result.attr.list.splice(i, 1)
    },
    click () {
      this.initSearchForm({
        url: 'micropage/queryActivityPage.json',
        count: 0,
        form: {
          shopAlias: urlParams.businessNo,
          status: 'UP',
          pageSize: 10,
          currentPage: 1
        },
        destination: {
          name: 'list',
          num: -1
        },
        searchField: 'activityName'
      })
    },
    mousedown (i) {
      if (this.result.attr.mode !== 'move') {
        return false
      }
      this.goodsDragDrop({
        oEvent: event,
        items: this.$refs.items,
        obj: this.$refs.items.children[i],
        data: this.result.attr.list,
        active: i
      })
    },
    open (url) {
      window.open(url)
    },
    setProductImg () {
      for (var i = 0; i < this.$refs.productImg.length; i++) {
        this.$refs.productImg[i].$el.querySelector('img').setAttribute('draggable', false)
      }
    }
  },
  mounted () {
    if (this.result.attr.list.length) {
      this.setProductImg()
    }
  },
  watch: {
    'result.attr.list' () {
      setTimeout(() => {
        this.setProductImg()
      }, 0)
    }
  }
}
</script>
