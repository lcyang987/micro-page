<template>
  <div class="home">
    <template v-if="!urlParams.isIframe">
      <vNav></vNav>
      <vMenu></vMenu>
    </template>
    <vCenter></vCenter>
  </div>
</template>
<script>
import vNav from './Nav'
import vMenu from './Menu'
import vCenter from './Center'
import urlParams from 'assets/urlParams'
export default {
  data () {
    return {
      urlParams
    }
  },
  components: {
    vNav,
    vMenu,
    vCenter
  }
}
</script>
