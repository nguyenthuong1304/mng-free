import { fetchList, deletePeople, createPeople, updatePeople } from '@/api/people'

const state = {
  peoples: {
    data: [],
    meta: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0
    }
  }
}

const mutations = {
  SET_PEOPLE: (state, data) => {
    state.peoples = {
      data: data.data,
      meta: {
        currentPage: data.current_page,
        lastPage: data.last_page,
        perPage: data.per_page,
        total: data.total
      }
    }
  }
}

const actions = {
  // user login
  list({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchList(query).then(({ data }) => {
        commit('SET_PEOPLE', data)
        resolve()
      })
        .catch(err => reject(err))
    })
  },
  saveOrUpdate({ commit, state }, people) {
    return new Promise((resolve, reject) => {
      const _call = people.id ? updatePeople(people) : createPeople(people)
      _call.then(response => {
        const peopleIndex = state.peoples.data.findIndex(people => people.id === response.data.id)
        const newState = { ...state.peoples }
        newState.data[peopleIndex] = response.data
        commit('SET_PEOPLE', newState)
        resolve(response.message)
      }).catch(err => reject(err))
    })
  },
  delete({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deletePeople(id).then(({ message }) => {
        const data = {
          ...state.peoples.meta,
          data: state.peoples.data.filter(people => people.id !== id)
        }
        commit('SET_PEOPLE', data)
        resolve(message)
      }).catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
