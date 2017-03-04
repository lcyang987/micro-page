<template>
<div>
  <mu-raised-button @click="openBottomSheet" :label="link.id?'修改':'设置链接地址'" :style="{width:width}" />
  <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
    <mu-list @itemClick="closeBottomSheet">
      <mu-sub-header>
        	请选择一个
      </mu-sub-header>
      <template v-for="item,i in data">
	      <mu-list-item :title="item.title" @click="click(item)"/>
      </template>
    </mu-list>
  </mu-bottom-sheet>
</div>
</template>

<script>
export default {
	props:["link","width"],
  data () {
    return {
    	data:[{
    		id:1,
    		title:'阴阳师',
    		url:'textNav.txt'
    	},{
    		id:2,
    		title:'贪吃蛇大作战',
    		url:'textNav.txt'
    	},{
    		id:3,
    		title:'一划到底',
    		url:'textNav.txt'
    	},{
    		id:4,
    		title:'全民斗地主',
    		url:'textNav.txt'
    	}],
      bottomSheet: false
    }
  },
  methods: {
  	click(item){
//		console.log(item)
//		console.log(this.link)
    	if(!item.id)
    		return;
  		this.$store.state.dialog.link=this.link;
		this.$store.dispatch('ajax',{
			url:item.url,
			method:'get',
			data:{
				a:'lhb',
			}
		});
  	},
    closeBottomSheet () {
      this.bottomSheet = false
    },
    openBottomSheet () {
      this.bottomSheet = true
    }
  }
}
</script>