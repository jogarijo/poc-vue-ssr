module.exports = {
  name: 'dealer-locator',
  extend: 'vue-ssr-widgets',
  label: 'Dealer Locator',

  construct (self, options) {
    // ---
    // Vue extensions specific to this widget should be registered here
    // All plugins registered here should also be declared in `[module]/public/js/always.js`
    // ---

    const superGetContext = self.getContext
    self.getContext = (req) => ({
      ...superGetContext(req),
      dealersManager: self.apos.modules.dealers
    })
  }
}
