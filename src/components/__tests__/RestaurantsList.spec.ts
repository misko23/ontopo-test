import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import RestaurantsList from '@/components/RestaurantsList.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useSearchStore } from '@/stores/search'

describe('RestaurantsList.vue', () => {
  let wrapper: ReturnType<typeof mount>
  let store: ReturnType<typeof useSearchStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSearchStore()
    wrapper = mount(RestaurantsList)
  })

  it('renders the restaurant list when there are restaurants', async () => {
    store.restaurants = [
      {
        availability_id: '1',
        venue_name: 'Restaurant 1',
        recommended: [{ time: '19:00', text: 'Area 1', method: 'method' }],
      },
      {
        availability_id: '2',
        venue_name: 'Restaurant 2',
        recommended: [{ time: '20:00', text: 'Area 2', method: 'method' }],
      },
    ]
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.restaurant-card').length).toBe(2)
  })

  it('does not render the restaurant list when there are no restaurants', async () => {
    store.restaurants = []
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.restaurant-list').exists()).toBe(false)
  })

  it('renders restaurant information correctly', async () => {
    store.restaurants = [
      {
        availability_id: '1',
        venue_name: 'Restaurant 1',
        recommended: [{ time: '19:00', text: 'Area 1', method: 'method' }],
      },
    ]
    await wrapper.vm.$nextTick()
    const restaurantCard = wrapper.find('.restaurant-card')
    expect(restaurantCard.find('.restaurant-name').text()).toBe('Restaurant 1')
    expect(restaurantCard.find('.availability-button').text()).toBe('19:00 • Area 1')
  })
})
