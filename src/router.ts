import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import TeamsPage from '@/pages/TeamsPage.vue'
import PlayersPage from '@/pages/PlayersPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'for myna',
    },
  },
  {
    path: '/teams',
    component: TeamsPage,
  },
  {
    path: '/players',
    component: PlayersPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
