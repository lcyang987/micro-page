<template>
  <div class="navBox">
    <div class="logo">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAZCAYAAACYY8ZHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QTZDODU5RDU3MjcxMUU3Qjk4QUVDODM4MzlCMjE5RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QTZDODU5RTU3MjcxMUU3Qjk4QUVDODM4MzlCMjE5RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVBNkM4NTlCNTcyNzExRTdCOThBRUM4MzgzOUIyMTlFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVBNkM4NTlDNTcyNzExRTdCOThBRUM4MzgzOUIyMTlFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1gs7nwAABZFJREFUeNrMmHuI1FUUx2dmd3b2oesum5tWmG2aRZthSCWVEkVE75Ato4LekRH0kDLLHlJJQUZFoBFLLkZZ+YemkEYq2cMMKnun7ab20C1rTdv3zkzfI58rp1/zc0fYP/rBlzu/e+/v3PM+504yn88nBnvaGhpSGh4XrhXmNbS1vZj4Hz2lRe4bI1wqjBbKhuJgKeYmDXOEhVLKU0Xsr9PQIhwtXK1vNoe1VJFnThHGGy3hnSFSoNE7RjihyP3DhKMQYrRfSBWhgRINl2C1TULrEAmRc2cki9ifFfoYE4ckhJ5G4QyhW1gqMw4MkRA94Ydo5ovYb+fb2SZw/j8xIU3Uwmil0Os22kFXYsZdQr32XqQxHSUU8+ShaYy+qm/NJUagvHr2jNT88dDMwFOa2MuAEJejhAphhr4Zq3G40Jm07KSJJr28wIF9TggzeTVEzYz7Clgw6grJiBCBMWPgQeF0oQTfPgyaP7OnjLUgSAlI8Z529HPM/1aKz1vgjmSxKkarJQiUi0Hewb+bNfuF48hwh6OQoOFyzg5Mhe+yuE+gZwLWwkensJf9m0v5sVV4W9jDofsw22Voy7LSK8yHAAvod8hyYGAgBK8duFN4yM1bij1H+EK4l7NHOAtmQZ5zGqlVRwpvCouw2K5SDl9ok/JbnzEu1tDE60tam685E6jOmTwFSjCz/e4Svtf+3gLWbHH0z0SIXxEgo2/WHSRL5hDGnl+096MDga2XhDNh+MDMezea2S6sYsk0MQ0XSLkYCAKEuLlC+KoAIxOh+4nzbYvD2cJUrT9msWnZSr/N/aYLH+t9LUEcXLBO6xWa7z5Yxbb2Yiq/lwtf8/tsfNo0+qP7vhe/vo7iVRthPo1rzhVOgqHfXYBuwipPmu9rv3nG7cJM4XO9T+eMtIvb0tg6oQ8maLieNTtouSTOuuD+UHjUAgpf7xDa8dF1LlgDvQT+34wAG3Df0L6kWZuHVR4RTsbNjNHJwiwqdp+jX1Kwd6JyXiOcyNQHwka3pZzAHIPWx+FCO6nkOdci+DOmMC6GWfPhG1ivIestwoqnoZhlwh0E8nism3U0U3EN4CRcKUmWel1W6HLrGbT1l/AWadMI/0EsZKJp2iq8lNOMBZbp/U+9VzlLGA/Vmt+m+Ydx1x9Ys255IrE4CoETrp78WwgRMAZuowgl8NPVESHLEK6GnN+IZXbgXqGVqPYficH1GtYXqDsJV51tXzuuGXhaYBrX/F7iIjOYO11AVknAWItprUCvVYnWn4XZ/VWTQK9k3/BB2pGUO7ssrr3X+X9HFBieCv8eeqdRWCFo8H1hZcz9wxjt1AFb+LaGOJrlMtpgd45kRKvlRd59ku6bTDQ7NZHiQrfYgmmjzxJiwWvIYmYb5u0nKLcUIUSva1nSRQhRFkkwBwS33sky0a1OoFUwWui5BTPnnMkt7a0UnTUaT+HCsnYQhkzw50jJlqa/OZT7BwJUehPNJqV2I8BcMbY7xkdzcScgzMZiLhLaaxZbA+LajOC6A65hTLosWeWFOAsp3xUesIuPCFir8ZpwuXCnsJsCVU8GstiZKWZatfcu/b5KOJ/9R1B57XBrI262qit8RgM4jhpg1ftT7tlzcMUl0LFUfyH15liK7qRIIsr53mlsRANPU+5nCC9DYBo++QTmv084lwK3h/6qBz8PV0g7/FQY3ODWs9wfOlybHjrdVhR2IwxvRTETIobqgEbs9XQpNcJMuYLraBVa2U7QplyeboeRWupHYDSF4DtE4zsrZlxDuxB8GNU4GbpYrNcMjfOE5wXrpu8hzgYQfDHJJPYvGyP6LV1tCrOt5sD7YfhLq+auKFp/M1/4ye4d1hnLolZ1n7FOVL8nk7bfQ4NvUJf2x6H291DFu2FuhTFM7Jg1FoCCzz8CDACYzOrYzVs33QAAAABJRU5ErkJggg==" alt="" style="
      display: inline-block;" />
      <span class="logo_title">店铺装修</span>
    </div>
    <el-button class="returnPathBtn" type="info" v-if="wholsePath" @click="toWholsePath">返回商城</el-button>
  </div>
</template>
<script>
export default {
  computed: {
    wholsePath () {
      return localStorage.getItem('wholsePath')
    }
  },
  methods: {
    toWholsePath () {
      window.location.href = this.wholsePath
    }
  }
}
</script>
<style lang="less" scoped>
  .navBox {
    height:50px;
    background:white;
    .logo {
      padding-left: 12px;
      display: inline-block;
      padding-top:10px;
      .logo_title {
        font-size: 12px;
        color: #2e2f30;
      }
    }
    .returnPathBtn {
      margin:6px 20px 0 0;
      float:right;
    }
  }
</style>
