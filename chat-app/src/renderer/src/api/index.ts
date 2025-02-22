/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from '@renderer/request/index'

export const login = async (username: string, password: string) => {
  return await request<unknown>('post', '/login', {
    username,
    password
  })
}

export const register = async (
  username: string,
  password: string,
  email: string,
  nickname: string
) => {
  return await request<unknown>('post', '/register', {
    username,
    password,
    email,
    name: nickname
  })
}
