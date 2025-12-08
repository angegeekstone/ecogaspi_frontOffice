import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../config/environment';
import { API_CONFIG } from '../config/api';

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
      baseURL: env.fullApiUrl,
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
      (error) => {
        if (env.debug) {
          console.error('❌ Response Error:', error.response?.data || error.message);
        }

        // Handle specific error cases
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('ecogaspi_admin_token');
  }

  private handleUnauthorized(): void {
    // Clear token and redirect to login
    localStorage.removeItem('ecogaspi_admin_token');
    // You can add redirect logic here
    if (env.debug) {
      console.warn('🔒 Unauthorized - Token cleared');
    }
  }

  // Generic API methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
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