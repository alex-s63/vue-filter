<template>
  <button @click="showMoreTickets" v-if="loadMoreBtnVisibility" class="loadMore">Показати ще 5 квитків</button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoadMoreBtn',

  props: {
    ticketsToShowCount: Number,
    showMoreTickets: Function
  },

  computed: {
    ...mapGetters([
      'tickets'
    ]),

    loadMoreBtnVisibility() {
      return this.tickets.length >= this.ticketsToShowCount
    }
  }
}
</script>

<style scoped lang="scss">
.loadMore {
  background-color: $blueMain;
  color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: none;
  width: 100%;
  user-select: none;
  cursor: pointer;
}
</style>
