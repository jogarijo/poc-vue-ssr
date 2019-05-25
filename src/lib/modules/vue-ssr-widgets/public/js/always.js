import 'babel-polyfill'
import Vue from 'vue/dist/vue'
import Vuex from 'vuex'
import { createApp } from '../../universal/app'
import { createStore } from '../../universal/store'

Vue.use(Vuex)

apos.vueSsr = {
  mountApp (self, { component, state, actions, mutations }) {
    self.play = function($widget, data, options) {
      const store = createStore({ state, actions, mutations })
      const app = createApp({ name: data.type, store, component })

      if (data._state) {
        // FIXME Dirty way to retrieve the state from self.renderWidget
        store.replaceState(JSON.parse(data._state))
      }

      app.$mount('#app')
    }
  }
}
