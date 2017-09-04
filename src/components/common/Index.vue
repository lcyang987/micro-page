<template>
  <div class="home">
      <vNav></vNav>
      <vMenu></vMenu>
      <vCenter></vCenter>
  </div>
</template>
<script>
import vNav from './Nav'
import vMenu from './Menu'
import vCenter from './Center'
export default {
  components: {
    vNav,
    vMenu,
    vCenter
  }
}
</script>
