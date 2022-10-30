import questions from '../../api/questions.json'

const state = () => ({
  questions: [],
})

// getters
const getters = {
  questions: (state) => {
    return state.questions;
  },
}

// actions
const actions = {
  getQuestions({commit}) {
    commit('setQuestions', { questions: questions?.length ? questions : [] });
  },
}

// mutations
const mutations = {
  setQuestions (state, { questions }) {
    state.questions = questions;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}