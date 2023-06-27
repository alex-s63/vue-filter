<template>
  <div>
    <div class="tickets-list">
      <TicketListItem v-for="(ticket, index) in ticketsToShow" :key="index" :ticket="ticket" />
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
      'sortingValue',
      'filterValues'
    ]),

    ticketsByFilter() {
      const result = []
      this.filterValues.forEach((filterValue) => {
        if (this.tickets.has(filterValue)) {
          result.push(...this.tickets.get(filterValue))
        }
      })

      return result
    },

    ticketsToShow() {
      return this.ticketsByFilter.slice(0, this.ticketsToShowCount)
    },

    // temporary unused
    sortedTickets() {
      switch (this.sortingValue) {
        case CHEAP_SORTING_VALUES:
          return this.ticketsByFilter.toSorted((prevTicket, nextTicket) => {
            return prevTicket.price - nextTicket.price
          })
        case FAST_SORTING_VALUES:
          return this.ticketsByFilter.toSorted((prevTicket, nextTicket) => {
            const prevDuration = prevTicket.segments[0].duration + prevTicket.segments[1].duration
            const nextDuration = nextTicket.segments[0].duration + nextTicket.segments[1].duration
            return prevDuration - nextDuration
          })
        case OPTIMAL_SORTING_VALUES:
          return this.ticketsByFilter.toSorted((prevTicket, nextTicket) => {
            const prevOptimalValue = this.getOptimalValue(prevTicket)
            const nextOptimalValue = this.getOptimalValue(nextTicket)
            return prevOptimalValue - nextOptimalValue
          })
        default:
          return this.ticketsByFilter
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
    },

    getOptimalValue(ticket) {
      return ticket.price * 0.01 + ticket.segments[0].duration +
        ticket.segments[1].duration + (ticket.segments[0].stops.length + ticket.segments[1].stops.length) * 4
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
