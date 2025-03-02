import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SearchForm from '@/components/SearchForm.vue'
import { createPinia, setActivePinia } from 'pinia'

let wrapper: ReturnType<typeof mount>

beforeEach(() => {
  setActivePinia(createPinia())
  wrapper = mount(SearchForm)
})
// Test cases
describe('SearchForm.vue', () => {
  it('renders the form correctly', () => {
    expect(wrapper.find('div.search-bar').exists()).toBe(true)
  })

  it('has three input fields', () => {
    const inputs = wrapper.findAll('input.search-input')
    expect(inputs.length).toBe(3)
  })

  it('emits trigger-search event on button click', async () => {
    await wrapper.find('button.search-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('trigger-search')
  })

  it('has correct placeholder texts', () => {
    const placeholders = ['Broj osoba', 'Dan', 'Vreme']
    const inputs = wrapper.findAll('input.search-input')
    inputs.forEach((input, index) => {
      expect(input.attributes('placeholder')).toBe(placeholders[index])
    })
  })

  it('button has correct text', () => {
    const button = wrapper.find('button.search-button')
    expect(button.text()).toBe('Pretraži')
  })
})
