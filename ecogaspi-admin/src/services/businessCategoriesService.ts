import { apiClient } from '../utils/apiClient';
import { BusinessCategory, CreateBusinessCategoryRequest, UpdateBusinessCategoryRequest } from '../types';

class BusinessCategoriesService {
  async getAll(): Promise<BusinessCategory[]> {
    const response = await apiClient.get<BusinessCategory[]>('/admin/business-categories');
    return response.data;
  }

  async getById(id: string): Promise<BusinessCategory> {
    const response = await apiClient.get<BusinessCategory>(`/admin/business-categories/${id}`);
    return response.data;
  }

  async create(data: CreateBusinessCategoryRequest): Promise<BusinessCategory> {
    const response = await apiClient.post<BusinessCategory>('/admin/business-categories', data);
    return response.data;
  }

  async update(id: string, data: UpdateBusinessCategoryRequest): Promise<BusinessCategory> {
    const response = await apiClient.put<BusinessCategory>(`/admin/business-categories/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/admin/business-categories/${id}`);
  }
}

export const businessCategoriesService = new BusinessCategoriesService();