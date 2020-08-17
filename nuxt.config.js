export default {
  mode: 'spa',
  target: 'static',
  head: {
    title: 'TDC SP 2020 - VueGL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  components: true,
  pageTransition: 'fade',
  css: ['~/assets/base.css'],
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
}
