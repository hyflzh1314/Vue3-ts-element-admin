const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production' ? true : false

const devServerPort = 9527 
const mockServerPort = 9528 
const title = 'Vue Typescript Admin' 

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
        name: title,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@views': resolve('src/views'),
                '@component': resolve('src/components'),
                '@api': resolve('src/api')
            }
        }
    },
    chainWebpack(config) {
        config
            .when(!isProd,
                config => config.devtool('cheap-module-source-map')
            )
        config.plugin('html').tap(args => {
            args[0].title = title
            return args
        })
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
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
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
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