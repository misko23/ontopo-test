import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { useInfiniteScroll } from '../useInfiniteScroll'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('useInfiniteScroll', () => {
  let callback: () => void

  beforeEach(() => {
    callback = vi.fn()
    document.documentElement.scrollTop = 0
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      configurable: true,
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 500,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const TestComponent = defineComponent({
    setup() {
      useInfiniteScroll(callback)
      return () => h('div')
    },
  })

  it('should call callback when scrolled to the bottom', async () => {
    mount(TestComponent)
    document.documentElement.scrollTop = 600
    window.dispatchEvent(new Event('scroll'))
    expect(callback).toHaveBeenCalled()
  })

  it('should not call callback when not scrolled to the bottom', async () => {
    mount(TestComponent)
    document.documentElement.scrollTop = 300
    window.dispatchEvent(new Event('scroll'))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should remove event listener on unmount', async () => {
    const wrapper = mount(TestComponent)
    wrapper.unmount()
    document.documentElement.scrollTop = 600
    window.dispatchEvent(new Event('scroll'))
    expect(callback).not.toHaveBeenCalled()
  })
})
