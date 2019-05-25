const App = require('../../vue/App')
const state = require('../../universal/state')
const mutations = require('../../universal/mutations')
const actions = require('../../universal/actions')

// ---
// Vue extensions specific to this widget should be registered here
// All plugins registered here should also be declared in `[module]/index.js:construct`
// ---

apos.define('dealer-locator-widgets', {
  extend: 'apostrophe-widgets',
  construct(self, options) {
    apos.vueSsr.mountApp(self, {
      component: App,
      state,
      mutations,
      actions
    })
  }
})
