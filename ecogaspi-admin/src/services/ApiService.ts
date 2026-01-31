import { apiClient } from '../utils/apiClient';
import { API_CONFIG } from '../config/api';

// Types génériques pour les réponses
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page: number;
  size: number;
  [key: string]: any; // Pour permettre des paramètres additionnels
}

// Service générique pour les opérations CRUD
class ApiService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // GET avec ou sans pagination
  async getAll<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T[] | PaginatedResponse<T>>> {
    try {
      const queryString = params ? new URLSearchParams(params).toString() : '';
      const url = queryString ? `${endpoint}?${queryString}` : endpoint;
      
      // Construire l'URL correctement, en gérant le cas où baseUrl est vide
      const fullUrl = this.baseUrl ? `${this.baseUrl}/${url}` : url;
      const response = await apiClient.get<T[] | any>(fullUrl);
      
      // Vérifier si la réponse contient des données paginées
      if (response.data && typeof response.data === 'object') {
        let paginatedData = response.data;

        // Si la réponse a une structure { data: { data: [...], ... } }
        if ('data' in response.data && typeof response.data.data === 'object' &&
            'data' in response.data.data && Array.isArray(response.data.data.data)) {
          paginatedData = response.data.data;
        }
        // Si la réponse a directement une structure paginée
        else if ('content' in response.data || ('data' in response.data && Array.isArray(response.data.data))) {
          paginatedData = response.data;
        }

        // Vérifier si c'est une structure paginée
        if (paginatedData && (paginatedData.content || paginatedData.data || paginatedData.totalPages !== undefined)) {
          return {
            success: true,
            data: {
              data: paginatedData.content || paginatedData.data || [],
              currentPage: (paginatedData.number !== undefined ? paginatedData.number : paginatedData.currentPage || 0) + 1,
              totalPages: paginatedData.totalPages || 1,
              totalItems: paginatedData.totalElements || paginatedData.totalItems || 0,
              hasNext: paginatedData.hasNext ?? !paginatedData.last,
              hasPrev: paginatedData.hasPrevious ?? !paginatedData.first,
            } as PaginatedResponse<T>,
            message: response.message
          };
        }
      } else if (Array.isArray(response.data)) {
        // C'est une réponse simple (tableau)
        return {
          success: true,
          data: response.data as T[],
          message: response.message
        };
      } else {
        // C'est une réponse simple (objet unique)
        return {
          success: true,
          data: response.data,
          message: response.message
        };
      }
    } catch (error: any) {
      console.error('ApiService.getAll - Error:', error);
      // Retourner une réponse paginée vide en cas d'erreur
      return {
        success: false,
        data: {
          data: [],
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          hasNext: false,
          hasPrev: false,
        } as PaginatedResponse<T>,
        message: error.response?.data?.message || error.message || 'Erreur lors de la récupération des données',
        errors: [error.response?.data?.message || error.message || 'Erreur inconnue']
      };
    }
  }

  // GET par ID
  async getById<T>(endpoint: string, id: string | number): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
      return {
        success: response.success,
        data: response.data,
        message: response.message
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as T,
        message: error.message || 'Erreur lors de la récupération de l\'élément',
        errors: [error.message || 'Erreur inconnue']
      };
    }
  }

  // POST
  async create<T>(endpoint: string, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.post<T>(`${this.baseUrl}/${endpoint}`, data);
      return {
        success: response.success,
        data: response.data,
        message: response.message
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as T,
        message: error.message || 'Erreur lors de la création',
        errors: [error.message || 'Erreur inconnue']
      };
    }
  }

  // PUT
  async update<T>(endpoint: string, id: string | number, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data);
      return {
        success: response.success,
        data: response.data,
        message: response.message
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as T,
        message: error.message || 'Erreur lors de la mise à jour',
        errors: [error.message || 'Erreur inconnue']
      };
    }
  }

  // DELETE
  async delete(endpoint: string, id: string | number): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.delete(`${this.baseUrl}/${endpoint}/${id}`);
      return {
        success: response.success,
        data: response.data,
        message: response.message
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.message || 'Erreur lors de la suppression',
        errors: [error.message || 'Erreur inconnue']
      };
    }
  }
}

export default ApiService;