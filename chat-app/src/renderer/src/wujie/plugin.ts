/* eslint-disable @typescript-eslint/explicit-function-return-type */
const plugins = [
  {
    htmlLoader: (code) => {
      console.log('html-loader')
      return code
    },
    jsBeforeLoaders: [
      {
        callback(appWindow) {
          console.log('js-before-loader-callback', appWindow.__WUJIE.id)
        }
      }
    ],
    jsLoader: (code, url) => {
      console.log('js-loader', url)
      return code
    },
    jsAfterLoaders: [
      {
        callback(appWindow) {
          console.log('js-after-loader-callback', appWindow.__WUJIE.id)
        }
      }
    ],
    cssLoader: (code, url) => {
      console.log('css-loader', url, code.slice(0, 50) + '...')
      return code
    }
  }
]

export default plugins
