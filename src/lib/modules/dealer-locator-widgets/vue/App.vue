<template>
  <div id="app">
    <button @click="counter += 1">Refresh {{ counter }}</button>
    <ul>
      <li v-for="dealer of dealers" :key="dealer.id">
        {{ dealer.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: 1
    }
  },

  computed: {
    dealers () {
      return this.$store.state.dealers || []
    }
  },

  async serverPrefetch () {
    const { req, dealersManager } = this.$ssrContext
    const location = req.query.location || ''
    const page = req.query.page || 1
    const perPage = req.query.perPage || 10

    const dealers = await dealersManager.getAll(req, { location, page, perPage })
    this.$store.commit('setDealers', dealers)
  },

  mounted () {
    if (!this.dealers.length) {
      // Force fetch if not yet done server-side
      this.fetchDealers()
    }
  },

  methods: {
    fetchDealers ({ location, page, perPage } = {}) {
      return this.$store.dispatch('fetchDealers', { location, page, perPage })
    }
  }
}
</script>
