import axios from 'axios'
import qs from 'querystring'

module.exports = {
  async fetchDealers({ commit }, { location, page, perPage }) {
    const query = qs.stringify({ location, page, perPage })
    axios
      .get(`/api/v1/dealers?${query}`)
      .then(({ data }) => commit('setDealers', data))
  }
}
