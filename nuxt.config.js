import theme from '@nuxt/content-theme-docs';

export default theme({
  loading: { color: '#00CD81' },
  i18n: {
    locales: () => [
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh-CN.js',
        name: '简体中文'
      }
    ],
    defaultLocale: 'zh'
  },
  buildModules: ['@nuxtjs/google-analytics', '@nuxtjs/google-adsense', '@nuxtjs/sitemap'],
  content: {
    liveEdit: false
  },
  components: true,
  pwa: {
    manifest: {
      name: '团队领袖计划'
    }
  },
  googleAnalytics: {
    id: 'UA-33096931-4'
  },
  'google-adsense': {
    id: 'ca-pub-5059418763237956',
    pageLevelAds: true,
    onPageLoad: true,
    overlayBottom: true
  },
  sitemap: {
    hostname: 'https://leader.js.cool'
  }
});
