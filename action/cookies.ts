'use server'
import { cookies } from 'next/headers'

export async function getCookieByKey(name: string) {
  const store = await cookies()
  return store.get(name)?.value
}
export async function setCookieByTagAndValue({
  key,
  value,
  path = '/',
}: {
  key: string
  value: string
  path?: string
}) {
  const store = await cookies()
  store.set(key, value, {
    path,
  })
}

export async function deleteCookieByKey(key: string) {
  const store = await cookies()
  store.delete(key)
}
