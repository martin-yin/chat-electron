<script setup lang="ts">
import { computed, h, ref } from 'vue'
import {
  CloudOutlined,
  MessageOutlined,
  RadarChartOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const sideMenu = ref([
  {
    name: '首页',
    path: '/home',
    icon: h(RadarChartOutlined)
  },
  {
    name: '云空间',
    path: '/cloud',
    icon: h(CloudOutlined)
  },
  {
    name: '消息',
    path: '/message',
    icon: h(MessageOutlined)
  },
  {
    name: 'AI搜索',
    path: '/search',
    icon: h(SearchOutlined)
  }
])

const currentPath = computed(() => {
  return router.currentRoute.value?.fullPath || '/home'
})
const handleClick = (path: string): void => {
  router.push(path)
}
</script>

<template>
  <div class="layout">
    <div class="side">
      <div class="side-menu">
        <div class="side-menu__item" v-for="(item, index) in sideMenu" :key="index"
          :class="{ active: currentPath === item.path }" @click="handleClick(item.path)">
          <span>
            <component :is="item.icon" />
          </span>
          <span class="side-menu__item-name">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;

  .main {
    width: calc(100vw - 72px);
    height: 100vh;
  }
}

.side {
  width: 72px;
  background: rgba(51, 132, 242);
  color: #fff;

  .side-menu {
    width: 54px;
    margin: 0 auto;
    padding-top: 32px;
    text-align: center;

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      flex-direction: column;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 12px;

      &-name {
        margin-top: 6px;
        font-size: 12px;
      }

      &.active {
        background: rgba(255, 255, 255, 0.2);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
