import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
  it('renders the home page', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('.home-page').exists()).toBe(true)
  })

  it('renders the home image', () => {
    const wrapper = mount(HomeView)
    const img = wrapper.find('.home-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/home.png')
    expect(img.attributes('alt')).toBe('Home Image')
  })
})
