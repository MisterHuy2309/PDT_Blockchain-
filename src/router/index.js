import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/create', name: 'create', component: () => import('../views/CreateReceiptView.vue') },
    { path: '/verify', name: 'verify', component: () => import('../views/VerifyView.vue') },
    { path: '/history', name: 'history', component: () => import('../views/HistoryView.vue') }
  ]
})

export default router