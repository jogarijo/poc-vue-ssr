<template>
  <div id="app">
    <form @submit="submitSearch">
      <input v-model="search" type="text" name="search">
      <input v-model="page" type="number" min="1" step="1" name="page">
      <input v-model="perPage" type="number" min="1" step="1" name="perPage">
      <input type="submit" value="Search">
    </form>
    <ul>
      <li v-for="dealer of dealers" :key="dealer.id">{{ dealer.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    dealers: {
      get() { return this.$store.state.dealers || [] },
      set(value) { this.$store.commit('setDealers', value) }
    },
    search: {
      get() { return this.$store.state.search || '' },
      set(value) { this.$store.commit('setSearch', value) }
    },
    page: {
      get() { return this.$store.state.page || 1 },
      set(value) { this.$store.commit('setPage', parseInt(value, 10)) }
    },
    perPage: {
      get() { return this.$store.state.perPage || 10 },
      set(value) { this.$store.commit('setPerPage', parseInt(value, 10)) }
    }
  },

  async serverPrefetch() {
    const { req, dealersManager } = this.$ssrContext
    this.search = req.query.search || ''
    this.page = req.query.page || 1
    this.perPage = req.query.perPage || 10
    this.dealers = await dealersManager.getAll(req, { search: this.search, page: this.page, perPage: this.perPage })
  },

  mounted() {
    if (!this.dealers.length) {
      // Force fetch if not yet done server-side
      this.fetchDealers()
    }
  },

  methods: {
    submitSearch(event) {
      event.preventDefault()
      this.fetchDealers()
    },
    fetchDealers() {
      const query = {
        search: this.search,
        page: this.page,
        perPage: this.perPage
      }
      if (!query.search) {
        delete query.search
      }
      this.$router.push({ query })
      this.$store.dispatch('fetchDealers', query)
    }
  }
}
</script>
