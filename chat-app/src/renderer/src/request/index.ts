import { message } from 'ant-design-vue'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
const service = axios.create({
  timeout: 60000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const responseCode = response.status
    if (responseCode === 200 || responseCode === 201) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response) {
      return error.response?.data
    } else {
      message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export type Response<T = any> = {
  code: number
  message: string
  data: T
  path: string
  status: boolean
  time: string
}

type Method = 'get' | 'post' | 'put' | 'delete'

export const request = <T>(
  method: Method,
  url: string,
  data = {},
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  const prefix = 'http://127.0.0.1:3030'

  url = prefix + url
  if (method === 'post') {
    return service.post(url, data, config)
  } else if (method === 'put') {
    return service.put(url, data)
  } else if (method === 'delete') {
    return service.delete(url)
  } else {
    return service.get(url, {
      params: data,
      ...config
    })
  }
}
