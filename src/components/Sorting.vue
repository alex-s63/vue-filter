<template>
  <div class="sorting">
    <button
      v-for="(button, index) in sortingButtons"
      :key="button.label"
      class="sorting__btn"
      :class="{ 'sorting__btn--active': button.active }"
      @click="sortingClick(index)"
      >
      {{ button.label }}
    </button>
  </div>
</template>

<script>
import { CHEAP_SORTING_VALUES, FAST_SORTING_VALUES, OPTIMAL_SORTING_VALUES } from '../constants'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Sorting',

  data: () => {
    return {
      sortingButtons: [
        {
          label: 'Найдешевший',
          active: true,
          value: CHEAP_SORTING_VALUES
        },
        {
          label: 'Найшвидший',
          active: false,
          value: FAST_SORTING_VALUES
        },
        {
          label: 'Оптимальний',
          active: false,
          value: OPTIMAL_SORTING_VALUES
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'sortingValue'
    ]),

    localSortingValue: {
      get() {
        return this.sortingValue
      },
      set(value) {
        this.setSortingValue(value)
      }
    }
  },

  methods: {
    ...mapActions([
      'setSortingValue'
    ]),

    sortingClick(index) {
      this.sortingButtons.forEach(btn => {
        btn.active = false
      })

      this.sortingButtons[index].active = true
      this.localSortingValue = this.sortingButtons[index].value
    }
  }
}
</script>

<style scoped lang="scss">
.sorting {
  display: flex;
  width: 100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-bottom: 20px;
  
  &__btn {
    padding: 17px 0;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    background-color: #fff;
    border: 1px solid #DFE5EC;
    flex-grow: 1;
    cursor: pointer;
    user-select: none;

    &--active {
      color: #fff;
      background-color: $blueMain;
      border-color: $blueMain;
    }

    &:first-of-type {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border-right: none;
    }

    &:last-of-type {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-left: none;
    }
  }
}
</style>
