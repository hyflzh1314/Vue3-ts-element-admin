import request from '@/utils/request'

export interface ILogin {
    username: string
    password: string
}

export const login = (data: ILogin) =>
    request({
        url: '/login',
        method: 'post',
        data
    })

export interface ILoginOut {
    token: string
}
export const loginOut = (data: ILoginOut) =>
    request({
        url: '/loginOut',
        method: 'post',
        data
    })
export interface IUserInfo {
    token: string
}    
export const getUserInfo = (data: IUserInfo) =>
    request({
        url: '/getUserInfo',
        method: 'post',
        data
    })    