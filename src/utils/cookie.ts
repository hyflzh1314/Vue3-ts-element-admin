import Cookies from 'js-cookie'



// User
const tokenKey = 'vue_typescript_admin_access_token'

export const setToken = (token:string) => Cookies.set(tokenKey, token, { expires: 7 })

export const getToken = () => Cookies.get(tokenKey)

export const removeToken = () => Cookies.remove(tokenKey)