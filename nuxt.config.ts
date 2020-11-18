import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Matsui Hidetoshi',
    title: 'Matsui Hidetoshi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '静岡県浜松市のWeb開発者 松井英俊のホームページ' },
      { hid: 'keywords', name: 'keywords', content: '松井,英俊,松井英俊,Matsui,Hidetoshi,Matsui Hidetoshi,浜松,静岡,浜松市,静岡県,Web,エンジニア,まついひでとし,まつい,ひでとし' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Matsui Hidetoshi' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL || 'http://localhost:3000' },
      { hid: 'og:title', property: 'og:title', content: 'Matsui Hidetoshi' },
      { hid: 'og:description', property: 'og:description', content: '静岡県浜松市のWeb Developer 松井英俊のホームページ' },
      { hid: 'og:image', property: 'og:image', content: (process.env.BASE_URL || 'http://localhost:3000') + '/profile.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/truncate'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  pwa: {
    manifest: {
      name: 'Matsui Hidetoshi',
      short_name: 'Matsui, H.'
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  },

  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
