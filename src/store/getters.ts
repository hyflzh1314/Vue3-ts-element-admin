const getters = {
  token: (state: any) => state.user.token,
  name: (state: any) => state.user.name,
  menus: (state: any) => state.user.menus
}

export default getters