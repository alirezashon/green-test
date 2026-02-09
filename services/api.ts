import { getAuthToken } from './auth'
import { GamesQueryParams } from './rawg'

export async function fetchDummyAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const token = await getAuthToken()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DUMMY_JSON_BASE_URL}${endpoint}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options?.headers,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
export async function fetchRAWGAPI<T>(
  endpoint: string,
  options?: RequestInit,
  params?: GamesQueryParams,
): Promise<T> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_RAWG_API_BASE_URL || 'https://api.rawg.io/api'
    const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY || ''
    
    const queryParams = new URLSearchParams({
      key: apiKey,
    })
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(','))
          } else {
            queryParams.append(key, String(value))
          }
        }
      })
    }
    
    const url = `${baseUrl}${endpoint}?${queryParams.toString()}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
