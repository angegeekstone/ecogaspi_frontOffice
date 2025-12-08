import React, { useState } from 'react';
import {
  EyeIcon,
  PencilIcon,
  CheckBadgeIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { Merchant } from '../types';

const mockMerchants: Merchant[] = [
  {
    id: '1',
    name: 'Amadou Diallo',
    storeName: 'Épicerie du Quartier',
    phone: '+221771234567',
    email: 'amadou.diallo@email.com',
    address: 'Médina, Dakar',
    location: { lat: 14.7167, lng: -17.4677 },
    wallet: '771234567',
    rccm: 'DK-2023-B-1234',
    status: 'boutique',
    verified: true,
    createdAt: new Date('2023-11-15'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Fatou Sall',
    storeName: 'BioMarket',
    phone: '+221789876543',
    address: 'Plateau, Dakar',
    location: { lat: 14.6928, lng: -17.4467 },
    wallet: '789876543',
    status: 'boutique',
    verified: false,
    createdAt: new Date('2023-12-01'),
    isActive: true,
  },
  {
    id: '3',
    name: 'Moussa Sy',
    storeName: 'Dépôt Alimentaire Plus',
    phone: '+221756789123',
    address: 'Guédiawaye',
    location: { lat: 14.7692, lng: -17.4092 },
    wallet: '756789123',
    rccm: 'DK-2023-B-5678',
    patente: 'PAT-2023-001',
    status: 'depot',
    verified: true,
    createdAt: new Date('2023-10-20'),
    isActive: true,
  },
];

export const Merchants: React.FC = () => {
  const [merchants] = useState<Merchant[]>(mockMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
    const matchesVerification =
      verificationFilter === 'all' ||
      (verificationFilter === 'verified' && merchant.verified) ||
      (verificationFilter === 'unverified' && !merchant.verified);

    return matchesSearch && matchesStatus && matchesVerification;
  });

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

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredMerchants.length} commerçant(s) trouvé(s)
        </p>
      </div>

      {/* Merchants Table */}
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
              {filteredMerchants.map((merchant) => (
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
                      <button className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      {!merchant.verified && (
                        <button className="text-green-600 hover:text-green-800">
                          <CheckBadgeIcon className="h-5 w-5" />
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

      {filteredMerchants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">
            Aucun commerçant trouvé avec ces critères.
          </p>
        </div>
      )}
    </div>
  );
};