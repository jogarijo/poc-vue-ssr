import Vue from 'vue/dist/vue'

const createApp = (appOptions) => {
  const { name, component, ...options } = appOptions

  // FIXME Workaround because of how Parcel builds the frontend; it should not
  // be necessary if using other, well-configured tools
  if (component.default) {
    Object.assign(component, component.default)
  }
  if (!name) {
    options.render = h => h(component)
  } else {
    options.components = { [name]: component }
    options.render = h => h(name)
  }
  return new Vue(options)
}

export { createApp }
