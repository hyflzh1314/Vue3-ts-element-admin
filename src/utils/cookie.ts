import Cookies from 'js-cookie'

//Login
const loginKey = 'user_login'

export const setLoginInfo = (token: string) => Cookies.set(loginKey, token, { expires: 7 })

export const getLoginInfo = () => Cookies.get(loginKey)

export const removeLoginInfo = () => Cookies.remove(loginKey)

// User
const tokenKey = 'vue_typescript_admin_access_token'

export const setToken = (token: string) => Cookies.set(tokenKey, token, { expires: 7 })

export const getToken = () => Cookies.get(tokenKey)

export const removeToken = () => Cookies.remove(tokenKey)