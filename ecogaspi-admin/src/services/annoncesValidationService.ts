import { apiClient } from '../utils/apiClient';
import env from '../config/environment';

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
  updated_at?: string;
}

export interface ValidationRequest {
  validatorId: string;
  validatorName: string;
  comment: string;
  reason?: string;
}

export interface ValidationHistory {
  id: string;
  annonceId: string;
  action: 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  validatorId: string;
  validatorName: string;
  comment: string;
  reason: string | null;
  timestamp: string;
}

export interface ValidationStats {
  pending: number;
  approved: number;
  rejected: number;
  suspended: number;
}

class AnnoncesValidationService {
  private readonly baseUrl = `${env.fullApiUrl}/admin/annonces`;

  async getPendingAnnonces(): Promise<Annonce[]> {
    const response = await apiClient.get(`${this.baseUrl}/pending`);
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Format de réponse inattendu pour annonces en attente:', response);
      return [];
    }
  }

  async getApprovedAnnonces(): Promise<Annonce[]> {
    const response = await apiClient.get(`${this.baseUrl}/approved`);
    console.log('Réponse pour annonces approuvées:', response);

    // apiClient.get() retourne response.data, donc ici response est déjà le corps de la réponse
    // La réponse devrait être de la forme {message: "...", data: [...]}
    // Donc on extrait le tableau depuis response.data
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Format de réponse inattendu pour annonces approuvées:', response);
      return [];
    }
  }

  async getRejectedAnnonces(): Promise<Annonce[]> {
    const response = await apiClient.get(`${this.baseUrl}/rejected`);
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Format de réponse inattendu pour annonces rejetées:', response);
      return [];
    }
  }

  async getSuspendedAnnonces(): Promise<Annonce[]> {
    const response = await apiClient.get(`${this.baseUrl}/suspended`);
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Format de réponse inattendu pour annonces suspendues:', response);
      return [];
    }
  }

  async getAnnonceById(annonceId: number): Promise<Annonce> {
    const response = await apiClient.get(`${this.baseUrl}/${annonceId}`);
    if (response && response.data) {
      return response.data as Annonce;
    } else {
      console.error('Format de réponse inattendu pour une annonce:', response);
      throw new Error('Impossible de récupérer l\'annonce');
    }
  }

  async approveAnnonce(annonceId: number, validationData: ValidationRequest): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${annonceId}/approve`, validationData);
  }

  async rejectAnnonce(annonceId: number, validationData: ValidationRequest & { reason: string }): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${annonceId}/reject`, validationData);
  }

  async suspendAnnonce(annonceId: number, validationData: ValidationRequest & { reason: string }): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${annonceId}/suspend`, validationData);
  }

  async getValidationHistory(annonceId: number): Promise<ValidationHistory[]> {
    const response = await apiClient.get(`${this.baseUrl}/${annonceId}/history`);
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Format de réponse inattendu pour l\'historique de validation:', response);
      return [];
    }
  }

  async getValidationStats(): Promise<ValidationStats> {
    const response = await apiClient.get<any>(`${this.baseUrl}/stats`);

    // Extraire la partie data de la réponse
    const responseData = response.data;
    const apiData = responseData.data || {}; // S'assurer que apiData n'est jamais undefined

    const stats: ValidationStats = {
      pending: apiData.pending_count || 0,
      approved: apiData.approved_count || 0,
      rejected: apiData.rejected_count || 0,
      suspended: apiData.suspended_count || 0
    };

    return stats;
  }
}

export const annoncesValidationService = new AnnoncesValidationService();