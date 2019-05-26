import 'babel-polyfill'
import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { createApp } from '../../universal/app'
import { createStore } from '../../universal/store'
import { createRouter } from '../../universal/router'

Vue.use(Vuex)
Vue.use(VueRouter)

apos.vueSsr = {
  mountApp (self, { component, router, store }) {
    self.play = function($widget, data, options) {
      const appStore = createStore(store)
      const appRouter = createRouter(router)
      const app = createApp({
        name: data.type,
        store: appStore,
        router: appRouter,
        component
      })


      if (data._state) {
        // FIXME Dirty way to retrieve the state from self.renderWidget
        appStore.replaceState(JSON.parse(data._state))
      }

      app.$mount('#app')
    }
  }
}
