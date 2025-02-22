<template>
  <WujieVue
    width="100%"
    height="100%"
    :props="{
      token: 123,
      link: 'http://localhost:3030/home'
    }"
    name="chatLink"
    :url="chatLink"
  ></WujieVue>
</template>

<script>
import hostMap from '../wujie/hostMap'
import wujieVue from 'wujie-vue3'
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      chatLink: `${hostMap('chat-link')}`
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

<style lang="scss" scoped></style>
