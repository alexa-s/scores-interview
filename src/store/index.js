import Vue from 'vue'
import Vuex from 'vuex'
import filters from './modules/filters'
import questions from './modules/questions'
import scores from './modules/scores'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    filters,
    questions,
    scores
  },
})
