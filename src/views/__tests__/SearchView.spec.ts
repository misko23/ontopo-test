import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SearchView from '@/views/SearchView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useSearchStore } from '@/stores/search'

describe('SearchView.vue', () => {
  let wrapper: ReturnType<typeof mount>
  let store: ReturnType<typeof useSearchStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSearchStore()
    wrapper = mount(SearchView)
  })

  it('renders the "Load More" button when showLoadMore is true', async () => {
    store.total = 10
    store.restaurants = [
      {
        availability_id: '1',
        venue_name: 'Restaurant 1',
        recommended: [{ time: '19:00', text: 'Area 1', method: 'method' }],
      },
    ]
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.load-more-button').exists()).toBe(true)
  })

  it('displays loading state when loading is true', async () => {
    store.loading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.loading').exists()).toBe(true)
  })
})
