<template>
  <SearchForm @trigger-search="searchRestaurants"/>
  <RestaurantsList />
  <button v-if="showLoadMore" @click="fetchRestaurants" class="load-more-button">Load More</button>
  <div v-if="loading" class="loading">Učitavanje...</div>
</template>
<script setup lang="ts">
import {  onMounted, computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search'
//import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
const SearchForm = defineAsyncComponent(() => import('@/components/SearchForm.vue'))
const RestaurantsList = defineAsyncComponent(() => import('@/components/RestaurantsList.vue'))
const store = useSearchStore()

const searchRestaurants = async () => {
  restaurants.value = []
  total.value = 0
  await createSearchToken()
  fetchRestaurants()
}

const { createSearchToken, fetchRestaurants, loginAnonymously } = store
const { restaurants, total, loading } = storeToRefs(store)

const showLoadMore = computed(() => restaurants.value.length < total.value && !loading.value && total.value > 0)

/*useInfiniteScroll(()=>{
  if (restaurants.value.length < total.value && !loading.value) {
    fetchRestaurants()
  }
})*/
onMounted(async () => {
  await loginAnonymously()
  await createSearchToken()
  searchRestaurants()
})
</script>
