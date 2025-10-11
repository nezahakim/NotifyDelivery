import * as SecureStore from 'expo-secure-store';
import { AUTH_URL } from '@/src/constants/utils';
import type {
  LoginResponse,
  AccessTokenResponse,
  VerifyTokenResponse,
  User,
  AuthTokens,
} from '@/src/types/auth.types';

// Storage keys
const STORAGE_KEYS = {
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
  USER_INFO: 'user_info',
} as const;

// Auth API Service
export class AuthService {
  /**
   * Store refresh token and initiate authentication flow
   */
  static async login(token: string): Promise<LoginResponse> {
    try {
      if (!token) {
        return {
          status: false,
          message: 'No token provided',
        };
      }

      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, token);

      return {
        status: true,
        message: 'Login successful',
        refresh_token: token,
      };
    } catch (error) {
      return {
        status: false,
        message: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  /**
   * Get access token using refresh token
   */
  static async getAccessToken(refreshToken: string): Promise<AccessTokenResponse> {
    try {
      const response = await fetch(`${AUTH_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.accessToken) {
        throw new Error('No access token in response');
      }

      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);

      return {
        status: true,
        message: 'Access token retrieved',
        access_token: data.accessToken,
      };
    } catch (error) {
      return {
        status: false,
        message: error instanceof Error ? error.message : 'Failed to get access token',
      };
    }
  }

  /**
   * Verify access token and get user data
   */
  static async verifyAccessToken(accessToken: string): Promise<VerifyTokenResponse> {
    try {
      const response = await fetch(`${AUTH_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Token verification failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.user) {
        throw new Error('No user data in response');
      }

      await SecureStore.setItemAsync(STORAGE_KEYS.USER_INFO, JSON.stringify(data.user));

      return {
        status: true,
        message: 'Token verified',
        user: data.user,
      };
    } catch (error) {
      return {
        status: false,
        message: error instanceof Error ? error.message : 'Token verification failed',
      };
    }
  }

  /**
   * Get stored tokens
   */
  static async getStoredTokens(): Promise<Partial<AuthTokens>> {
    const [refreshToken, accessToken] = await Promise.all([
      SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
    ]);

    return {
      refreshToken: refreshToken || undefined,
      accessToken: accessToken || undefined,
    };
  }

  /**
   * Get stored user
   */
  static async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await SecureStore.getItemAsync(STORAGE_KEYS.USER_INFO);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const isSecureStoreAvailable = (await SecureStore.isAvailableAsync?.()) ?? false;
    
    if (!isSecureStoreAvailable) {
      return false;
    }

    const [user, refreshToken] = await Promise.all([
      SecureStore.getItemAsync(STORAGE_KEYS.USER_INFO),
      SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
    ]);

    return !!(user && refreshToken);
  }

  /**
   * Clear all stored auth data
   */
  static async clearAuth(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.USER_INFO),
    ]);
  }

  /**
   * Complete authentication flow
   */
  static async authenticateUser(token: string): Promise<VerifyTokenResponse> {
    // Step 1: Login and store refresh token
    const loginResult = await this.login(token);
    if (!loginResult.status || !loginResult.refresh_token) {
      return {
        status: false,
        message: loginResult.message || 'Login failed',
      };
    }

    // Step 2: Get access token
    const accessTokenResult = await this.getAccessToken(loginResult.refresh_token);
    if (!accessTokenResult.status || !accessTokenResult.access_token) {
      return {
        status: false,
        message: accessTokenResult.message || 'Failed to get access token',
      };
    }

    // Step 3: Verify token and get user
    const verifyResult = await this.verifyAccessToken(accessTokenResult.access_token);
    return verifyResult;
  }
}