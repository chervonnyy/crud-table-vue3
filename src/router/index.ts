import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Users from '@/views/Users.vue'
import Groups from '@/views/Groups.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
