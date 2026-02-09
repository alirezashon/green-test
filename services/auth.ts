import {
  deleteCookieByKey,
  getCookieByKey,
  setCookieByTagAndValue,
} from '@/action/cookies'
import { fetchDummyAPI } from './api'

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  accessToken: string
  refreshToken: string
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return fetchDummyAPI<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export const getAuthToken = async () => {
  return await getCookieByKey(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`)
}

export const setAuthToken = async (token: string) => {
  await setCookieByTagAndValue({
    key: `${process.env.NEXT_PUBLIC_TOKEN_NAME}`,
    value: token,
  })
}

export const removeAuthToken = async () => {
  await deleteCookieByKey(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`)
}

export const isAuthenticated = async () => {
  return typeof (await getAuthToken()) === 'string'
}
