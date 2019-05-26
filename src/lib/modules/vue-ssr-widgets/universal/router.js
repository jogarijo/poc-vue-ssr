import VueRouter from 'vue-router'

const createRouter = ({ mode = 'history', routes = [] }) => new VueRouter({
  mode,
  routes
})

export { createRouter }
