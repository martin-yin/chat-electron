import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@renderer/page/Home.vue'
import Message from '@renderer/page/Message.vue'
import CloudView from '@renderer/page/Cloud.vue'
import SearchView from '@renderer/page/Search.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', component: HomeView },
  { path: '/message', component: Message },
  { path: '/cloud', component: CloudView },
  { path: '/search', component: SearchView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
