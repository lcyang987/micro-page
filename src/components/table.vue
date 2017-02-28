<template>
<div style="position:relative;" :style="{height:height}" >
	<mu-circular-progress v-show="!this.$store.state.dialog.loading" :size="90" color="red" style="position:absolute;top:50%;left:50%;margin:-45px 0 0 -45px;" />
  	<mu-table v-show="this.$store.state.dialog.loading" :fixedHeader="fixedHeader" :showCheckbox="showCheckbox" :height="height">
    <mu-thead slot="header" style="text-align:center;">
      <mu-tr>
        <mu-th tooltip="序号">序号</mu-th>
        <mu-th tooltip="图片" v-if="$store.state.dialog.data && $store.state.dialog.data[0] && $store.state.dialog.data[0].img">图片</mu-th>
        <mu-th tooltip="文本名称" v-else>名称</mu-th>
        <mu-th tooltip="创建时间">时间</mu-th>
        <mu-th tooltip="操作按钮">操作</mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr v-for="item,index in $store.state.dialog.data" :selected="item.selected">
        <mu-td>{{index + 1}}</mu-td>
        <mu-td v-if="item.img"><img width="120" height="120" :src="item.img"/></mu-td>
        <mu-td v-else>{{item.text}}</mu-td>
        <mu-td>{{item.time}}</mu-td>
        <mu-td><mu-raised-button label="选取" class="demo-raised-button" primary  @click="click(item)"/></mu-td>
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
      showCheckbox: false,
      height:document.documentElement.clientHeight/2+'px',
    }
 },
 methods:{
 	click(item){
// 		console.log(item)
// 		console.log(this.$store.state.dialog.link);
 		for(var i in this.$store.state.dialog.link){
 			if(item[i])
 				this.$store.state.dialog.link[i]=item[i];
 		}
 		setTimeout(()=>{
 			this.$store.state.dialog.state=false;
			this.$store.state.dialog.loading=false;
 		},200);
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