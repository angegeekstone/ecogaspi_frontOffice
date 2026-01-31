import { apiClient } from '../utils/apiClient';

export interface ProductCategory {
  name: string;
  displayName: string;
}

export interface CategoryApiResponse {
  message: string;
  data: ProductCategory[];
}

class CategoryService {
  async getCategories(): Promise<ProductCategory[]> {
    try {
      const response = await apiClient.get<ProductCategory[]>('products/categories');

      if (response.success && response.data) {
        // Si response.data est déjà un tableau, le retourner directement
        if (Array.isArray(response.data)) {
          return response.data;
        }
        // Si response.data a une propriété data qui est un tableau
        if (response.data && typeof response.data === 'object' && 'data' in response.data) {
          return (response.data as any).data;
        }
        // Sinon retourner un tableau vide
        return [];
      } else {
        throw new Error(response.message || 'Erreur lors de la récupération des catégories');
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw new Error(error.message || 'Erreur lors de la récupération des catégories');
    }
  }
}

export default new CategoryService();