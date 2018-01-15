<template>
<!-- <div style="position:relative;" :style="{height:height}" > -->
<div style="position:relative;" >
  <mu-text-field hintText="根据名称搜索" fullWidth v-model="name" @input="input" style="margin:8px 16px 0 0"/>
	<mu-circular-progress v-show="!dialog.loading" :size="90" color="red" style="position:absolute;top:50%;left:50%;margin:-45px 0 0 -45px;" />
  	<mu-table v-show="dialog.loading" :fixedHeader="fixedHeader" :showCheckbox="showCheckbox" :height="height">
    <mu-thead slot="header" style="text-align:center;">
      <mu-tr>
        <mu-th tooltip="序号" width="60" style="padding:0 15px">序号</mu-th>
        <mu-th tooltip="文本名称">名称</mu-th>
        <mu-th tooltip="价格" v-if="dialog.data && dialog.data[0] && dialog.data[0].price">价格</mu-th>
        <mu-th tooltip="库存" v-if="dialog.data && dialog.data[0] && dialog.data[0].totalStock">库存</mu-th>
        <mu-th tooltip="图片" v-if="dialog.data && dialog.data[0] && dialog.data[0].img">图片</mu-th>
        <mu-th tooltip="创建时间" v-if="dialog.data && dialog.data[0] && dialog.data[0].time">创建时间</mu-th>
        <mu-th tooltip="操作按钮" style="width:170px;text-align:center">操作</mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <div v-if="!dialog.data.length" style="padding:10px 0;">数据为空</div>
      <template v-for="item,i in dialog.data">
        <mu-tr :selected="item.selected" class="tableTr">
          <mu-td width="60">{{i + 1 + dialog.search.form.pageSize * (dialog.search.form.currentPage - 1)}}</mu-td>
          <mu-td>
            <a v-if="item.url" :href="item.url" target="_blank">{{item.text}}</a>
            <b v-else>{{item.text}}</b>
          </mu-td>
          <mu-td v-if="item.price">￥{{item.price}}</mu-td>
          <mu-td v-if="item.totalStock">{{item.totalStock}}</mu-td>
          <mu-td v-if="item.img"><img width="120" height="120" :src="item.img + '/w/640/h/640'"/></mu-td>
          <mu-td v-if="item.time">{{item.time || '暂无'}}</mu-td>
          <mu-td style="width:170px;text-align:right"><mu-raised-button label="选取" class="demo-raised-button" primary @click="click(item)"/></mu-td>
        </mu-tr>
      </template>
    </mu-tbody>
  </mu-table>
</div>
</template>

<script>
import _ from 'lodash'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      fixedHeader: true,
      showCheckbox: false,
      height: document.documentElement.clientHeight / 1.6 + 'px',
      name: ''
    }
  },
  computed: mapGetters([
    'index',
    'dialog'
  ]),
  methods: {
    ...mapActions([
      'micropageAjax',
      'closeDialog'
    ]),
    input (val) {
      this.isInput = true
      clearTimeout(this.inputTimer)
      this.inputTimer = setTimeout(() => {
        this.isInput = false
        this.micropageAjax({
          [this.dialog.searchField]: this.name,
          currentPage: 1
        })
      }, 1000)
    },
    click (item) {
      var destination = this.index.data[this.index.active].attr
      this.dialog.destination.name.split('.').map(a => { destination = destination[a] })
      // console.log(destination, item, 123)
      let num
      if (this.dialog.destination.num === -1) {
        destination.push(_.cloneDeep(this.index.data[this.index.active].originData))
        num = destination.length - 1
      } else if (this.dialog.destination.num > -1) {
        num = this.dialog.destination.num
      }
      if ((num === 0 || num) && this.dialog.destination.attr) {
        for (let i in destination[num][this.dialog.destination.attr]) {
          if (item[i] || item[i] === 0) { destination[num][this.dialog.destination.attr][i] = item[i] }
        }
      } else if (num === 0 || num) {
        for (let i in destination[num]) {
          if (item[i] || item[i] === 0) { destination[num][i] = item[i] }
        }
      } else {
        for (let i in destination) {
          if (item[i] || item[i] === 0) { destination[i] = item[i] }
        }
      }
      setTimeout(() => {
        this.closeDialog()
      }, 200)
    }
  }
}
</script>

<style lang="css" scoped>
.demo-table-settings{
  width: 200px;
  overflow: hidden;
  margin: 20px auto 0px;
}
</style>
<style>
.tableTr td{
  white-space:normal;
}
</style>
