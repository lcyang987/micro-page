<template>
	<el-form :model="form" :inline="true" label-position="right" label-width="80px" class="qf-query-form">
    <el-form-item label="模板名称">
      <el-input v-model="form.nameFuzzy"></el-input>
    </el-form-item>
    <searchComponent :filename="filename"></searchComponent>
	</el-form>
</template>
<script>
export default{
  props: ['filename', 'form']
}
</script>
