import Router from 'koa-router';
const list = require('../mock-data/list')
module.exports = (router: Router) => {
    router.post('/getList', async (ctx, next) => {
        ctx.response.status = 200
        ctx.response.body = {
            code: 200,
            data: {
                list
            },
            message: 'success'
        }
    })
}
