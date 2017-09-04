<template>
	<div class="goodsSidebar" v-if="result" >
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
				<mu-radio label="大图" nativeValue="big" v-model="result.attr.type" class="demo-radio" @change="change"/>
				<mu-radio label="小图" nativeValue="small" v-model="result.attr.type" class="demo-radio"/>
				<mu-radio label="1大2小" nativeValue="arrange12" v-model="result.attr.type" class="demo-radio" @change="change"/>
				<mu-radio label="列表" nativeValue="list" v-model="result.attr.type" class="demo-radio" @change="change"/>
			</p>
		</div>

		<div class="demo-tip-setting">
			<p>
				<mu-radio label="卡片" nativeValue="card" v-model="result.attr.style" class="demo-radio"/>
				<mu-radio label="瀑布" nativeValue="falls" v-model="result.attr.style" v-show="/^(small)$/.test(result.attr.type)" class="demo-radio"/>
				<mu-radio label="极简" nativeValue="easy" v-model="result.attr.style" @change="btnChange" class="demo-radio"/>
				<mu-radio label="促销" nativeValue="sale" v-model="result.attr.style" v-show="/^(small)$/.test(result.attr.type)" class="demo-radio"/>
			</p>
		</div>
		<div class="demo-tip-setting">
			<p v-show="(!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && (!/^(easy)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && !/^(list)$/.test(result.attr.type)">
				<mu-checkbox :label="result.attr.type === 'arrange12' && /^(easy)$/.test(result.attr.style) ? '显示商品名(小图不显示名称)' : '显示商品名'" v-model="result.attr.display.text" class="demo-checkbox"/>
			</p>
			<p v-show="/^(big)$/.test(result.attr.type) && /^(card)$/.test(result.attr.style)">
				<mu-checkbox label="显示简介" v-model="result.attr.display.info" class="demo-checkbox"/>
			</p>
			<!-- <p v-show="(!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)) && !/^(list)$/.test(result.attr.type)"> -->
			<p v-show="!/^(sale)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type)">
				<mu-checkbox label="显示价格" v-model="result.attr.display.price" class="demo-checkbox"/>
			</p>
		</div>
		<div class="demo-tip-setting" v-show="(((!/^(sale)$/.test(result.attr.style) && /^(small)$/.test(result.attr.type)) || (!/^(easy)$/.test(result.attr.style) && /^(big)$/.test(result.attr.type))) && (!/^(easy)$/.test(result.attr.style) || !/^(small)$/.test(result.attr.type))) || (!/^(easy)$/.test(result.attr.style) && /^(arrange12)$/.test(result.attr.type)) || /^(list)$/.test(result.attr.type)">
			<mu-checkbox label="显示购买按钮" v-model="result.attr.display.btn" class="demo-checkbox"/>
			<p v-show="result.attr.display.btn && !/^(sale)$/.test(result.attr.style)">
				<mu-radio label="样式1" nativeValue="1" v-model="result.attr.btn" class="demo-radio"/>
				<mu-radio label="样式2" nativeValue="2" v-model="result.attr.btn" class="demo-radio"/>
				<mu-radio label="样式3" nativeValue="3" v-model="result.attr.btn" v-show="(!/^(easy)$/.test(result.attr.style) && /^(list)$/.test(result.attr.type)) || !/^(list)$/.test(result.attr.type)" class="demo-radio"/>
				<mu-radio label="样式4" nativeValue="4" v-model="result.attr.btn" class="demo-radio"/>
			</p>
		</div>
	</div>
</template>
<script>
import urlParams from 'assets/urlParams'
import {mapActions} from 'vuex'
export default {
  name: 'goodsSidebar',
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
    change () {
      if (/falls|sale/.test(this.result.attr.style)) { this.result.attr.style = 'card' }
      setTimeout(() => {
        if (/^(easy)$/.test(this.result.attr.style) && /^(list)$/.test(this.result.attr.type)) { this.btnChange() }
      }, 0)
    },
    btnChange () {
      if (/^(3)$/.test(this.result.attr.btn) && /^(list)$/.test(this.result.attr.type)) { this.result.attr.btn = '1' }
    },
    click () {
      this.initSearchForm({
        url: 'micropage/queryProductPage.json',
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
        searchField: 'productName'
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
<style lang="less">
  .product{
    &.mu-chip.hover{
      background-color: #E0E0DF;
    }
    &.mu-chip.active{
      box-shadow: none;
    }
    &.mu-chip.hover .mu-chip-delete-icon{
      color: rgba(0, 0, 0, 0.26) !important;
    }
    .mu-avatar:nth-child(1){
      background-color: transparent !important;
      .productImg{
        border-radius:0;
      }
    }
  }
  .product-list{
    .item{
      display:inline-block;
      &.move {
        .mu-chip{
          animation:mymove 0.18s infinite;
          @keyframes mymove {
            0%  {transform:rotate(-3deg)}
            50% {transform:rotate(3deg)}
            100%{transform:rotate(-3deg)}
          }
        }
      }
    }
  }
</style>
