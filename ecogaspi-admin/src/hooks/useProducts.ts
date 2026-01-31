import { useState } from 'react';
import productService from '../services/ProductService';
import { Product } from '../types';

export interface PaginationParams {
  page: number;
  size: number;
  search?: string;
  category?: string;
  status?: string;
  condition?: string;
}

export interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const useProducts = () => {
  const [products, setProducts] = useState<PaginationResult<Product>>({
    data: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (params: PaginationParams) => {
    try {
      setLoading(true);
      setError(null);

      console.log('useProducts - Fetching products with params:', params);

      // Appeler le service de produit pour récupérer les données paginées
      const result = await productService.getProducts({
        page: params.page,
        size: params.size,
        search: params.search,
        category: params.category,
        status: params.status,
        condition: params.condition,
      });

      console.log('useProducts - Products fetched:', result);
      setProducts(result);
    } catch (err: any) {
      const errorMessage = err.message || 'Erreur inconnue lors de la récupération des produits';
      setError(errorMessage);
      console.error('useProducts - Erreur lors de la récupération des produits:', err);

      // En cas d'erreur, réinitialiser avec des données vides
      setProducts({
        data: [],
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNext: false,
        hasPrev: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
};