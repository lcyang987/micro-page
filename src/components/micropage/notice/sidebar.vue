<template>
  	<div class="noticeSidebar" style="width:240px">
      <mu-text-field ref="content" :errorText="result.validator.content.errorText" @textOverflow="result.validator.content.errorText = result.attr.content.length > result.validator.content.max ? '超过啦！' : ''" v-model="result.attr.content" :maxLength="result.validator.content.max" v-inputValidator="{
        'require':result.require.content,
        'value':result.attr.content,
        'validator':result.validator.content
      }" label="内容标题" :rows="2" fullWidth multiLine labelFloat/>
  	</div>
</template>
<script>
export default {
  props: ['result'],
  mounted () {
    this.$refs.content.charLength = this.result.attr.content.length
  }
}
</script>
