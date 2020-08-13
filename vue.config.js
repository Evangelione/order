const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  devServer: {
    // proxy: 'http://cs.7youke.com',
    proxy: 'https://www.9youke.com',
    // proxy: 'http://cs.czg365.cn',
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-base': '#FAE04C',
          'primary-deep': '#FAA04C',
          // Functional Color
          'color-success': '#67C23A',
          'color-warning': '#E6A23C',
          'color-danger': '#F56C6C',
          'color-info': '#909399',
          // Font Size
          'font-size-xs': '10px',
          'font-size-sm': '12px',
          'font-size-md': '14px',
          'font-size-lg': '16px',
          // Font Color
          'color-text-primary': '#303133',
          'color-text-regular': '#606266',
          'color-text-secondary': '#909399',
          'color-text-placeholder': '#C0C4CC',
          // Border Color
          'border-color-base': '#DCDFE6',
          'border-color-light': '#E4E7ED',
          'border-color-lighter': '#EBEEF5',
          'border-color-extra-light': '#F2F6FC',
          // Background Color
          'color-white': '#FFFFFF',
          'color-black': '#000000',
          'background-color-base': '#F5F7FA',
          // Vant Less Color
          // nav-bar
          'nav-bar-icon-color': '@color-text-primary',
          'nav-bar-text-color': '@color-text-primary',
          // tab-bar
          'tabbar-item-active-color': '@color-text-primary',
          // tabs
          'tabs-default-color': '@primary-base',
          // button
          'button-primary-color': '@color-text-primary',
          'button-primary-background-color': '@primary-base',
          'button-primary-border-color': '@primary-base',
          // card
          'card-text-color': '@color-text-primary',
          'card-price-color': '@primary-deep',
          // picker
          'picker-confirm-action-color': '@primary-base',
          // index-bar
          'index-bar-index-active-color': '@primary-base',
          // index-anchor
          'index-anchor-sticky-text-color': '@primary-deep',
          // side-bar
          'sidebar-selected-border-color': '@primary-base',
          // info
          'info-dot-color': '@primary-deep',
          'info-background-color': '@primary-deep',
        },
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
          }),
        ],
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/neworder/' : '/',
  configureWebpack: {
    externals: {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
    },
  },
}
