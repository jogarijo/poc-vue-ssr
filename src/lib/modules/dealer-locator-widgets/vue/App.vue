<template>
  <div>
    <ul>
      <li v-for="dealer of dealers" :key="dealer.id">
        {{ dealer.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    dealers () {
      return this.$store.state.dealers || []
    }
  },

  serverPrefetch () {
    const { req, manager } = this.$ssrContext
    const location = req.query.location || ''
    const page = req.query.page || 1
    const perPage = req.query.perPage || 10

    return this.fetchDealers({ location, page, perPage })
  },

  mounted () {
    if (!this.dealers.length) {
      // Force fetch if not yet done server-side
      this.fetchDealers()
    }
  },

  methods: {
    fetchDealers ({ location, page, perPage }) {
      return this.$store.dispatch('fetchDealers', { location, page, perPage })
    }
  }
}
</script>
