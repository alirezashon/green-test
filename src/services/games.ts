import { fetchRAWGAPI } from './api'
import {
  Game,
  GameDetails,
  GamesQueryParams,
  PaginatedResponse,
  NamedEntity,
} from './rawg'

export async function getGames(
  params?: GamesQueryParams,
): Promise<PaginatedResponse<Game>> {
  return fetchRAWGAPI<PaginatedResponse<Game>>('/games', undefined, params)
}

export async function getGameById(id: number | string): Promise<GameDetails> {
  return fetchRAWGAPI<GameDetails>(`/games/${id}`)
}

export async function getGenres(): Promise<PaginatedResponse<NamedEntity>> {
  return fetchRAWGAPI<PaginatedResponse<NamedEntity>>('/genres')
}

export async function getPlatforms(): Promise<PaginatedResponse<NamedEntity>> {
  return fetchRAWGAPI<PaginatedResponse<NamedEntity>>('/platforms')
}
