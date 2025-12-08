import React, { useState } from 'react';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    merchantId: '1',
    name: 'Yaourt Nestlé',
    category: 'Produits laitiers',
    quantity: 24,
    unit: 'pot',
    unitPrice: 750,
    lotPrice: 15000,
    expirationDate: new Date('2023-12-20'),
    condition: 'parfait',
    location: 'Médina, Dakar',
    status: 'active',
    views: 45,
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: '2',
    merchantId: '2',
    name: 'Riz parfumé',
    category: 'Céréales',
    quantity: 50,
    unit: 'kg',
    unitPrice: 850,
    lotPrice: 40000,
    expirationDate: new Date('2024-06-15'),
    condition: 'rotation_lente',
    location: 'Plateau, Dakar',
    status: 'active',
    views: 23,
    createdAt: new Date('2023-12-03'),
    updatedAt: new Date('2023-12-03'),
  },
  {
    id: '3',
    merchantId: '3',
    name: 'Biscuits Marie',
    category: 'Biscuiterie',
    quantity: 100,
    unit: 'paquet',
    unitPrice: 400,
    lotPrice: 35000,
    expirationDate: new Date('2023-12-15'),
    condition: 'presque_expire',
    location: 'Guédiawaye',
    status: 'active',
    views: 67,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-06'),
  },
];

export const Products: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCondition = conditionFilter === 'all' || product.condition === conditionFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesCondition;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      sold: 'bg-gray-100 text-gray-800',
      expired: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800',
    };

    const labels = {
      active: 'En vente',
      sold: 'Vendu',
      expired: 'Expiré',
      draft: 'Brouillon',
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getConditionBadge = (condition: string) => {
    const styles = {
      parfait: 'bg-green-100 text-green-800',
      presque_expire: 'bg-orange-100 text-orange-800',
      rotation_lente: 'bg-blue-100 text-blue-800',
    };

    const labels = {
      parfait: 'Parfait',
      presque_expire: 'Presque expiré',
      rotation_lente: 'Rotation lente',
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[condition as keyof typeof styles]}`}>
        {labels[condition as keyof typeof labels]}
      </span>
    );
  };

  const isExpiringSoon = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">Toutes les catégories</option>
            <option value="Produits laitiers">Produits laitiers</option>
            <option value="Céréales">Céréales</option>
            <option value="Biscuiterie">Biscuiterie</option>
            <option value="Fruits et légumes">Fruits et légumes</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">En vente</option>
            <option value="sold">Vendu</option>
            <option value="expired">Expiré</option>
            <option value="draft">Brouillon</option>
          </select>

          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">Toutes les conditions</option>
            <option value="parfait">Parfait</option>
            <option value="presque_expire">Presque expiré</option>
            <option value="rotation_lente">Rotation lente</option>
          </select>

          <button className="btn-primary">Exporter</button>
        </div>
      </div>

      {/* Alert for expiring products */}
      <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              <strong>Attention :</strong> {products.filter(p => isExpiringSoon(p.expirationDate)).length} produit(s) expire(nt) dans les 7 prochains jours.
            </p>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredProducts.length} produit(s) trouvé(s)
        </p>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <PhotoIcon className="h-6 w-6 text-gray-400" />
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
                      <div className="text-gray-500">Lot: {product.lotPrice} FCFA</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className={`${isExpiringSoon(product.expirationDate) ? 'text-orange-600' : ''}`}>
                      {product.expirationDate.toLocaleDateString('fr-FR')}
                      {isExpiringSoon(product.expirationDate) && (
                        <div className="text-xs text-orange-600">⚠ Expire bientôt</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getConditionBadge(product.condition)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">
            Aucun produit trouvé avec ces critères.
          </p>
        </div>
      )}
    </div>
  );
};