import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { changeSetting } from '@/api/user'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_FULL_SETTING: (state, setting) => {
    for (const [key, value] of Object.entries(setting)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit, state }, data) {
    if (state[data.key] !== data.value) {
      return new Promise((res, rej) => {
        changeSetting(data).then(response => {
          commit('CHANGE_SETTING', data)
          res(response)
        }).catch(err => rej(err))
      })
    }
  },
  changeFullSetting({ commit }, data) {
    commit('CHANGE_FULL_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

