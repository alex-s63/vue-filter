<template>
  <div class="container">
    <Header />
    <div class="content">
      <div class="content__sidebar">
        <Filters />
      </div>
      <div class="content__main">
        <Sorting />
        <TicketsList />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Filters from '../components/Filters.vue'
import Sorting from '../components/Sorting.vue'
import TicketsList from '../components/TicketsList.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sorting,
    TicketsList,
    Filters
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  gap: 20px;
  padding-bottom: 50px;

  &__main {
    width: 100%;
  }

  &__sidebar {
    flex-shrink: 0;
  }
}
</style>
