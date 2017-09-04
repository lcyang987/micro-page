<template>
  <div class="centerBox">
    <router-view></router-view>
  </div>
</template>
<script>
</script>
<style lang="less">
  .centerBox {
    height: 100%;
    overflow-y:auto;
    background-color:white;
    padding:10px 16px;
    margin:10px 10px 0;
    position:relative;
    padding-bottom: 60px;
    .content-header{
      padding-bottom:10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #d1dbe5;
    }
    .qf-query-form{
      margin:10px 0;
      padding-top: 22px;
      background-color: #f2f2f2;
      overflow: hidden;
    }
  }
</style>
