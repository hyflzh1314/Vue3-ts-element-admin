import request from '@/utils/request'

export const login = (data: object) =>
    request({
        url: '/login',
        method: 'post',
        data
    })