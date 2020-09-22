import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {auth} from './services/authService'

Vue.prototype.$auth = auth
Vue.router = router

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
