import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/dashboard/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'dashBoard',
          name: 'DashBoard',
          component: () => import('@/views/dashboard/DashBoard.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'about',
      component: () => import('../views/auth/AuthPage.vue'),
      children: [
        {
          path: '/auth/login',
          name: 'AuthLogin',
          component: () => import('../views/auth/LoginPage.vue'),
        },
        {
          path: '/auth/signup',
          name: 'AuthSignup',
          component: () => import('../views/auth/SignupPage.vue'),
        },
      ],
    },
  ],
})

export default router
