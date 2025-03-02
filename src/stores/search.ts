import { defineStore } from 'pinia'
import { fetchWrapper } from '@/utils/fetchWrapper'
import type { Restaurant, SearchCriteria, SearchResponse } from '@/types/RestaurantTypes'
const API_BASE = 'https://site.ontopo.work/api'

export const useSearchStore = defineStore('search', {
  state: () => ({
    jwtToken: '' as string,
    searchId: '' as string,
    restaurants: [] as Restaurant[],
    total: 0,
    searchCriteria: { size: '2', date: '20250313', time: '1900' } as SearchCriteria,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loginAnonymously() {
      try {
        const response = await fetchWrapper<{ jwt_token: string; refresh_token: string }>(
          `${API_BASE}/loginAnonymously`,
          'POST',
        )
        this.jwtToken = response.jwt_token
      } catch (error) {
        this.error = 'Login failed'
        throw new Error((error as Error).message)
      }
    },
    async createSearchToken() {
      try {
        const response = await fetchWrapper<{ search_id: string }>(
          `${API_BASE}/search_token`,
          'POST',
          {
            criteria: this.searchCriteria as SearchCriteria,
            marketplace_id: '15380287',
            locale: 'en',
            geocodes: ['belgrade'],
          },
          this.jwtToken,
        )
        this.searchId = response.search_id
      } catch (error) {
        this.error = 'Failed to create search token'
        throw new Error((error as Error).message)
      }
    },
    async fetchRestaurants() {
      if (!this.searchId) return
      this.loading = true
      try {
        const response = await fetchWrapper<SearchResponse>(
          `${API_BASE}/search_request`,
          'POST',
          { search_id: this.searchId },
          this.jwtToken,
        )
        const newRestaurants = response.posts.map((post) => ({
          venue_name: post.post.venue_name,
          availability_id: post.availability.availability_id,
          recommended: post.availability.recommended,
        }))
        this.total = response.total
        this.restaurants = [...this.restaurants, ...newRestaurants]
      } catch (error) {
        this.error = 'Failed to fetch restaurants'
        throw new Error((error as Error).message)
      } finally {
        this.loading = false
      }
    },
  },
})
