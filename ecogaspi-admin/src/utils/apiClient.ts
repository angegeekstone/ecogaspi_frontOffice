import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../config/environment';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.fullApiUrlV1,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        if (env.debug) {
          console.log(`🚀 API Request [${config.method?.toUpperCase()}]:`, config.url);
        }

        return config;
      },
      (error) => {
        if (env.debug) {
          console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        if (env.debug) {
          console.log(`✅ API Response [${response.status}]:`, response.config.url, response.data);
        }
        return response;
      },
      async (error) => {
        if (env.debug) {
          console.error('❌ Response Error:', error.response?.data || error.message);
        }

        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh the token
            const refreshToken = localStorage.getItem('ecogaspi_admin_refresh_token');

            if (refreshToken) {
              // Create a temporary axios instance without interceptors to avoid infinite loop
              const tempAxios = axios.create({
                baseURL: env.fullApiUrl,
                timeout: API_CONFIG.timeout,
                headers: API_CONFIG.headers
              });

              // Call the refresh endpoint using the full URL
              const refreshResponse = await tempAxios.post(API_ENDPOINTS.auth.refresh, {
                refreshToken
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              // Assuming the response follows the format: { success: true, data: {...} }
              if (refreshResponse.data.success && refreshResponse.data.data) {
                const newAccessToken = refreshResponse.data.data.accessToken;

                // Update the token in localStorage and in the request
                localStorage.setItem('ecogaspi_admin_token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Also update the refresh token if it was rotated
                if (refreshResponse.data.data.refreshToken) {
                  localStorage.setItem('ecogaspi_admin_refresh_token', refreshResponse.data.data.refreshToken);
                }

                // Update the user info if it was returned
                if (refreshResponse.data.data.user) {
                  localStorage.setItem('ecogaspi_admin_user', JSON.stringify(refreshResponse.data.data.user));
                }

                // Retry the original request
                return this.client(originalRequest);
              }
            }
          } catch (refreshError) {
            console.error('❌ Failed to refresh token:', refreshError);
            // If refresh fails, clear tokens and redirect to login
            this.handleUnauthorized();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('ecogaspi_admin_token');
  }

  private handleUnauthorized(): void {
    // Clear all auth tokens
    localStorage.removeItem('ecogaspi_admin_token');
    localStorage.removeItem('ecogaspi_admin_refresh_token');
    localStorage.removeItem('ecogaspi_admin_user');

    // Dispatch custom event to notify the app about the logout
    window.dispatchEvent(new Event('autoLogout'));

    if (env.debug) {
      console.warn('🔒 Unauthorized - Tokens cleared and logout event dispatched');
    }
  }

  private resolveUrl(url: string): string {
    // Si l'URL commence par http/https, c'est une URL absolue
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Si l'URL commence par env.apiBaseUrl, c'est une URL complète vers notre API
    if (url.startsWith(env.apiBaseUrl)) {
      return url;
    }

    // Sinon, utiliser l'URL relative par défaut
    return url;
  }

  // Generic API methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const requestUrl = this.resolveUrl(url);
    const response = await this.client.get(requestUrl, config);

    // Si la réponse a déjà un champ success, c'est une ApiResponse
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ApiResponse<T>;
    }

    // Si la réponse a un champ data et message, c'est une réponse standard de l'API
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      } as ApiResponse<T>;
    }

    // Sinon, wrapper la réponse pour la compatibilité
    return {
      success: true,
      data: response.data
    } as ApiResponse<T>;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const requestUrl = this.resolveUrl(url);
    const response = await this.client.post<T>(requestUrl, data, config);

    // Si la réponse a déjà un champ success, c'est une ApiResponse
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as unknown as ApiResponse<T>;
    }

    // Sinon, wrapper la réponse pour la compatibilité
    return {
      success: true,
      data: response.data
    } as ApiResponse<T>;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const requestUrl = this.resolveUrl(url);
    const response = await this.client.put<ApiResponse<T>>(requestUrl, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const requestUrl = this.resolveUrl(url);
    const response = await this.client.patch<ApiResponse<T>>(requestUrl, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const requestUrl = this.resolveUrl(url);
    const response = await this.client.delete<ApiResponse<T>>(requestUrl, config);
    return response.data;
  }

  // File upload method
  async uploadFile<T>(url: string, file: File, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });

    return response.data;
  }

  // Set authentication token
  setAuthToken(token: string): void {
    localStorage.setItem('ecogaspi_admin_token', token);
  }

  // Clear authentication token
  clearAuthToken(): void {
    localStorage.removeItem('ecogaspi_admin_token');
  }

  // Get current environment info
  getEnvironmentInfo(): void {
    env.logEnvironmentInfo();
  }
}

export const apiClient = new ApiClient();
export default apiClient;