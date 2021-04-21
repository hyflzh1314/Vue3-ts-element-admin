
import defaultSettings from '@/setting'
import { Commit }  from 'vuex'
const { showTagsView, fixedHeader, showSidebarLogo } = defaultSettings
interface ISettingState {
    'showTagsView': boolean
    'showSidebarLogo': boolean
    'fixedHeader': boolean
}

const state: ISettingState = {
    showTagsView,
    showSidebarLogo,
    fixedHeader
}

const mutations = {
    CHANGE_SETTING: (state: ISettingState, payload: { key: string, value: any }) => {
        const { key, value } = payload
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            (this as any)[key] = value
        }
    }
}

const actions = {
    ChangeSetting({ commit }: any, payload: { key: string, value: any }) {
        commit('CHANGE_SETTING', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}