import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/dashboard/DashBoard.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { hasVisited, storeVisitedState } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      meta: { requiresAuth: true },
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'MonitorStats',
          component: () => import('@/views/dashboard/MonitorStatsPage.vue'),
        },
        {
          path: '/poultry-cage',
          name: 'PoultryCage',
          component: () => import('@/views/dashboard/PoultryCagePage.vue'),
        },
        {
          path: '/admin',
          name: 'Admin',
          component: () => import('@/views/dashboard/AdminPage.vue'),
        },
        {
          path: '/report',
          name: 'Report',
          component: () => import('@/views/dashboard/ReportPage.vue'),
        },
        {
          path: '/settings',
          name: 'Settings',
          component: () => import('@/views/dashboard/SettingsPage.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'Auth',
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

router.beforeEach(async (to, _) => {
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()
    const { authenticating, isAuthenticated } = storeToRefs(userStore)
    const { fetchLoggedInuser } = userStore
    if (!isAuthenticated.value) {
      try {
        authenticating.value = true
        await fetchLoggedInuser()
      } catch (error) {
        if (!hasVisited()) storeVisitedState()
        console.log(error)
        return { name: 'AuthLogin' }
      } finally {
        authenticating.value = false
      }
    }
  }
})

export default router
