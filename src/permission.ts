
import router from './router'
import store from './store'
import {RouteRecordRaw} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookie'
import setting from '@/setting'

const defaultTitle = setting.title
const getPageTitle = (title: string | unknown) => {
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
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetMenus = store.getters.menus
            if (hasGetMenus.length > 0) {
                next()
            } else {
                try {
                    await store.dispatch('user/getUserInfo')
                    let asyncRoutes = store.getters.menus
                    asyncRoutes.forEach((route:RouteRecordRaw)=> {
                        router.addRoute(route)
                    });
                    next({ ...to, replace: true })
                } catch(error) {
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
            next(`/login`)
            NProgress.done()
        }

    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

