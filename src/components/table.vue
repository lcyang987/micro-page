<template>
<div style="position:relative;">
	<mu-circular-progress :size="90" color="red" style="position:absolute;top:50%;left:50%;margin:-45px 0 0 -45px;box-sizing: border-box;" />
  <mu-table :fixedFooter="fixedFooter" :fixedHeader="fixedHeader" :height="height"
    :enableSelectAll="enableSelectAll" :multiSelectable="multiSelectable"
    :selectable="selectable" :showCheckbox="showCheckbox">
    <mu-thead slot="header">
      <mu-tr>
        <mu-th tooltip="序号">序号</mu-th>
        <mu-th tooltip="文本名称">名称</mu-th>
        <mu-th tooltip="创建时间">时间</mu-th>
        <mu-th tooltip="操作按钮">操作</mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr v-for="item,index in $store.state.dialog.data" :selected="item.selected">
        <mu-td>{{index + 1}}</mu-td>
        <mu-td>{{item.text}}</mu-td>
        <mu-td>{{item.time}}</mu-td>
        <mu-td><mu-raised-button label="选取" class="demo-raised-button" primary  @click="click({id:item.id,text:item.text})"/></mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      fixedHeader: true,
      fixedFooter:true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: false,
      showCheckbox: false,
      height:document.documentElement.clientHeight/2+'px',
    }
 },
 methods:{
 	click(opt){
 		console.log(opt)
 		setTimeout(()=>{
 			this.$store.state.dialog.state=false;
 			this.$store.state.dialog.loading=false;
 		},300);
 	}
 }
}
</script>

<style lang="css">
.demo-table-settings{
  width: 200px;
  overflow: hidden;
  margin: 20px auto 0px;
}
</style>