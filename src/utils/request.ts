import axios from 'axios'
import { AxiosResponse } from 'axios'
const qs = require('qs')
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
        // Add X-Access-Token header to every request, you can add other custom headers here
        //   if (UserModule.token) {
        //     config.headers['X-Access-Token'] = UserModule.token
        //   }
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
            return response.data
        } else {

        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service