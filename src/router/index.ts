import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  linkActiveClass: 'active-nav-link',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Početna',
      },
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        title: 'Rezultati pretrage',
      },
      component: () => import('@/views/SearchView.vue'),
    },
  ],
})

export default router
