
import Koa from 'koa'
import Router from 'koa-router'
import bodyPaser from 'koa-bodyparser'
const path = require('path')
const fs = require("fs")

const app = new Koa();
const router = new Router();
const join = (dir: string) => path.join(__dirname, dir);
const port = 9528


app.use(bodyPaser())

const routerRegister = (targetPath: string) => {
    fs.readdirSync(targetPath).forEach((filePath: string) => {
        let isFile = fs.statSync(targetPath + filePath).isFile();
        if (isFile) {
            if (/.ts$/g.test(filePath)) {
                require(targetPath + filePath)(router);
                app.use(router.routes())
            }
        }
    })
}
routerRegister(join('/router/'))

app.use(router.allowedMethods());
app.listen(port, () => {
    console.log(`端口${port}已启动`)
})

