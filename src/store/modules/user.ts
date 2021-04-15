
import { login, loginOut, loginQuery, loginOutQuery } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/cookie'
import { AnyFunction } from 'element-plus/lib/utils/types'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        menus: [],
        roles: ''
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
}

const actions = {
    login({ commit }: any, userInfo: loginQuery) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
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
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
