

const getters = {
  sidebar: (state: any) => state.app.sidebar,
  token: (state: any) => state.user.token,
  name: (state: any) => state.user.name,
  menus: (state: any) => state.user.menus,
  roles: (state: any) => state.user.roles
}

export default getters