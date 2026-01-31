import ApiService, { PaginatedResponse, PaginationParams } from './ApiService';
import { Product } from '../types';

class ProductService extends ApiService {
  constructor() {
    super(''); // Ne pas ajouter de préfixe supplémentaire car apiClient gère déjà l'URL de base
  }

  // Récupérer les produits avec pagination
  async getProducts(params: PaginationParams): Promise<PaginatedResponse<Product>> {
    // Vérifier si c'est une recherche (si le paramètre search est fourni)
    let endpoint = 'products';
    const queryParams: Record<string, any> = {
      page: params.page - 1, // Convertir en zéro-indexé pour Spring Data
      size: params.size,
    };

    // Ajouter les paramètres de recherche et de filtre seulement s'ils sont définis
    if (params.search && params.search.trim() !== '') {
      // Si c'est une recherche, utiliser l'endpoint de recherche
      endpoint = 'products/search';
      queryParams.query = params.search.trim(); // Le paramètre de recherche s'appelle 'query'
      delete queryParams.search; // Supprimer le paramètre 'search' qui n'est pas utilisé dans l'endpoint de recherche
    }
    if (params.category && params.category !== 'all') {
      queryParams.category = params.category;
    }
    if (params.status && params.status !== 'all') {
      queryParams.isActive = params.status === 'active' ? 'true' : 'false';
    }
    if (params.condition && params.condition !== 'all') {
      queryParams.condition = params.condition;
    }

    console.log('ProductService - Sending query params to API:', queryParams);
    console.log('ProductService - Using endpoint:', endpoint);
    const response = await this.getAll<Product>(endpoint, queryParams);
    console.log('ProductService - Raw API response:', response);

    if (response.success && response.data) {
      // Vérifier si response.data est déjà une PaginatedResponse
      if ('data' in response.data && Array.isArray((response.data as any).data)) {
        console.log('ProductService - Returning paginated response:', response.data);
        return response.data as PaginatedResponse<Product>;
      }
      // Si c'est un tableau simple, le wrapper en PaginatedResponse
      else if (Array.isArray(response.data)) {
        const paginatedResponse: PaginatedResponse<Product> = {
          data: response.data as Product[],
          currentPage: 1,
          totalPages: 1,
          totalItems: (response.data as Product[]).length,
          hasNext: false,
          hasPrev: false,
        };
        console.log('ProductService - Wrapped array in paginated response:', paginatedResponse);
        return paginatedResponse;
      }
    }

    // En cas d'erreur ou de données invalides, retourner une réponse vide
    console.log('ProductService - Returning empty response due to error or invalid data');
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      hasNext: false,
      hasPrev: false,
    };
  }

  // Récupérer un produit par ID
  async getProductById(id: number | string): Promise<Product> {
    const response = await this.getById<Product>('products', id);
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erreur lors de la récupération du produit');
    }
  }

  // Créer un produit
  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await this.create<Product>('products', product);
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erreur lors de la création du produit');
    }
  }

  // Mettre à jour un produit
  async updateProduct(id: number | string, product: Partial<Product>): Promise<Product> {
    const response = await this.update<Product>('products', id, product);
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erreur lors de la mise à jour du produit');
    }
  }

  // Supprimer un produit
  async deleteProduct(id: number | string): Promise<void> {
    const response = await this.delete('products', id);
    if (!response.success) {
      throw new Error(response.message || 'Erreur lors de la suppression du produit');
    }
  }
}

export default new ProductService();