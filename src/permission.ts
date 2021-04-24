
import router from './router'
import store from './store'
import { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookie'
import setting from '@/setting'

const defaultTitle = setting.title
const getPageTitle = (title?: string) => {
    if (title) {
        return `${defaultTitle} - ${title}`
    }
    return `${defaultTitle}`
}
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    NProgress.start()

    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()

    if (hasToken) {
        //  登录状态
        if (to.path === '/login') {
            next()
            NProgress.done()
        } else {
            const hasGetMenus = store.getters.menus
            if (hasGetMenus.length > 0) {
                next()
            } else {
                try {
                    // 处理动态路由，浏览器刷新时，重新获取用户信息
                    await store.dispatch('user/getUserInfo')
                    let asyncRoutes = store.getters.menus
                    asyncRoutes.forEach((route: RouteRecordRaw) => {
                        router.addRoute(route)
                    });
                    // 打断当前路由，执行新的路由
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    ElMessage.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 如果在白名单内，不重新定向
            next()
        } else {
            // 不在白名单内定向到登录页
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }

    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

