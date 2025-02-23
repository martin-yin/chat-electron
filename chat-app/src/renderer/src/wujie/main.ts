import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'whatwg-fetch'
import 'custom-event-polyfill'
import WujieVue from 'wujie-vue3'
import hostMap from './hostMap.js'
import credentialsFetch from './fetch.js'
import lifecycles from './lifecycle.js'

import App from './App.vue'
import router from './router'

const { setupApp, preloadApp, bus } = WujieVue

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
  },
}
const app = createApp(App)

app.use(WujieVue)

app.use(createPinia())
app.use(router)

const isProduction = import.meta.env.NODE_ENV === 'production'
const attrs = isProduction ? { } : {}

setupApp({
  name: 'vue3',
  url: hostMap('chat-link'),
  attrs,
  exec: true,
  alive: true,
  plugins: [],
  props,
  fetch: (url, options) =>
    url?.includes(hostMap('chat-link'))
      ? credentialsFetch(url, options)
      : window.fetch(url, options),
  degrade,
  ...lifecycles,
})

app.mount('#app')
