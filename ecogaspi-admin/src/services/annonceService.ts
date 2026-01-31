import { apiClient } from '../utils/apiClient';

// Utiliser le client API centralisé qui gère l'authentification
const api = apiClient;

// Définir l'URL de base pour les endpoints admin annonces
const ADMIN_ANNONCES_BASE_URL = '/admin/annonces';

// Interface pour les annonces
export interface Annonce {
  id: number;
  business_id: number;
  product_id: number;
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  bulk_price: number;
  unit: string;
  validation_status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'ACTIVE' | 'INACTIVE';
  validation_comment: string | null;
  validated_by: number | null;
  validated_at: string | null;
  is_active: boolean;
  is_featured: boolean;
  priority: number;
  expires_at: string;
  views: number;
  created_at: string;
  updated_at: string;
}

// Interface pour la réponse de l'API
export interface ApiResponse<T> {
  message: string;
  data?: T;
  success?: boolean; // Ajouté pour compatibilité avec l'ancienne logique
  error?: string;    // Ajouté pour compatibilité avec l'ancienne logique
}

// Service pour la gestion des annonces admin
const annonceAdminService = {
  // Récupérer les annonces en attente
  getPendingAnnonces: async (): Promise<ApiResponse<Annonce[]>> => {
    try {
      const response = await api.get<Annonce[]>(`${ADMIN_ANNONCES_BASE_URL}/pending`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonces en attente récupérées avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite (comme dans le test qui a réussi)
        return {
          message: response.message || 'Annonces en attente récupérées avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la récupération des annonces en attente',
        error: error.response?.data?.message || 'Erreur lors de la récupération des annonces en attente',
        success: false
      };
    }
  },

  // Récupérer les annonces approuvées
  getApprovedAnnonces: async (): Promise<ApiResponse<Annonce[]>> => {
    try {
      const response = await api.get<Annonce[]>(`${ADMIN_ANNONCES_BASE_URL}/approved`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonces approuvées récupérées avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonces approuvées récupérées avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la récupération des annonces approuvées',
        error: error.response?.data?.message || 'Erreur lors de la récupération des annonces approuvées',
        success: false
      };
    }
  },

  // Récupérer les annonces rejetées
  getRejectedAnnonces: async (): Promise<ApiResponse<Annonce[]>> => {
    try {
      const response = await api.get<Annonce[]>(`${ADMIN_ANNONCES_BASE_URL}/rejected`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonces rejetées récupérées avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonces rejetées récupérées avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la récupération des annonces rejetées',
        error: error.response?.data?.message || 'Erreur lors de la récupération des annonces rejetées',
        success: false
      };
    }
  },

  // Récupérer les annonces suspendues
  getSuspendedAnnonces: async (): Promise<ApiResponse<Annonce[]>> => {
    try {
      const response = await api.get<Annonce[]>(`${ADMIN_ANNONCES_BASE_URL}/suspended`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonces suspendues récupérées avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonces suspendues récupérées avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la récupération des annonces suspendues',
        error: error.response?.data?.message || 'Erreur lors de la récupération des annonces suspendues',
        success: false
      };
    }
  },

  // Récupérer une annonce spécifique
  getAnnonceById: async (annonceId: number): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.get<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce récupérée avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce récupérée avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la récupération de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors de la récupération de l\'annonce',
        success: false
      };
    }
  },

  // Approuver une annonce
  approveAnnonce: async (annonceId: number): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.post<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/approve`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce approuvée avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce approuvée avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de l\'approbation de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors de l\'approbation de l\'annonce',
        success: false
      };
    }
  },

  // Rejeter une annonce avec motif
  rejectAnnonce: async (annonceId: number, reason: string): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.post<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/reject`, { reason });
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce rejetée avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce rejetée avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors du rejet de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors du rejet de l\'annonce',
        success: false
      };
    }
  },

  // Suspendre une annonce avec motif
  suspendAnnonce: async (annonceId: number, reason: string): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.post<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/suspend`, { reason });
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce suspendue avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce suspendue avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la suspension de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors de la suspension de l\'annonce',
        success: false
      };
    }
  },

  // Activer une annonce
  activateAnnonce: async (annonceId: number): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.put<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/activate`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce activée avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce activée avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de l\'activation de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors de l\'activation de l\'annonce',
        success: false
      };
    }
  },

  // Désactiver une annonce
  deactivateAnnonce: async (annonceId: number): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.put<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/deactivate`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce désactivée avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce désactivée avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la désactivation de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors de la désactivation de l\'annonce',
        success: false
      };
    }
  },

  // Mettre une annonce en vedette
  featureAnnonce: async (annonceId: number): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.put<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/feature`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce mise en vedette avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce mise en vedette avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors de la mise en vedette de l\'annonce',
        error: error.response?.data?.message || 'Erreur lors de la mise en vedette de l\'annonce',
        success: false
      };
    }
  },

  // Retirer une annonce des vedettes
  unfeatureAnnonce: async (annonceId: number): Promise<ApiResponse<Annonce>> => {
    try {
      const response = await api.put<Annonce>(`${ADMIN_ANNONCES_BASE_URL}/${annonceId}/unfeature`);
      // Gérer la réponse selon la structure réelle de l'API
      if (response.success !== undefined) {
        // Format de réponse avec succès explicite
        return {
          message: response.message || 'Annonce retirée des vedettes avec succès',
          data: response.data,
          success: response.success
        };
      } else {
        // Format de réponse sans succès explicite
        return {
          message: response.message || 'Annonce retirée des vedettes avec succès',
          data: response.data,
          success: true
        };
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || 'Erreur lors du retrait de l\'annonce des vedettes',
        error: error.response?.data?.message || 'Erreur lors du retrait de l\'annonce des vedettes',
        success: false
      };
    }
  }
};

export default annonceAdminService;