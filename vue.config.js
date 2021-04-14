const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production' ? true : false
const devServerPort = 9527
const mockServerPort = 9528
const name = 'LZH~'
console.log(process.env.NODE_ENV)
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: devServerPort,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        progress: false,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${mockServerPort}/`,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config
            .when(!isProd,
                config => config.devtool('cheap-module-source-map')
            )
        config.plugin('html').tap(args => {
            args[0].title = name
            return args
        })
        config
            .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
    }
}