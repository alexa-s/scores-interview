import scores from '../../api/scores.json'

const state = () => ({
  scores: [],
})

// getters
const getters = {
  scores: (state) => {
    return state.scores;
  },
  rows: (state, getters, rootState, rootGetters) => {
    return state.scores.map(item => {
      /**
       * Find the question in the questions store using the id provided in the scores json 
       * Adding it to the new array which will contai: question_id, questionn and scores 
       * The scores are flattened ( [[]] => [] )
       * The values are transformed to display only one decimal
       */
      const question = rootGetters['questions/questions'].find(question => question._id === item.question_id);

      const itemScores = item.scores?.flat().map(score => { 
        return {
          ...score,
          'value': parseFloat(score.value / 10).toFixed(1)
        }
      });

      if (question) {
        return { 
          ...item, 
          'scores': itemScores,
          'question': question.labels?.en 
        };
      }
    });
  }
}

// actions
const actions = {
  getScores({commit}) {
    commit('setScores', { scores: scores.length ? scores : [] });
  },
}

// mutations
const mutations = {
  setScores (state, { scores }) {
    state.scores = scores;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}