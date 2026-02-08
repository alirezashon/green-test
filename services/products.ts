import { fetchAPI } from "./api";
import type { Product, ProductsResponse } from "@/types/product";

export async function getProducts(
  limit = 30,
  skip = 0
): Promise<ProductsResponse> {
  return fetchAPI<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
}

export async function getProductById(id: number): Promise<Product> {
  return fetchAPI<Product>(`/products/${id}`);
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  return fetchAPI<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(query)}`
  );
}

export async function getCategories(): Promise<string[]> {
  return fetchAPI<string[]>(`/products/categories`);
}

export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  return fetchAPI<ProductsResponse>(`/products/category/${category}`);
}
