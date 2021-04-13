
import Router from 'koa-router'

module.exports = (router: Router) => {
    router.post('/login', async (ctx, next) => {
        let query = ctx.request.body
        ctx.response.status = 200
        ctx.response.body = {
            code: 200,
            data: {
                name: 'lzh~',
                token: '123456asd'
            },
            message: '登录成功'
        }
        // await next()
    })
}