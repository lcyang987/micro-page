<template>
	<section class="region">
		<h4>添加内容</h4>
		<ul>
			<li v-for="item in region.data" :class="{isTrue:item.type && !item.isDev, isLoading:!index.isLoad}" v-text="item.text" v-on:click="regionClick({
        item:item,
        obj:_self
      });
      toTop()"></li>
		</ul>
	</section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'region',
  computed: mapGetters([
    'index',
    'region'
  ]),
  methods: {
    ...mapActions([
      'regionClick'
    ]),
    toTop () {
      if (/sidebar/.test(this.$parent.$el.className)) {
        setTimeout(() => {
          this.$parent.$parent.dblclick(this.index.active)
        }, 0)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.region{
		box-sizing:initial;
    text-align:center;
    font-size:12px;
    ul{
	    margin:0;
	    padding:0;
			li{
				list-style: none;
				display:inline-block;
		    width: 56px;
		    height: 40px;
		    line-height: 40px;
		    border:1px solid #ddd;
		    margin:5px 2px;
        display:none;
				user-select:none;
				&.isTrue{
					background:white;
		   		color:steelblue;
		    	cursor:pointer;
          display:inline-block;
			    &:hover{
			    	text-decoration:underline
			    }
				}
        &.isLoading{
  				background:gray;
  				color:#ddd;
  				cursor:not-allowed;
        }
			}
    }
	}
</style>
