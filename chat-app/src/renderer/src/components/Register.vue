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

    <a-form-item label="email" name="email" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit">注册并登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { register } from '../api/index'
import { message } from 'ant-design-vue'

interface FormState {
  username: string
  password: string
  name: string
  email: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  name: '',
  email: ''
})
const onFinish = async (values: FormState): Promise<void> => {
  const { code } = await register(values.username, values.password, values.email, values.name)
  if (code === 200) {
    message.success('注册成功，请登录!')
  } else {
    message.error('注册失败，请稍后再试!')
  }
}
</script>
