<script lang="ts" setup>
const props = window.$wujie.props
const link = props.link
const token = props.token

console.log(props)
</script>
<template>
  <div class="chat-link">
    <iframe :src="`${link}?token=${token}`" frameborder="0" allowfullscreen :style="{
      width: '100%',
      height: '100vh',
    }"></iframe>
  </div>
</template>

<style>
body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
