<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item
      label="账号"
      name="username"
      :rules="[{ required: true, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { login } from '../api/index'
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})
const onFinish = async (values: FormState): Promise<void> => {
  const { code, token } = await login(values.username, values.password)
  console.log(code, token)
  if (code === 200) {
    localStorage.setItem('token', token)
    router.push('/home')
  } else {
    message.error('登录失败，请检查用户名或密码')
  }
}
</script>
