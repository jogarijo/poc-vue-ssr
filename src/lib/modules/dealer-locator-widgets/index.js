const dealers = require('./lib/dealers')

module.exports = {
  name: 'dealer-locator',
  extend: 'vue-ssr-widgets',
  label: 'Dealer Locator',

  beforeConstruct (self, options) {
    options.defaultState = {
      dealers: []
    }

    options.actions = {
      async fetchDealers ({ commit }, { location, page, perPage }) {
        const dealers = await self.getDealers(location, page, perPage)
        commit('setDealers', dealers)
      }
    }

    options.mutations = {
      setDealers (state, dealers) {
        state.dealers = dealers
      }
    }
  },

  construct (self, options) {
    self.getDealers = async (location = '', page = 1, perPage = 10) => {
      const filteredDealers = dealers
        .filter((dealer) => dealer.location.includes(location))
        .slice(page - 1, page * perPage)

      return Promise.resolve(filteredDealers)
    }
  }
}
