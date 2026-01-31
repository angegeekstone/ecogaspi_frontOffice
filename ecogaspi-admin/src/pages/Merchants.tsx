import React, { useState, useEffect, useCallback } from 'react';
import {
  EyeIcon,
  PencilIcon,
  CheckBadgeIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Merchant } from '../types';
import { merchantService } from '../services/merchantService';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const Merchants: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMerchants = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        verified: verificationFilter === 'verified' ? true : verificationFilter === 'unverified' ? false : undefined
      };

      const response = await merchantService.getMerchants(params);

      if (response.success) {
        setMerchants(response.data.merchants);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commerçants:', error);
      setError('Erreur lors du chargement des commerçants');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, searchTerm, statusFilter, verificationFilter]);

  const handleVerifyMerchant = async (merchantId: string) => {
    try {
      await merchantService.verifyMerchant(merchantId);
      await loadMerchants(); // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    }
  };

  const handleSuspendMerchant = async (merchantId: string) => {
    try {
      await merchantService.suspendMerchant(merchantId, 'Suspendu par l\'administrateur');
      await loadMerchants(); // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de la suspension:', error);
    }
  };

  // Charger les données au montage et quand les filtres changent
  useEffect(() => {
    loadMerchants();
  }, [loadMerchants]);

  // Recherche avec debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadMerchants();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const getStatusBadge = (status: string) => {
    const styles = {
      boutique: 'bg-blue-100 text-blue-800',
      depot: 'bg-purple-100 text-purple-800',
      grossiste: 'bg-green-100 text-green-800',
      industriel: 'bg-orange-100 text-orange-800',
    };

    const labels = {
      boutique: 'Boutique',
      depot: 'Dépôt',
      grossiste: 'Grossiste',
      industriel: 'Industriel',
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Commerçants</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gestion des commerçants inscrits sur la plateforme
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un commerçant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">Tous les types</option>
              <option value="boutique">Boutique</option>
              <option value="depot">Dépôt</option>
              <option value="grossiste">Grossiste</option>
              <option value="industriel">Industriel</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">Tous les statuts</option>
              <option value="verified">Vérifiés</option>
              <option value="unverified">Non vérifiés</option>
            </select>
          </div>

          <button className="btn-primary flex items-center">
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-2" />
            <div className="text-red-700">{error}</div>
            <button
              onClick={loadMerchants}
              className="ml-4 text-red-600 hover:text-red-800 underline"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      {!error && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {pagination.total} commerçant(s) trouvé(s)
            {isLoading && ' (Chargement en cours...)'}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Chargement des commerçants...</div>
        </div>
      )}

      {/* Merchants Table */}
      {!isLoading && !error && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commerçant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {merchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {merchant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {merchant.storeName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{merchant.phone}</div>
                        {merchant.email && (
                          <div className="text-gray-500">{merchant.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(merchant.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {merchant.verified ? (
                          <div className="flex items-center text-green-600">
                            <CheckBadgeIcon className="h-5 w-5 mr-1" />
                            <span className="text-sm">Vérifié</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <XMarkIcon className="h-5 w-5 mr-1" />
                            <span className="text-sm">En attente</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {merchant.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-primary-600 hover:text-primary-900 p-1 rounded"
                          title="Voir les détails"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-600 p-1 rounded"
                          title="Modifier"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        {!merchant.verified && (
                          <button
                            onClick={() => handleVerifyMerchant(merchant.id)}
                            className="text-green-600 hover:text-green-800 p-1 rounded"
                            title="Vérifier le commerçant"
                          >
                            <CheckBadgeIcon className="h-5 w-5" />
                          </button>
                        )}
                        {merchant.isActive && (
                          <button
                            onClick={() => handleSuspendMerchant(merchant.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded"
                            title="Suspendre le commerçant"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && merchants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">
            Aucun commerçant trouvé avec ces critères.
          </p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Page {pagination.page} sur {pagination.totalPages}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};