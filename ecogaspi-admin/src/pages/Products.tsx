import React, { useState, useEffect } from 'react';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { Pagination } from '../components/Pagination';
import ProductDetailsModal from '../components/ProductDetailsModal';
import productService from '../services/ProductService';
import categoryService, { ProductCategory } from '../services/CategoryService';

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const { products, loading, error, fetchProducts } = useProducts();

  // Charger les produits quand les filtres changent
  useEffect(() => {
    console.log('Fetching products with params:', {
      page: currentPage,
      size: itemsPerPage,
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter,
      condition: conditionFilter,
    });

    fetchProducts({
      page: currentPage,
      size: itemsPerPage,
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter,
      condition: conditionFilter,
    });
  }, [currentPage, itemsPerPage, searchTerm, categoryFilter, statusFilter, conditionFilter, fetchProducts]);

  // Log les données reçues
  useEffect(() => {
    console.log('Products data updated:', products);
  }, [products]);

  // Charger les catégories au montage du composant
  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log('Chargement des catégories...');
        setCategoriesLoading(true);
        const loadedCategories = await categoryService.getCategories();
        console.log('Catégories chargées:', loadedCategories);
        setCategories(loadedCategories);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        // En cas d'erreur, charger des catégories par défaut pour permettre à l'interface de fonctionner
        setCategories([
          { name: 'fruits_legumes', displayName: 'Fruits & Légumes' },
          { name: 'viandes_poissons', displayName: 'Viandes & Poissons' },
          { name: 'produits_laitiers', displayName: 'Produits Laitiers' },
          { name: 'epicerie', displayName: 'Épicerie' },
          { name: 'boissons', displayName: 'Boissons' },
          { name: 'hygiene', displayName: 'Hygiène' },
          { name: 'entretien', displayName: 'Entretien' }
        ]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleViewProduct = async (productId: number | string) => {
    try {
      const product = await productService.getProductById(productId);
      setSelectedProduct(product);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du produit:', error);
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    const status = isActive ? 'active' : 'inactive';
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getConditionBadge = (condition: string) => {
    // Mapper les anciennes valeurs aux nouvelles
    const normalizedCondition = condition
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_'); // Remplacer les caractères non-alphanumériques par des underscores

    const styles: Record<string, string> = {
      parfait: 'bg-green-100 text-green-800',
      presque_expire: 'bg-orange-100 text-orange-800',
      rotation_lente: 'bg-blue-100 text-blue-800',
      etat_parfait: 'bg-green-100 text-green-800',
      presque_expire_api: 'bg-orange-100 text-orange-800',
      rotation_lent: 'bg-blue-100 text-blue-800',
    };

    const labels: Record<string, string> = {
      parfait: 'Parfait',
      presque_expire: 'Presque expiré',
      rotation_lente: 'Rotation lente',
      etat_parfait: 'État parfait',
      presque_expire_api: 'Presque expiré',
      rotation_lent: 'Rotation lent',
    };

    // Trouver la bonne clé pour les objets de style et de libellé
    const styleKey = Object.keys(styles).find(key =>
      normalizedCondition.includes(key.replace(/_/g, ''))
    ) || 'parfait';

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[styleKey]}`}>
        {labels[styleKey] || condition}
      </span>
    );
  };

  const isExpiringSoon = (dateString: string) => {
    // Vérifier si dateString est vide ou nul
    if (!dateString) return false;

    const date = new Date(dateString);
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateString);
      return false;
    }

    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffTime > 0 && diffDays <= 7;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Calculer le nombre de produits expirant bientôt
  const expiringSoonCount = products?.data?.filter(p => isExpiringSoon(p.expirationDate)).length || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Produits</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gestion des produits mis en vente sur la plateforme
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Réinitialiser à la première page lors de la recherche
              }}
              className="form-input pl-10 w-full"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
            }}
            className="form-input"
            disabled={categoriesLoading}
          >
            <option value="all">Toutes les catégories</option>
            {categoriesLoading ? (
              <option>Chargement...</option>
            ) : (
              categories && Array.isArray(categories) ? (
                categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.displayName}
                  </option>
                ))
              ) : null
            )}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
            }}
            className="form-input"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>

          <select
            value={conditionFilter}
            onChange={(e) => {
              setConditionFilter(e.target.value);
              setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
            }}
            className="form-input"
          >
            <option value="all">Toutes les conditions</option>
            <option value="parfait">Parfait</option>
            <option value="presque_expire">Presque expiré</option>
            <option value="rotation_lente">Rotation lente</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="form-input"
          >
            <option value={5}>5/page</option>
            <option value={10}>10/page</option>
            <option value={20}>20/page</option>
            <option value={50}>50/page</option>
          </select>
        </div>
      </div>

      {/* Alert for expiring products */}
      {expiringSoonCount > 0 && (
        <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-orange-700">
                <strong>Attention :</strong> {expiringSoonCount} produit(s) expire(nt) dans les 7 prochains jours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {products?.totalItems || 0} produit(s) trouvé(s) | Page {products?.currentPage || 1} sur {products?.totalPages || 1}
        </p>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Erreur :</strong> {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      {!loading && !error && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <div>Nombre de produits: {products?.data?.length || 0}</div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vues
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products?.data && Array.isArray(products.data) && products.data.length > 0 ? (
                  products.data.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            {product.primaryImageUrl ? (
                              <img
                                src={product.primaryImageUrl}
                                alt={product.name}
                                className="h-10 w-10 object-cover rounded"
                              />
                            ) : (
                              <PhotoIcon className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.quantity} {product.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{product.unitPrice} FCFA/{product.unit}</div>
                          <div className="text-gray-500">Lot: {product.bulkPrice} FCFA</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className={`${isExpiringSoon(product.expirationDate) ? 'text-orange-600' : ''}`}>
                          {new Date(product.expirationDate).toLocaleDateString('fr-FR')}
                          {isExpiringSoon(product.expirationDate) && (
                            <div className="text-xs text-orange-600">⚠ Expire bientôt</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getConditionBadge(product.condition)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(product.isActive)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="text-primary-600 hover:text-primary-900"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button className="text-red-400 hover:text-red-600">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <p className="text-sm text-gray-500">
                        Aucun produit trouvé avec ces critères.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {products?.totalPages > 1 && (
            <Pagination
              currentPage={products.currentPage}
              totalPages={products.totalPages}
              totalItems={products.totalItems}
              hasNext={products.hasNext}
              hasPrev={products.hasPrev}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      )}

      {/* Modal pour les détails du produit */}
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};