import Vue from 'vue'
import Vuex from 'vuex'
import { API_GET_SEARCH_ID, API_GET_TICKETS, INITIAL_FILTER_VALUES, INITIAL_SORTING_VALUE } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tickets: [],
    searchId: '',
    filterValues: INITIAL_FILTER_VALUES,
    sortingValue: INITIAL_SORTING_VALUE,
    error: {
      errorMessage: ''
    }
  },

  mutations: {
    addTickets(state, tickets) {
      state.tickets.push(...tickets)
    },
    setSearchId(state, id) {
      state.searchId = id
    },
    setErrorMessage(state, message) {
      state.error.errorMessage = message
    },
    clearErrorMessage(state) {
      state.error.errorMessage = ''
    },
    setFilterValues(state, value) {
      state.filterValues = value
    },
    setSortingValue(state, value) {
      state.sortingValue = value
    }
  },

  actions: {
    async getAllTickets({ state, dispatch, commit }) {
      let data
      try {
        const response = await fetch(API_GET_TICKETS + new URLSearchParams({
          searchId: state.searchId
        }))
        data = await response.json()
        if (data.errorMessage) {
          throw new Error(data.errorMessage)
        }

        commit('addTickets', data.tickets)
      } catch (e) {
        commit('setErrorMessage', String(e))
        throw new Error(e)
      } finally {
        if (!data.stop) {
          await dispatch('getAllTickets')
        }
      }
    },

    async getSearchId({ commit }) {
      try {
        const response = await fetch(API_GET_SEARCH_ID)
        const data = await response.json()
        commit('setSearchId', data.searchId)
      } catch (e) {
        commit('setErrorMessage', String(e))
        throw new Error(e)
      }
    }
  },

  getters: {
    errorMessage (state) {
      return state.error.errorMessage
    },

    filterValues (state) {
      return state.filterValues
    },

    sortingValue (state) {
      return state.sortingValue
    },

    tickets (state) {
      // For all filter
      if (state.filterValues.length === INITIAL_FILTER_VALUES.length) {
        return state.tickets
      }

      return state.tickets.filter((ticket) => {
        const maxStopsCount = Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length)

        return state.filterValues.includes(maxStopsCount)
      })
    }
  }
})
