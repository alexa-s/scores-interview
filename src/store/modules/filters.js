import filters from '../../api/filters.json'

const state = () => ({
  filters: [],
  headers: [],
})

// getters
const getters = {
  headers: (state) => {
    let headers = state.filters.map(filter => {
      return {
        filterId: filter._id,
        filterName: filter.en,
      }
    });
    return headers;
  },
}

// actions
const actions = {
  getFilters ({commit}) {
    commit('setFilters', { filters: filters?.length ? filters : [] });
  },
}

// mutations
const mutations = {
  setFilters (state, { filters }) {
    state.filters = filters
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}