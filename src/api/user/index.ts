import request from '@/utils/request'

export interface loginQuery {
    username: string;
    password: string;
}

export const login = (data: loginQuery) =>
    request({
        url: '/login',
        method: 'post',
        data
    })

export interface loginOutQuery {
    token: string;
}
export const loginOut = (data: loginOutQuery) =>
    request({
        url: '/loginOut',
        method: 'post',
        data
    })    