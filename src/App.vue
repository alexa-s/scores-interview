<template>
  <div id="app">
    <div class="container">
      <scores-table 
        :headers="headers"
        :rows="rows"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ScoresTable from './components/ScoresTable.vue'
import './style/index.scss';

export default {
  name: 'App',
  components: {
    ScoresTable
  },
  computed: {
    ...mapGetters({
      headers: 'filters/headers',
      rows: 'scores/rows',
    }),
  },
  created() {
    try {
      this.getFilters();
      this.getQuestions();
      this.getScores();
    } catch(e) {
      //todo: add an alert
      console.log('Error:', e);
    }

  },
  methods: {
    ...mapActions({
      getFilters: 'filters/getFilters',
      getQuestions: 'questions/getQuestions',
      getScores: 'scores/getScores',
    })
  }
}
</script>