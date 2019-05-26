module.exports = {
  name: 'dealers',
  extend: 'apostrophe-pieces',
  label: 'Dealer',

  addFields: [
    {
      name: 'location',
      label: 'Location',
      type: 'string'
    }
  ],
  arrangeFields: [
    {
      name: 'details',
      label: 'Details',
      fields: ['title', 'slug', 'location']
    },
    {
      name: 'seo',
      label: 'SEO',
      fields: ['published', 'tags']
    }
  ],

  afterConstruct(self) {
    self.apos.app.use('/api/v1/dealers', (req, res) => {
      self.getAll(req, req.query).then((dealers) => res.send(dealers))
    })
  },

  construct(self, options) {
    self.getAll = (req, { search, page, perPage }) => {
      const criteria = {}
      if (search && typeof search === 'string') {
        const regexp = new RegExp(
          search
            .replace(/[^\u0000-\u007F]/g, ' ')
            .split(' ')
            .filter((p) => p)
            .map((p) => `(?=.*${p})`)
            .join(''),
          'i'
        )
        criteria.$or = [{ title: regexp }, { location: regexp }]
      }

      let cursor = self.find(req, criteria)
      if (parseInt(page) && parseInt(perPage)) {
        const skip = parseInt(page, 10) - 1
        const limit = parseInt(perPage, 10)
        cursor = cursor.skip(skip * limit).limit(limit)
      }

      return cursor.toArray()
    }
  }
}
