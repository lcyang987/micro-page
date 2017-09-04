<template>
  <div class="menuBox">
    <el-menu default-active="2" class="menu" :router=true :unique-opened=true theme="dark">
      <el-menu-item index="/HomePage">店铺首页</el-menu-item>
      <el-menu-item index="/CustomPage">自定义页面</el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
  .menuBox {
    width: 120px;
    height: 100%;
    margin-right: 10px;
    background: #324157;
    overflow-y: auto;
    float: left;
  }
</style>
