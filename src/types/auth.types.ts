// src/types/auth.types.ts

export interface User {
    id: string;
    email: string;
    name: string;
    [key: string]: any;
  }
  
  export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  export interface AuthResponse {
    status: boolean;
    message: string;
    data?: any;
  }
  
  export interface LoginResponse extends AuthResponse {
    refresh_token?: string;
  }
  
  export interface AccessTokenResponse extends AuthResponse {
    access_token?: string;
  }
  
  export interface VerifyResponse extends AuthResponse {
    user?: User;
  }