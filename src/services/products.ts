import { fetchDummyAPI } from './api'
import type { Product, ProductsResponse } from '@/types/product'

export async function getProducts(
  limit = 30,
  skip = 0,
): Promise<ProductsResponse> {
  return fetchDummyAPI<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`)
}

export async function getProductById(id: number): Promise<Product> {
  return fetchDummyAPI<Product>(`/products/${id}`)
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  return fetchDummyAPI<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(query)}`,
  )
}

export async function getCategories(): Promise<string[]> {
  return fetchDummyAPI<string[]>(`/products/categories`)
}

export async function getProductsByCategory(
  category: string,
): Promise<ProductsResponse> {
  return fetchDummyAPI<ProductsResponse>(`/products/category/${category}`)
}
