/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import router from './router'

import 'whatwg-fetch'
import 'custom-event-polyfill'
import WujieVue from 'wujie-vue3'
import hostMap from '@renderer/wujie/hostMap'
import credentialsFetch from '@renderer/wujie/fetch.js'
import lifecycles from '@renderer/wujie/lifecycle.js'
import App from './App.vue'

const { setupApp, bus } = WujieVue

bus.$on('click', (msg) => window.alert(msg))

bus.$on('sub-route-change', (name, path) => {
  const mainName = `${name}-sub`
  const mainPath = `/${name}-sub${path}`
  const currentName = router.currentRoute.name
  const currentPath = router.currentRoute.path
  if (mainName === currentName && mainPath !== currentPath) {
    router.push({ path: mainPath })
  }
})

const degrade =
  window.localStorage.getItem('degrade') === 'true' ||
  !window.Proxy ||
  !window.CustomElementRegistry
const props = {
  jump: (name) => {
    router.push({ name })
  }
}
const app = createApp(App)

app.use(WujieVue)
app.use(Antd)
app.use(router)

const isProduction = import.meta.env.NODE_ENV === 'production'
const attrs = isProduction ? { src: hostMap('//localhost:5173/') } : {}

setupApp({
  name: 'chat-link',
  url: hostMap('chat-link'),
  attrs,
  exec: true,
  alive: true,
  plugins: [],
  props,
  fetch: (url, options) => {
    console.log('fetch', url, options)
    return url.includes(hostMap('chat-link'))
      ? credentialsFetch(url, options)
      : window.fetch(url, options)
  },

  degrade,
  ...lifecycles
})

app.mount('#app')
