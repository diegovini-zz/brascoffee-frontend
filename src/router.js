import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/services/authService'
import Dashboard from './views/Dashboard.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Projects.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('./views/Team.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: () => import('./views/Notfound.vue'),
      meta: { requiresAuth: false }
    },
  ]
})

router.beforeEach((to, from, next) => {
  
  if (to.meta.requiresAuth) {
    if (auth.isAuthenticated) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }

  //If not routes are found, redirect to 404
  if (!to.name) {
    next({ name: 'notfound' })
  }

})

export default router
