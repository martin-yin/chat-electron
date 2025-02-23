<template>
  <div class="message">
    <WujieVue width="100%" height="100%" :props="{
      token: token,
      link: roctChatIframe
    }" name="chatLink" :url="chatLink"></WujieVue>
  </div>
</template>

<script>
import hostMap from '../wujie/hostMap'
import wujieVue from 'wujie-vue3'
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      chatLink: `${hostMap('chat-link')}`,
      roctChatIframe: 'http://45.32.110.124:3030/home'
    }
  },
  watch: {
    '$route.params.path': {
      handler: function () {
        wujieVue.bus.$emit('chant-link-change', `/${this.$route.params.path}`)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.message {
  height: 100vh;
  overflow: hidden;
}
</style>
