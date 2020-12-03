import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import { auth } from './services/authService'
import { roles } from './services/rolesService'

import VueCurrencyInput from 'vue-currency-input'
const pluginOptions = {
  globalOptions: {

    locale: "en",
    currency: null,
    valueAsInteger: false,
    distractionFree: true,
    precision: 2,
    autoDecimalMode: true,
    valueRange: { max: 100 },
    allowNegative: false,
  }
}

Vue.use(VueCurrencyInput, pluginOptions)

Vue.prototype.$auth = auth
Vue.prototype.$roles = roles
Vue.prototype.$eventHub = new Vue()

Vue.router = router

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
