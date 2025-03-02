import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSearchStore } from '@/stores/search'
import { fetchWrapper } from '@/utils/fetchWrapper'

vi.mock('@/utils/fetchWrapper')

describe('useSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('logs in anonymously', async () => {
    const store = useSearchStore()
    const mockResponse = { jwt_token: 'test_token', refresh_token: 'test_refresh_token' }
    vi.mocked(fetchWrapper).mockResolvedValueOnce(mockResponse)

    await store.loginAnonymously()

    expect(store.jwtToken).toBe('test_token')
    expect(store.error).toBeNull()
  })

  it('handles login failure', async () => {
    const store = useSearchStore()
    vi.mocked(fetchWrapper).mockRejectedValueOnce(new Error('Login failed'))

    await expect(store.loginAnonymously()).rejects.toThrow('Login failed')
    expect(store.error).toBe('Login failed')
  })

  it('creates search token', async () => {
    const store = useSearchStore()
    store.jwtToken = 'test_token'
    const mockResponse = { search_id: 'test_search_id' }
    vi.mocked(fetchWrapper).mockResolvedValueOnce(mockResponse)

    await store.createSearchToken()

    expect(store.searchId).toBe('test_search_id')
    expect(store.error).toBeNull()
  })

  it('handles search token creation failure', async () => {
    const store = useSearchStore()
    store.jwtToken = 'test_token'
    vi.mocked(fetchWrapper).mockRejectedValueOnce(new Error('Failed to create search token'))

    await expect(store.createSearchToken()).rejects.toThrow('Failed to create search token')
    expect(store.error).toBe('Failed to create search token')
  })

  it('fetches restaurants', async () => {
    const store = useSearchStore()
    store.jwtToken = 'test_token'
    store.searchId = 'test_search_id'
    const mockResponse = {
      posts: [
        {
          post: { venue_name: 'Restaurant A' },
          availability: {
            availability_id: 'avail_1',
            recommended: [{ time: '19:00', method: 'dine-in', text: 'Recommended' }],
          },
        },
      ],
      total: 1,
    }
    vi.mocked(fetchWrapper).mockResolvedValueOnce(mockResponse)

    await store.fetchRestaurants()

    expect(store.restaurants).toEqual([
      {
        venue_name: 'Restaurant A',
        availability_id: 'avail_1',
        recommended: [{ time: '19:00', method: 'dine-in', text: 'Recommended' }],
      },
    ])
    expect(store.total).toBe(1)
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('handles fetch restaurants failure', async () => {
    const store = useSearchStore()
    store.jwtToken = 'test_token'
    store.searchId = 'test_search_id'
    vi.mocked(fetchWrapper).mockRejectedValueOnce(new Error('Failed to fetch restaurants'))

    await expect(store.fetchRestaurants()).rejects.toThrow('Failed to fetch restaurants')
    expect(store.error).toBe('Failed to fetch restaurants')
    expect(store.loading).toBe(false)
  })
})
