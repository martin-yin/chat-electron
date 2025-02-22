<template>
  <div class="login-container">
    <a-tabs v-model:active-key="activeKey" centered>
      <a-tab-pane key="0" tab="登录">
        <LoginComponent />
      </a-tab-pane>
      <a-tab-pane key="1" tab="注册">
        <RegisterComponent />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import LoginComponent from "@renderer/components/Login.vue"
import RegisterComponent from "@renderer/components/Register.vue"

import { ref } from 'vue'
const activeKey = ref('0')
</script>
<style lang="less" scoped>
.login-container {
  margin: 50px auto;
  width: 500px;
}
</style>
