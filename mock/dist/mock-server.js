"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_1 = tslib_1.__importDefault(require("koa"));
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const koa_bodyparser_1 = tslib_1.__importDefault(require("koa-bodyparser"));
const path = require('path');
const fs = require("fs");
const app = new koa_1.default();
const router = new koa_router_1.default();
const join = (dir) => path.join(__dirname, dir);
const port = 9528;
const checkToken = require('./jwt');
app.use(koa_bodyparser_1.default());
app.use(checkToken);
const routerRegister = (targetPath) => {
    fs.readdirSync(targetPath).forEach((filePath) => {
        let isFile = fs.statSync(targetPath + filePath).isFile();
        if (isFile) {
            if (/.ts$/g.test(filePath)) {
                require(targetPath + filePath)(router);
                app.use(router.routes());
            }
        }
    });
};
routerRegister(join('/router/'));
app.use(router.allowedMethods());
app.listen(port, () => {
    console.log(`端口${port}已启动`);
});
