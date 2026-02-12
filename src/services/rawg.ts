// Paginated Response
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Rating Interface
export interface Rating {
  id: number
  title: 'exceptional' | 'recommended' | 'meh' | 'skip'
  count: number
  percent: number
}

// Added By Status Interface
export interface AddedByStatus {
  yet?: number
  owned?: number
  beaten?: number
  toplay?: number
  dropped?: number
  playing?: number
}

// Platform Interface (matches API response)
export interface Platform {
  id: number
  name: string
  slug: string
  image: string | null
  year_end: number | null
  year_start: number | null
  games_count: number
  image_background: string
}

// Platform Requirements Interface
export interface PlatformRequirements {
  minimum?: string
  recommended?: string
}

// Game Platform Wrapper Interface
export interface GamePlatformWrapper {
  platform: Platform
  released_at?: string | null
  requirements_en?: PlatformRequirements | null
  requirements_ru?: PlatformRequirements | null
}

// Named Entity Interface (for genres, tags, developers, publishers)
export interface NamedEntity {
  id: number
  name: string
  slug: string
  games_count?: number
  image_background?: string
}

// Game Interface (matches API response)
export interface Game {
  id: number
  slug: string
  name: string
  released: string
  tba: boolean
  background_image: string | null
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number | null
  playtime: number
  suggestions_count: number
  updated: string
  user_game: any | null
  reviews_count: number
  saturated_color: string
  dominant_color: string
  platforms: GamePlatformWrapper[]
}

// Game Details Interface (extends Game with additional fields)
export interface GameDetails extends Game {
  description_raw?: string
  description?: string
  website?: string
  developers?: NamedEntity[]
  publishers?: NamedEntity[]
  genres?: NamedEntity[]
  tags?: NamedEntity[]
  stores?: GameStore[]
  short_screenshots?: ShortScreenshot[]
  parent_platforms?: GamePlatformWrapper[]
  esrb_rating?: EsrbRating | null
  clip?: any | null
}

// Game Store Interface
export interface GameStore {
  id: number
  store: NamedEntity
  url: string
}

// Short Screenshot Interface
export interface ShortScreenshot {
  id: number
  image: string
}

// ESRB Rating Interface
export interface EsrbRating {
  id: number
  name: string
  slug: string
}

// Games Query Parameters Interface
export interface GamesQueryParams {
  page?: number
  page_size?: number
  search?: string
  search_precise?: boolean
  search_exact?: boolean
  ordering?: string
  genres?: string
  platforms?: string
  stores?: string
  developers?: string
  publishers?: string
  tags?: string
  creators?: string
  dates?: string
  updated?: string
  platforms_count?: number
  metacritic?: string
  exclude_collection?: number
  exclude_additions?: boolean
  exclude_parents?: boolean
  exclude_game_series?: boolean
  exclude_stores?: string
}
