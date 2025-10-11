export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
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

export interface VerifyTokenResponse extends AuthResponse {
  user?: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}