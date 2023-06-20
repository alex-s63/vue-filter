<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',

  watch: {
    errorMessage() {
      if (this.errorMessage) {
        Vue.$toast.warning(this.errorMessage, {

        })
        this.clearErrorMessage()
      }
    }
  },

  computed: {
    ...mapGetters([
      'errorMessage'
    ])
  },

  methods: {
    ...mapMutations([
      'clearErrorMessage'
    ])
  }
}
</script>

<style lang="scss">
.app {
  background-color: #F3F7FA;
  min-height: 100vh;
}
</style>
