<template>
	<div class="textNavSidebar" v-if="result" >
		<div ref="items" class="list">
			<section class="item" v-for="(item,i) of result.attr.list" @mousedown="mousedown(i)">
				<mu-text-field ref="list" :errorText="item.errorText" @textOverflow="item.errorText = item.text.length>result.validator.list.text.max ? '超过啦' : ''" v-model="item.text" :maxLength="result.validator.list.text.max" label="导航名称" labelFloat v-inputValidator="{
          'require':result.require.list.text,
          'value':item.text,
          'validator':result.validator.list.text
        }"/>
				<mu-raised-button draggable="false" v-if="item.link.id" style="width:59%;float:left" class="demo-raised-button" :label="item.link.text" :title="item.link.text" :href="item.link.url" target="_blank" primary />
        <popoverComponent v-linkValidator="{'require':result.require.list.link,'value':item.link}" :width="item.link.id?'31%':'90%'" :link="item.link" :destination="{name: 'list', num: i, attr: 'link'}"></popoverComponent>
        <mu-icon-button class="insert" icon="add" v-on:click="insert(i)"/>
				<mu-icon-button class="remove" icon="close" v-on:click="remove(i)"/>
			</section>
		</div>
		<mu-raised-button class="demo-raised-button push" label="添加一个文本导航" icon="add" primary v-on:click="push"/>
	</div>
</template>
<script>
import _ from 'lodash'
import originData from 'assets/micropage/originData.js'
import {mapActions} from 'vuex'
export default {
  name: 'textNavSidebar',
  props: ['result', 'active'],
  components: {
    originData
  },
  methods: {
    ...mapActions([
      'dragDrop'
    ]),
    mousedown (i) {
      this.dragDrop({
        oEvent: event,
        items: this.$refs.items,
        obj: this.$refs.items.children[i],
        data: this.result.attr.list,
        active: i
      })
    },
    insert (i) {
      this.result.attr.list.splice(i + 1, 0, _.cloneDeep(originData.textNav.attr.list[0]))
    },
    push () {
      this.result.attr.list.push(_.cloneDeep(originData.textNav.attr.list[0]))
    },
    remove (i) {
      this.result.attr.list.splice(i, 1)
    }
  },
  mounted () {
    if (this.$refs.list) {
      for (var i = 0; i < this.$refs.list.length; i++) {
        this.$refs.list[i].charLength = this.result.attr.list[i].text.length
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.list{
		position:relative;
    width:300px;
    .item{
      width:300px;
    }
	}
	input{
		width:70%;
	}
	section{
		position:relative;
		.insert,.remove{
			right: -14px;
			position:absolute;
		}
		.insert{
    		top: 80px;
		}
		.remove{
			top: 27px;
		}
	}
	.push{
		width:100%;
	}

	span{
		display:inline-block;
		width:70px;
		text-align:right;
	}
</style>
