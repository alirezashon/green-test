
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[],
  sku: string,
  weight: number,
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Generic fetch function for DummyJSON API
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DUMMY_JSON_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * Products API
 */
export const productsAPI = {
  getAll: async (limit = 30, skip = 0): Promise<ProductsResponse> => {
    return fetchAPI<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  },
  getById: async (id: number): Promise<Product> => {
    return fetchAPI<Product>(`/products/${id}`);
  },
  search: async (query: string): Promise<ProductsResponse> => {
    return fetchAPI<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
  },
  getCategories: async (): Promise<string[]> => {
    return fetchAPI<string[]>(`/products/categories`);
  },
  getByCategory: async (category: string): Promise<ProductsResponse> => {
    return fetchAPI<ProductsResponse>(`/products/category/${category}`);
  },
};

/**
 * Users API
 */
export const usersAPI = {
  getAll: async (limit = 30, skip = 0): Promise<UsersResponse> => {
    return fetchAPI<UsersResponse>(`/users?limit=${limit}&skip=${skip}`);
  },
  getById: async (id: number): Promise<User> => {
    return fetchAPI<User>(`/users/${id}`);
  },
  search: async (query: string): Promise<UsersResponse> => {
    return fetchAPI<UsersResponse>(`/users/search?q=${encodeURIComponent(query)}`);
  },
};

/**
 * Todos API
 */
export const todosAPI = {
  getAll: async (limit = 30, skip = 0): Promise<TodosResponse> => {
    return fetchAPI<TodosResponse>(`/todos?limit=${limit}&skip=${skip}`);
  },
  getById: async (id: number): Promise<Todo> => {
    return fetchAPI<Todo>(`/todos/${id}`);
  },
  getRandom: async (): Promise<Todo> => {
    return fetchAPI<Todo>(`/todos/random`);
  },
};

/**
 * Posts API
 */
export const postsAPI = {
  getAll: async (limit = 30, skip = 0): Promise<PostsResponse> => {
    return fetchAPI<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`);
  },
  getById: async (id: number): Promise<Post> => {
    return fetchAPI<Post>(`/posts/${id}`);
  },
  getByUserId: async (userId: number): Promise<PostsResponse> => {
    return fetchAPI<PostsResponse>(`/posts/user/${userId}`);
  },
  search: async (query: string): Promise<PostsResponse> => {
    return fetchAPI<PostsResponse>(`/posts/search?q=${encodeURIComponent(query)}`);
  },
};
