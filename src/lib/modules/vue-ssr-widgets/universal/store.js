import Vuex from 'vuex'

const createStore = ({ state, actions, mutations }) => {
  if (typeof state !== 'function') {
    console.warn('The default state should be a function and should not include references')
  }
  return new Vuex.Store({
    state,
    actions,
    mutations
  })
}

module.exports = { createStore }
