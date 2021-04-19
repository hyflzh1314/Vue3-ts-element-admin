import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router'

interface IRoute extends RouteRecordNormalized {
  meta: {
    roles: string[]
  }

}
const hasPermission = (roles: string[], route: IRoute) => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    } else {
      return true
    }
  }

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const r:any = { ...route }
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles)
            }
            res.push(r)
        }
    })
    return res
}