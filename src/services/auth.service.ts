// src/services/auth.service.ts

import * as SecureStore from 'expo-secure-store';
import { AUTH_URL } from '../constants/utils';
import type { 
  LoginResponse, 
  AccessTokenResponse, 
  VerifyResponse, 
  User 
} from '../types/auth.types';

// Secure Store Keys
const STORAGE_KEYS = {
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
} as const;

class AuthService {
  /**
   * Extracts token from callback URL and stores refresh token
   */
  async loginWithCallback(url: string): Promise<LoginResponse> {
    try {
      const token = new URL(url).searchParams.get('token');
      
      if (!token) {
        return {
          status: false,
          message: 'No token found in callback URL',
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
   * Exchanges refresh token for access token
   */
  async getAccessToken(refreshToken: string): Promise<AccessTokenResponse> {
    try {
      const response = await fetch(`${AUTH_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
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
   * Verifies access token and retrieves user data
   */
  async verifyAccessToken(accessToken: string): Promise<VerifyResponse> {
    try {
      const response = await fetch(`${AUTH_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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

      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(data.user));

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
   * Complete authentication flow: login -> get access token -> verify
   */
  async authenticateWithCallback(url: string): Promise<VerifyResponse> {
    const loginResult = await this.loginWithCallback(url);
    if (!loginResult.status || !loginResult.refresh_token) {
      return { status: false, message: loginResult.message };
    }

    const tokenResult = await this.getAccessToken(loginResult.refresh_token);
    if (!tokenResult.status || !tokenResult.access_token) {
      return { status: false, message: tokenResult.message };
    }

    return await this.verifyAccessToken(tokenResult.access_token);
  }

  /**
   * Check if user is authenticated by verifying stored tokens
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const isAvailable = (await SecureStore.isAvailableAsync?.()) ?? false;
      if (!isAvailable) return false;

      const user = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
      const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);

      return !!(user && refreshToken);
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Get stored user data
   */
  async getStoredUser(): Promise<User | null> {
    try {
      const userStr = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  /**
   * Get stored refresh token
   */
  async getStoredRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Get stored access token
   */
  async getStoredAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Logout - clear all stored auth data
   */
  async logout(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
        SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      ]);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();