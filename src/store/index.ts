import { createStore } from 'vuex'

// modules
import user from './modules/user'
import setting from './modules/setting'
import app from './modules/app'
// getter
import getters from './getters'

export default createStore({
  modules: {
    user,
    setting,
    app
  },
  getters,
  devtools: true
})
