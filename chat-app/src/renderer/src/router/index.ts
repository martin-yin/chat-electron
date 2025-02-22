import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@renderer/page/Home.vue'
import Message from '@renderer/page/Message.vue'
import CloudView from '@renderer/page/Cloud.vue'
import SearchView from '@renderer/page/Search.vue'
import Login from '@renderer/page/Login.vue'
import Layout from '@renderer/layout/Layout.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'layout',
    path: '/',
    component: Layout,
    children: [
      {
        name: 'home',
        path: '/home',
        component: HomeView
      },
      {
        name: 'message',
        path: '/message',
        component: Message
      },
      {
        name: 'cloud',
        path: '/cloud',
        component: CloudView
      },
      {
        name: 'search',
        path: '/search',
        component: SearchView
      }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
