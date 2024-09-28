export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface DecodedToken {
  exp: number;
  iat: number;
  user?: User | null;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  role: string;
  emailVerified: boolean;
  profile: string;
} 
