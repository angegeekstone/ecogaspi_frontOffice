import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { Merchant } from '../types';

interface MerchantListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  verified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface MerchantStats {
  total: number;
  active: number;
  verified: number;
  pending: number;
  suspended: number;
}

class MerchantService {
  async getMerchants(params?: MerchantListParams) {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = `${API_ENDPOINTS.merchants.list}?${queryParams.toString()}`;
    return await apiClient.get<{
      merchants: Merchant[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(url);
  }

  async getMerchantById(id: string) {
    return await apiClient.get<Merchant>(API_ENDPOINTS.merchants.getById(id));
  }

  async createMerchant(merchantData: Partial<Merchant>) {
    return await apiClient.post<Merchant>(API_ENDPOINTS.merchants.create, merchantData);
  }

  async updateMerchant(id: string, merchantData: Partial<Merchant>) {
    return await apiClient.put<Merchant>(API_ENDPOINTS.merchants.update(id), merchantData);
  }

  async deleteMerchant(id: string) {
    return await apiClient.delete(API_ENDPOINTS.merchants.delete(id));
  }

  async verifyMerchant(id: string) {
    return await apiClient.post<Merchant>(API_ENDPOINTS.merchants.verify(id));
  }

  async suspendMerchant(id: string, reason?: string) {
    return await apiClient.post<Merchant>(API_ENDPOINTS.merchants.suspend(id), { reason });
  }

  async getMerchantsStats() {
    return await apiClient.get<MerchantStats>(API_ENDPOINTS.merchants.stats);
  }

  // Search merchants by name or store name
  async searchMerchants(query: string) {
    return await this.getMerchants({ search: query, limit: 20 });
  }

  // Get merchants pending verification
  async getPendingVerification() {
    return await this.getMerchants({ verified: false });
  }

  // Get recently registered merchants
  async getRecentMerchants(days = 7) {
    return await this.getMerchants({
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10
    });
  }
}

export const merchantService = new MerchantService();
export default merchantService;