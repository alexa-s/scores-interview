<template>
  <table 
    class="scores"
  >
    <thead class="scores__thead">
      <tr class="scores__row">
        <th class="scores__head">
          <input 
            v-model="filter" 
            type="text" 
            placeholder="Search..."  
            class="scores__search"
          />
        </th>
        <th 
          v-for="item in headers" 
          :key="item.filterId" 
          class="scores__head"
        >
          {{ item.filterName }} 
        </th>
      </tr>
    </thead>
    <tbody class="scores__tbody">
      <tr 
        v-for="row in cRows" 
        :key="row.question_id" 
        class="scores__row scores__row--striped"
      >
        <td class="scores__cell">
          {{ row.question }}
        </td>
        <td 
          v-for="score in row.scores" 
          :key="score.filter_id" 
          class="scores__cell"
        > 
          <span 
            class="scores__cell--colors" 
            :class="getScoreClass(score.value)"
          >
            {{ score.value }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Fuse from 'fuse.js';
import options from '../utils/fuseOptions';

export default {
  name: 'ScoresTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      filter: '',
      scoreRows: this.rows || [],
      fuseOptions: options
    }
  },
  mounted() {
    this.$el.addEventListener('scroll', (event) => {
      this.getFixedHeaderAndColumn(event);
    });
  },
  computed: {
    filteredRows() {
      let fuseResults = new Fuse(this.scoreRows, this.fuseOptions).search(this.filter);
      return fuseResults.map(result => result.item);
    },
    cRows() {
      return (this.filter === '') ? this.scoreRows : this.filteredRows;
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('scroll', (event) => {
      this.getFixedHeaderAndColumn(event);
    });
  },
  methods: {
    getScoreClass(value) {
      const scoreValue = parseFloat(value);
      let toCheckAgainst = 0;

      for(let i=0; i<=10; i++) {
        toCheckAgainst +=1;

        if (scoreValue >= i && scoreValue < toCheckAgainst) {
          return `cell-score-${i}`;
        }
        
        if (scoreValue === toCheckAgainst) {
          return `cell-score-${toCheckAgainst}`;
        }
      }
    },
    getFixedHeaderAndColumn(event) {
      /**
       * To replace the behaviour of position sticky to accomodate IE11
       */
      event.preventDefault();
      let header = this.$el.querySelector('thead');                        
      let firstHeadColumn = this.$el.querySelector('.scores__head:first-child');
      let firstBodyColumn = this.$el.querySelectorAll('.scores__cell:first-child');

      header.setAttribute('style',`top: ${event.target.scrollTop}px;`);
      firstHeadColumn.setAttribute('style',`left: ${event.target.scrollLeft}px;`);

      firstBodyColumn.forEach((column, index) => {
        const backgroundColor = this.getBackgroundColor(index);
        column.setAttribute('style', `left: ${event.target.scrollLeft}px; 
          background-color: ${backgroundColor};`
        );
      });
    },
    getBackgroundColor(index) {
      if (index % 2) {
        return '#FAFAFA';
      } 

      return '#ffffff';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .scores {
    position: relative;
    display: block;
    max-width: 1700px;
    height: 600px;
    overflow: scroll;
    border-spacing: 0;
    border-top: 1px solid $border-color;
    border-right: 1px solid $border-color;

    &__thead {
      position: relative;
      display: block;
      width: auto;
      overflow: visible;
    }

    &__head {
      white-space: nowrap;
      word-break: break-word;
      background-color: $white;

      &:nth-child(1) {
        position: relative;
        display: table-cell;
        z-index: 100;
        min-width: 300px;
        text-align: left;
        background-color: $white;

        input {
          height: $pad;
        }
      }
    }

    &__row {
      line-height: $pad;

      &--striped {
        &:nth-child(odd) {
          background-color: $white;
        }

        &:nth-child(even) {
          background-color: $striped;
        }
      }
    }

    &__head,
    &__cell {
      min-width: 100px;
      padding: 2rem;
      color: $text-grey;
      font-weight: 300;
      border-left: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
    }

    &__cell {
      display: table-cell;
      border-top: none;
      text-align: center;

      span {
        font-weight: 600;
      }

      &:nth-child(1) {
        position: relative;
        display: table-cell;
        min-width: 300px;
        max-width: 300px;
        z-index: 10;
        text-align: left;
      }

      &--colors {
        padding: 10px;
        border-radius: 10%;
      }
    }
  }
</style>