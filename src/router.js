import Vue from 'vue'
import Router from 'vue-router'
import { VDatePickerYears } from 'vuetify/lib'

import { repositoryFactory } from './repositories/repositoryFactory'
import { auth } from './services/authService'
import { roles } from './services/rolesService'


const authRepository = repositoryFactory.get("authRepository")

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: '',
      redirect: 'login',
      component: () => import('@/layouts/FullPage.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login.vue'),
          meta: { requiresAuth: false, roles: [] }
        },

      ]
    },
    {
      path: '',
      component: () => import('@/layouts/Panel.vue'),
      children: [
        {
          path: '/beverages',
          name: 'beverages',
          component: () => import('./views/Beverages.vue'),
          meta: { requiresAuth: true, roles: [roles.admin] },
        },
        {
          path: '/condiments',
          name: 'condiments',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Condiments.vue'),
          meta: { requiresAuth: true, roles: [roles.admin] }
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('@/views/Orders.vue'),
          meta: { requiresAuth: true, roles: [roles.admin, roles.user] }
        },
        {
          path: '/notfound',
          name: 'notfound',
          component: () => import('./views/Notfound.vue'),
          meta: { requiresAuth: true, roles: [] }
        },

      ]
    },


  ]
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    if (Vue.prototype['$auth'].isAuthenticated()) {

      if (to.name === 'notfound') {
        next()
      }
      authRepository.getUser().then(response => {
        Vue.prototype.['$auth'].setUser(response.data.user)

        if (to.meta.roles.filter(routeRoles => Vue.prototype['$auth'].getUserRoles().includes(routeRoles.toLowerCase())).length) {
          next()
        } else {
          console.log('User does not have permission to access this link')
          next({ name: 'notfound' })
        }

      })
    } else {
      next({ name: 'login' })
    }
  } else {
    if (!to.name) {
      next({ name: 'notfound' })
    }
    next()
  }



}
)



export default router
