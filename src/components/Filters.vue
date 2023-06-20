<template>
  <div class="filter">
    <div class="filter__title">Кількість пересадок</div>
    <div class="filter__checkboxes">
      <Checkbox label="Всі" v-model="allTickets" @change="allTicketsChange()" class="filter__checkbox" />

      <Checkbox v-for="option in filterOptions" :key="option.value" :value="option.value" :label="option.label"
        v-model="localFilterValues" class="filter__checkbox" />
    </div>
  </div>
</template>

<script>
import Checkbox from '../components/Checkbox.vue'
import { mapGetters, mapMutations } from 'vuex'
import { INITIAL_FILTER_VALUES } from '../constants'

export default {
  name: 'Filters',

  components: {
    Checkbox
  },

  data() {
    return {
      filterOptions: [
        {
          label: 'Без пересадок',
          value: 0
        },
        {
          label: '1 пересадка',
          value: 1
        },
        {
          label: '2 пересадки',
          value: 2
        },
        {
          label: '3 пересадки',
          value: 3
        }
      ],
      allTickets: true
    }
  },

  created() {
    const { filter } = this.$route.query

    if (filter) {
      Array.isArray(filter) ? this.localFilterValues = filter.map(Number)
        : this.localFilterValues = [parseInt(filter)]
    }
  },

  watch: {
    localFilterValues() {
      this.localFilterValues.length === INITIAL_FILTER_VALUES.length ? this.allTickets = true : this.allTickets = false
    }
  },

  computed: {
    ...mapGetters([
      'filterValues'
    ]),

    localFilterValues: {
      get() {
        return this.filterValues
      },
      set(value) {
        this.setFilterValues(value)
        this.setFilterQuery(value)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setFilterValues'
    ]),

    allTicketsChange() {
      this.allTickets ? this.localFilterValues = INITIAL_FILTER_VALUES : this.localFilterValues = []
    },

    setFilterQuery(query) {
      this.$router.push({
        query: {
          ...this.$route.query,
          filter: query
        }
      }).catch(error => { if (error.name !== 'NavigationDuplicated') { throw error } })
    }
  }
}
</script>

<style scoped lang="scss">
.filter {
  background-color: #fff;
  width: 232px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding-bottom: 10px;

  &__title {
    padding: 20px 20px 10px 20px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
  }
}
</style>
