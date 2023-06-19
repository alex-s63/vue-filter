<template>
  <div>
    <div class="tickets-list">
      <TicketListItem v-for="ticket in ticketsToShow" :key="JSON.stringify(ticket)" :ticket="ticket" />
    </div>

    <LoadMoreBtn :ticketsToShowCount="ticketsToShowCount" :showMoreTickets="showMoreTickets" />
  </div>
</template>

<script>
import TicketListItem from './TicketListItem.vue'
import LoadMoreBtn from './LoadMoreBtn.vue'
import { mapActions, mapGetters } from 'vuex'
import { DEFAULT_TICKETS_TO_SHOW_COUNT, CHEAP_SORTING_VALUES, FAST_SORTING_VALUES, OPTIMAL_SORTING_VALUES } from '../constants'

export default {
  name: 'TicketsList',

  data: () => {
    return {
      ticketsToShowCount: DEFAULT_TICKETS_TO_SHOW_COUNT
    }
  },

  components: {
    TicketListItem,
    LoadMoreBtn
  },

  async created() {
    await this.getSearchId()
    await this.getAllTickets()
  },

  computed: {
    ...mapGetters([
      'tickets',
      'sortingValue'
    ]),

    ticketsToShow() {
      return this.sortedTickets.slice(0, this.ticketsToShowCount)
    },

    sortedTickets() {
      switch (this.sortingValue) {
        case CHEAP_SORTING_VALUES:
          return this.tickets.toSorted((prevTicket, nextTicket) => {
            return prevTicket.price - nextTicket.price
          })
        case FAST_SORTING_VALUES:
          return this.tickets.toSorted((prevTicket, nextTicket) => {
            const prevDuration = prevTicket.segments[0].duration + prevTicket.segments[1].duration
            const nextDuration = nextTicket.segments[0].duration + nextTicket.segments[1].duration
            return prevDuration - nextDuration
          })
        case OPTIMAL_SORTING_VALUES:
          return this.tickets
        default:
          return this.tickets
      }
    }
  },

  methods: {
    ...mapActions([
      'getSearchId',
      'getAllTickets'
    ]),

    showMoreTickets() {
      this.ticketsToShowCount += DEFAULT_TICKETS_TO_SHOW_COUNT
    }
  }
}
</script>

<style scoped lang="scss">
.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
