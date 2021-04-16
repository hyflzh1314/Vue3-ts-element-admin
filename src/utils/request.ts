import axios from 'axios'
import { AxiosResponse } from 'axios'
import { getToken } from '@/utils/cookie'
import store from '@/store'
import router from '@/router'
const qs = require('qs')
import { ElMessage, ElMessageBox } from 'element-plus'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, config) {
        if (config['Content-Type'] === 'application/json') {
            return JSON.stringify(data)
        }
        if (!(data instanceof FormData)) {
            data = qs.stringify(data)
            
        }
        return data
    }],
    withCredentials: true // 携带cookie

})

service.interceptors.request.use(
    (config) => {
        if (getToken()) {
            config.headers['X-Access-Token'] = getToken()
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        if (res.code === 200) {
            return res
        } else {
            if (res.code === 405 || res.code === 406) {
                // token失效
                ElMessageBox.confirm('登录信息过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        router.push({
                            path: '/login'
                        })
                        // location.reload()
                    })
                })
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error',
                    duration: 1 * 1000
                })
            }
            return Promise.reject()
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service