import { fetchAPI } from "./api";
import type { User, UsersResponse } from "@/types/user";

export async function getUsers(
  limit = 30,
  skip = 0
): Promise<UsersResponse> {
  return fetchAPI<UsersResponse>(`/users?limit=${limit}&skip=${skip}`);
}

export async function getUserById(id: number): Promise<User> {
  return fetchAPI<User>(`/users/${id}`);
}

export async function searchUsers(query: string): Promise<UsersResponse> {
  return fetchAPI<UsersResponse>(
    `/users/search?q=${encodeURIComponent(query)}`
  );
}
