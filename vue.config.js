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
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                resolve('src/styles/variables.scss')
            ]
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
                        chunks: 'initial' // 只分割同步引入的模块
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // 将element单独打包
                        priority: 20, // 优先级要比app和lib高，否则会被打到app和lib包内
                        test: /[\\/]node_modules[\\/]_?element-plus(.*)/ 
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // 匹配规则
                        minChunks: 3, //  模块至少使用次数
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
    }
}