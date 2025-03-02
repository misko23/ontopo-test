import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppHeader, {
      slots: {
        title: 'Test Title',
      },
    })
    expect(wrapper.find('h1').text()).toBe('Test Title')
  })
})
