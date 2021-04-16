
import Router from 'koa-router'

module.exports = (router: Router) => {
    // login
    router.post('/login', async (ctx: any, next) => {
        let token = ctx.token
        let name = ctx.request.query.username
        ctx.response.status = 200
        ctx.response.body = {
            code: 200,
            data: {
                name: name,
                token: token
            },
            message: '登录成功'
        }
        await next()
    })

    // loginout
    router.post('/loginOut', async (ctx: any, next) => {
        ctx.response.status = 200
        ctx.response.body = {
            code: 200,
            data: {},
            message: '退出登录成功'
        }
        await next()
    })
}