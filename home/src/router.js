import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      requiresLogin: false
    }
  },
  {
    path: '/books',
    name: 'Books',
    meta: {
      requiresLogin: true
    }
  },
]

let router = createRouter({
  history: createWebHistory('/home'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.meta.requiresLogin && !isLoggedIn) {
    window.location.href = "/login?redirect-to=/home";
  }
  next();

})

export default router
