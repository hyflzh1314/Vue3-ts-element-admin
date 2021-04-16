
import jsonwebtoken from 'jsonwebtoken'

// 不要验证token的路由
const whiteList = ['/login']
let jwt_token:any = null

const createToken = (name: string) => {
    jwt_token = jsonwebtoken.sign({
        //token的创建日期
        time: Date.now(),
        //token的过期时间
        timeout: Date.now() + 12000000,
        name,
    // token：解析token的标识
    
    }, 'token')
}

async function checkToken(ctx: any, next: any) {
    let url = ctx.url
    if (whiteList.indexOf(url) !== -1) {
        if (url.indexOf('/login') !== -1) {
            let user_name = ctx.request.body.username
            createToken(user_name)
            ctx.token = jwt_token
        }
        
        await next()
    } else {
        let token = ctx.request.headers["x-access-token"]
        if (token) {
            const tokenItem:any = jsonwebtoken.verify(token, 'token')
            const { time, timeout } = tokenItem
            let now_date = new Date().getTime();
            if (now_date <= timeout) {
                // token没有过期
                await next()
            } else {
                ctx.body = {
                    code: 405,
                    message:'token已过期，请重新登陆'
                }  
            }
        } else {
            ctx.body = {
                code: 406,
                message:'缺少token'
            }
        }
    }
}

module.exports = checkToken