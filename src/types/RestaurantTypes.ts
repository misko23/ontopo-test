type RecommendedOption = {
  time: string
  method: string
  text: string
}

type PostData = {
  venue_name: string
}

type RestaurantPost = {
  post: PostData
  availability: {
    availability_id: string
    recommended: RecommendedOption[]
  }
}

export interface SearchCriteria {
  date: string
  time: string
  size: string
}

export interface SearchResponse {
  posts: RestaurantPost[]
  total: number
}

export interface Restaurant {
  venue_name: string
  availability_id: string
  recommended: RecommendedOption[]
}
