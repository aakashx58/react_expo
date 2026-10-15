export type Role = 'customer' | 'restaurant';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: Role;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
}