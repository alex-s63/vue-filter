<template>
  <div class="list-item">

    <div class="list-item__header">
      <div class="list-item__header__price">{{ getTicketPrice }}</div>
      <div class="list-item__header__logo">
        <img :src="`//pics.avs.io/99/36/${ticket.carrier}.png`" alt="logo">
      </div>
    </div>

    <div class="list-item__content">

      <div class="list-item__content__row" v-for="(segment, index) in ticket.segments" :key="segment.date">
        <div class="list-item__content__col">
          <div class="list-item__content__col__label">{{ getOriginDestination(index) }}</div>
          <div class="list-item__content__col__value">{{ getOriginDestinationTime(index) }}</div>
        </div>
        <div class="list-item__content__col">
          <div class="list-item__content__col__label">В дорозі</div>
          <div class="list-item__content__col__value">{{ getDuration(index) }}</div>
        </div>
        <div class="list-item__content__col">
          <div class="list-item__content__col__label">{{ getStopsCount(index) }} пересадки</div>
          <div class="list-item__content__col__value">{{ getStops(index) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketListItem',

  props: {
    ticket: Object
  },

  computed: {
    getTicketPrice() {
      const strPrice = String(this.ticket.price)
      return strPrice.slice(0, 2) + ' ' + strPrice.slice(2) + ' грн'
    }
  },

  methods: {
    getOriginDestination(index) {
      return this.ticket.segments[index].origin + ' - ' + this.ticket.segments[index].destination
    },

    getOriginDestinationTime(index) {
      const departureDate = new Date(this.ticket.segments[index].date)
      const durationTimeMs = this.ticket.segments[index].duration * 60 * 1000
      const departureTimeMs = Date.parse(departureDate)
      const destinationTimeMs = new Date(departureTimeMs + durationTimeMs)

      return this.getFormattedHours(departureDate) + ':' + this.getFormattedMinutes(departureDate) +
        ' - ' + this.getFormattedHours(destinationTimeMs) + ':' + this.getFormattedMinutes(destinationTimeMs)
    },

    getDuration(index) {
      const durationTimeMs = this.ticket.segments[index].duration * 60 * 1000
      const durationDate = new Date(durationTimeMs)
      
      return durationDate.getHours() + 'год. ' + this.getFormattedMinutes(durationDate) + 'хв.'
    },

    getFormattedHours(date) {
      return (date.getHours() < 10 ? '0' : '') + date.getHours()
    },

    getFormattedMinutes(date) {
      return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    },

    getStopsCount(index) {
      return this.ticket.segments[index].stops.length
    },

    getStops(index) {
      return this.ticket.segments[index].stops.join(' ')
    }
  }
}
</script>

<style scoped lang="scss">
.list-item {
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &__price {
      color: $blueMain;
      font-size: 24px;
      font-weight: 600;
    }
  }

  &__content {
    line-height: 1.4;

    &__col {
      flex-grow: 1;
      max-width: 33.3%;

      &__label {
        font-size: 12px;
        font-weight: 600;
        color: $gray;
      }

      &__value {
        font-weight: 600;
        font-size: 14px;
      }
    }

    &__row {
      display: flex;
      width: 100%;
    }

    &__row:not(:last-of-type) {
      margin-bottom: 15px;
    }
  }
}
</style>
