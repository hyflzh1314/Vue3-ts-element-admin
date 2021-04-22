
import Router from 'koa-router'
const {menus, roles} = require('../mock-data/userInfo') 
module.exports = (router: Router) => {
    router.post('/getUserInfo', async (ctx, next) => {
        let query = ctx.request.body
        let name = 'admin'
        ctx.response.status = 200
        ctx.response.body = {
            code: 200,
            data: {
                name,
                menus,
                roles
            },
            message: 'success'
        }
        // await next()
    })
}