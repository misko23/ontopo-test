<template>
  <div class="restaurant-list" v-if="restaurants.length>0">
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.availability_id"
      class="restaurant-card"
    >
      <img :src="'/restaurant-placeholder.png'" alt="Restaurant Image" class="restaurant-image" />
      <div class="restaurant-info">
        <h2 class="restaurant-name">{{ restaurant.venue_name }}</h2>
        <div class="availability">
          <button
            v-for="area in restaurant.recommended"
            :key="area.text"
            class="availability-button"
          >
            {{ area.time }} • {{ area.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search'
import { defineComponent } from 'vue'

defineComponent({
  name: 'RestaurantsList',
})

const store = useSearchStore()
const { restaurants } = storeToRefs(store)

</script>
<style scoped>


/* Restaurant list */
.restaurant-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Restaurant card */
.restaurant-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.restaurant-image {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 15px;
}

.restaurant-info {
  flex: 1;
}

.restaurant-name {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.restaurant-location {
  font-size: 14px;
  color: #777;
}

.availability {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.availability-button {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .search-bar {
    grid-template-columns: 1fr 1fr;
  }
  .restaurant-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .restaurant-info {
    width: 100%;
  }

  .restaurant-image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  .availability {
    flex-wrap: wrap;
  }
}
@media (max-width: 480px) {
  .search-bar {
    grid-template-columns: 1fr;
  }
  .restaurant-card {
    padding: 10px;
  }

  .availability-button {
    width: 100%;
    text-align: center;
  }
}
</style>
