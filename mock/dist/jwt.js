"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
// 不要验证token的路由
const whiteList = ['/login'];
let jwt_token = null;
const createToken = (name) => {
    jwt_token = jsonwebtoken_1.default.sign({
        //token的创建日期
        time: Date.now(),
        //token的过期时间
        timeout: Date.now() + 12000000,
        name,
    }, 'token');
};
async function checkToken(ctx, next) {
    let url = ctx.url;
    if (whiteList.indexOf(url) !== -1) {
        if (url.indexOf('/login') !== -1) {
            let user_name = ctx.request.body.username;
            createToken(user_name);
            ctx.token = jwt_token;
        }
        await next();
    }
    else {
        let token = ctx.request.headers["x-access-token"];
        if (token) {
            const tokenItem = jsonwebtoken_1.default.verify(token, 'token');
            const { time, timeout } = tokenItem;
            let now_date = new Date().getTime();
            if (now_date <= timeout) {
                // token没有过期
                await next();
            }
            else {
                ctx.body = {
                    code: 405,
                    message: 'token已过期，请重新登陆'
                };
            }
        }
        else {
            ctx.body = {
                code: 406,
                message: '缺少token'
            };
        }
    }
}
module.exports = checkToken;
