import axios from 'axios'
import qs from 'querystring'

export const fetchDealers = ({ commit }, { search, page, perPage }) => {
  const query = qs.stringify({ search, page, perPage })
  axios
    .get(`/api/v1/dealers?${query}`)
    .then(({ data }) => commit('setDealers', data))
}
