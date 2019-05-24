const { createRenderer } = require('vue-server-renderer')
const { promisify } = require('util')
const { join } = require('path')
const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)

module.exports = {
  name: 'vue-ssr-widget',
  extend: 'apostrophe-widgets',
  label: 'Vue SSR Widget',

  // The Vue SSR renderer options as provided to the `createRenderer` method.
  // See https://ssr.vuejs.org/api/#renderer-options
  rendererOptions: {},

  // The name of the root component for the app, if different from 'App'.
  rootComponent: 'App',

  // TODO
  defaultState: {},
  actions: {},
  mutations: {},

  construct (self, options) {
    self.renderer = createRenderer(options.rendererOptions)

    // Retrieve 'vue' folder full path from the last module in the extension
    // chain. As opposed to using `__dirname`, the path is guaranteed to refer
    // to the right folder, instead of this base module's.
    const moduleMetadata = self.__meta.chain[self.__meta.chain.length - 1]
    self.vueRoot = join(moduleMetadata.dirname, 'vue')

    /**
     * Triggers server-side rendering on all widgets of the page. All widgets
     * are rendered in parallel to save up time.
     *
     * Note: Is there any valid use case where rendering should be sequential?
     * I can't think of any, but if needed we could add a `sequential` option to
     * the module to disable parallel rendering. - @jogarijo
     */
    const superLoad = promisify(self.load)
    self.load = async (req, widgets, cb) => {
      try {
        await superLoad(req, widgets)

        const widgetsRenderings = widgets.map(async (widget) => self.renderWidget(req, widget))
        await Promise.all(widgetsRenderings)

        cb(null)
      } catch (err) {
        cb(err)
      }
    }

    /**
     * Creates the SSR context object, which is available as `this.$ssrContext`
     * in Vue `serverPrefetch` hook.
     *
     * Note: As `serverPrefetch` is executed server-side, we may be able to
     * directly provide `req` and `self` without risking them leaking out to the
     * frontend (TODO to be tested). Providing them as `$ssrContext.req` and
     * `$ssrContext.manager` mimicks Apostrophe templates `data` object thus
     * allowing direct access to the module methods within the Vue app. It may
     * be a little overkill though, to be discussed. - @jogarijo
     */
    self.getContext = async (req) => {
      return { req, manager: self }
    }

    /**
     * TODO
     */
    self.getStore = (req) => new Vuex.Store({
      state: () => options.defaultState,
      actions: options.actions,
      mutations: options.mutations
    })

    /**
     * Renders the Vue application and appends the rendered HTML to the widget
     * object, thus exposing it as `data.widget._rendered` from the template.
     */
    self.renderWidget = async (req, widget) => {
      try {
        const { default: rootComponent } = require(join(self.vueRoot, options.rootComponent))
        const app = new Vue({
          store: self.getStore(),
          render: h => h(rootComponent)
        })
        const context = await self.getContext(req)

        widget._rendered = await self.renderer.renderToString(app, context)
      } catch (err) {
        console.error(`An error occurred during SSR for ${self.__meta.name}`)
        console.error(err)
        widget._renderedWidget = ''
      }
    }
  }
}
