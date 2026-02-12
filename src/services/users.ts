import { fetchDummyAPI } from './api'
import type { User, UsersResponse } from '@/types/user'

export async function getUsers(limit = 30, skip = 0): Promise<UsersResponse> {
  return fetchDummyAPI<UsersResponse>(`/users?limit=${limit}&skip=${skip}`)
}

export async function getUserById(id: number): Promise<User> {
  return fetchDummyAPI<User>(`/users/${id}`)
}

export async function searchUsers(query: string): Promise<UsersResponse> {
  return fetchDummyAPI<UsersResponse>(`/users/search?q=${encodeURIComponent(query)}`)
}
