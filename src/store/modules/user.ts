import { login, loginOut, getUserInfo, ILogin, IUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/cookie'

import { asyncRoutes } from '@/router'
import { filterAsyncRoutes } from '@/router/filterAsyncRoutes'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        menus: [],
        roles: []
    }
}
const state = getDefaultState()

const mutations = {
    RESET_STATE: (state: any) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state: any, token: string) => {
        state.token = token
    },
    SET_NAME: (state: any, name: string) => {
        state.name = name
    },
    SET_MENUS: (state: any, menus: []) => {
        state.menus = menus
    },
    SET_ROLES: (state: any, roles: []) => {
        state.roles = roles
    },
}

const actions = {
    login({ commit }: any, query: ILogin) {
        return new Promise((resolve, reject) => {
            login(query).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                commit('SET_NAME', data.name)
                setToken(data.token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }: any) {
        return new Promise((resolve, reject) => {
            loginOut({ token: state.token }).then(response => {
                removeToken() // must remove  token  first
                // resetRouter()
                commit('RESET_STATE')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({ commit }: any) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve('')
        })
    },
    getUserInfo({ commit, state }: any, query: IUserInfo) {
        return new Promise((resolve, reject) => {
            getUserInfo({ token: state.token }).then(response => {
                const { data } = response
                let accessedRoutes
                if (data.roles.includes('admin')) {
                    accessedRoutes = asyncRoutes
                } else {
                    accessedRoutes =  filterAsyncRoutes(asyncRoutes, data.roles)
                }
                commit('SET_MENUS', accessedRoutes)
                commit('SET_ROLES', data.roles)
                resolve(accessedRoutes)
            }).catch(err => {

            })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
