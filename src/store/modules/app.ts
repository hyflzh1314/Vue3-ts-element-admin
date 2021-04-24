

interface IAppState {
    sidebar: {
        opened: boolean
    }
}

const state: IAppState = {
    sidebar: {
        opened: true
    }
}

const mutations = {
    TOGGLE_SIDEBAR: (state: IAppState) => {
        state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: (state: IAppState) => {
        state.sidebar.opened = false
    }
}

const actions = {
    toggleSideBar({ commit }: any) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSidebar({ commit }: any) {
        commit('CLOSE_SIDEBAR')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}