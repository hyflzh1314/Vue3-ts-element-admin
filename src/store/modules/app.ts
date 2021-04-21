

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

    }
}

const actions = {
    toggleSideBar({ commit }: any) {
        commit('TOGGLE_SIDEBAR')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}