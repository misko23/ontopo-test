<template>
  <div class="search-bar">
    <input type="text" v-model="searchCriteria.size" required class="search-input" placeholder="Broj osoba" />
    <input type="text" v-model="searchCriteria.date" required class="search-input" placeholder="Dan" />
    <input type="text" v-model="searchCriteria.time" required class="search-input" placeholder="Vreme" />
    <button class="search-button" @click="$emit('trigger-search')">Pretraži</button>
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
defineComponent({
  emits: ['trigger-search'],
  name: 'SearchForm',
})
const store = useSearchStore()
const { searchCriteria} = storeToRefs(store)

</script>
<style scoped>
/* Search bar */
.search-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 10px;
  background: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-button {
  background: black;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
@media (max-width: 768px) {
  .search-bar {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 480px) {
  .search-bar {
    grid-template-columns: 1fr;
  }
}
</style>
