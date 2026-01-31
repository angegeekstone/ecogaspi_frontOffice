import React, { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';
import { annoncesValidationService, Annonce, ValidationRequest, ValidationHistory, ValidationStats } from '../services/annoncesValidationService';
import { useAuth } from '../contexts/AuthContext';

type TabType = 'pending' | 'approved' | 'rejected' | 'suspended';

const ValidationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  annonce: Annonce | null;
  actionType: 'approve' | 'reject' | 'suspend';
  onSubmit: (data: { comment: string; reason?: string }) => Promise<void>;
}> = ({ isOpen, onClose, annonce, actionType, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data: { comment: string; reason?: string } = { comment };
      if (actionType !== 'approve') {
        data.reason = reason;
      }
      await onSubmit(data);
      onClose();
      setComment('');
      setReason('');
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !annonce) return null;

  const getTitle = () => {
    switch (actionType) {
      case 'approve': return 'Approuver l\'annonce';
      case 'reject': return 'Rejeter l\'annonce';
      case 'suspend': return 'Suspendre l\'annonce';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (actionType) {
      case 'approve': return isLoading ? 'Approbation...' : 'Approuver';
      case 'reject': return isLoading ? 'Rejet...' : 'Rejeter';
      case 'suspend': return isLoading ? 'Suspension...' : 'Suspendre';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{getTitle()}</h3>

          <div className="mb-4 p-3 bg-gray-50 rounded">
            <h4 className="font-medium">{annonce.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{annonce.description.substring(0, 100)}...</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Commentaire</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Commentaire sur votre décision..."
                required
              />
            </div>

            {actionType !== 'approve' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Motif {actionType === 'reject' ? 'du rejet' : 'de la suspension'}
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder={`Motif ${actionType === 'reject' ? 'du rejet' : 'de la suspension'}...`}
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : actionType === 'reject'
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                }`}
              >
                {getButtonText()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AnnonceDetailsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  annonce: Annonce | null;
}> = ({ isOpen, onClose, annonce }) => {
  if (!isOpen || !annonce) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div className="mt-3">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-medium text-gray-900">{annonce.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</h4>
              <p className="mt-1 text-gray-900">{annonce.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Statut</h4>
                <p className="mt-1">
                  <span className={
                    annonce.validation_status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    annonce.validation_status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    annonce.validation_status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {annonce.validation_status === 'PENDING' ? 'En attente' :
                       annonce.validation_status === 'APPROVED' ? 'Approuvée' :
                       annonce.validation_status === 'REJECTED' ? 'Rejetée' : 'Suspendue'}
                    </span>
                  </span>
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Créée le</h4>
                <p className="mt-1 text-gray-900">{new Date(annonce.created_at).toLocaleDateString('fr-FR')} à {new Date(annonce.created_at).toLocaleTimeString('fr-FR')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ID de l'annonce</h4>
                <p className="mt-1 text-gray-900">{annonce.id}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ID du commerce</h4>
                <p className="mt-1 text-gray-900">{annonce.business_id}</p>
              </div>
            </div>

            {annonce.updated_at && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Dernière mise à jour</h4>
                <p className="mt-1 text-gray-900">{new Date(annonce.updated_at).toLocaleDateString('fr-FR')} à {new Date(annonce.updated_at).toLocaleTimeString('fr-FR')}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Quantité</h4>
                <p className="mt-1 text-gray-900">{annonce.quantity}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Prix unitaire</h4>
                <p className="mt-1 text-gray-900">{annonce.unit_price} FCFA</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Unité</h4>
                <p className="mt-1 text-gray-900">{annonce.unit}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Prix en gros</h4>
                <p className="mt-1 text-gray-900">{annonce.bulk_price} FCFA</p>
              </div>
            </div>
          </div>

          <div className="items-center px-4 py-3 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnonceCard: React.FC<{
  annonce: Annonce;
  onApprove: (annonce: Annonce) => void;
  onReject: (annonce: Annonce) => void;
  onSuspend: (annonce: Annonce) => void;
  onViewDetails: (annonce: Annonce) => void;
  showActions?: boolean;
}> = ({ annonce, onApprove, onReject, onSuspend, onViewDetails, showActions = true }) => {
  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'APPROVED':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'SUSPENDED':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'APPROVED': return 'Approuvée';
      case 'REJECTED': return 'Rejetée';
      case 'SUSPENDED': return 'Suspendue';
      default: return status;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">{annonce.title}</h3>
        <span className={getStatusBadge(annonce.validation_status)}>
          {getStatusText(annonce.validation_status)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{annonce.description.substring(0, 150)}...</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Créée le {new Date(annonce.created_at).toLocaleDateString('fr-FR')}</span>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onViewDetails(annonce)}
          className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm"
        >
          <EyeIcon className="h-4 w-4 mr-1" />
          Voir détails
        </button>

        {showActions && annonce.validation_status === 'PENDING' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onApprove(annonce)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CheckIcon className="h-3 w-3 mr-1" />
              Approuver
            </button>
            <button
              onClick={() => onSuspend(annonce)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
              Suspendre
            </button>
            <button
              onClick={() => onReject(annonce)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <XMarkIcon className="h-3 w-3 mr-1" />
              Rejeter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const AnnoncesValidation: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [stats, setStats] = useState<ValidationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'suspend'>('approve');

  const loadAnnonces = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let data: Annonce[] = [];
      switch (activeTab) {
        case 'pending':
          data = await annoncesValidationService.getPendingAnnonces();
          break;
        case 'approved':
          data = await annoncesValidationService.getApprovedAnnonces();
          break;
        case 'rejected':
          data = await annoncesValidationService.getRejectedAnnonces();
          break;
        case 'suspended':
          data = await annoncesValidationService.getSuspendedAnnonces();
          break;
      }

      console.log(`Annonces chargées pour l'onglet ${activeTab}:`, data);
      setAnnonces(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error);
      setError('Erreur lors du chargement des annonces');
      setAnnonces([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Charger les statistiques directement depuis l'API
      const stats = await annoncesValidationService.getValidationStats();
      setStats(stats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  useEffect(() => {
    loadAnnonces();
  }, [activeTab]);

  useEffect(() => {
    loadStats();
  }, []);

  const handleAction = (annonce: Annonce, action: 'approve' | 'reject' | 'suspend') => {
    setSelectedAnnonce(annonce);
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleValidation = async (data: { comment: string; reason?: string }) => {
    if (!selectedAnnonce || !user) return;

    const validationData: ValidationRequest = {
      validatorId: user.id.toString(),
      validatorName: `${user.firstName} ${user.lastName}`,
      comment: data.comment
    };

    if (actionType !== 'approve' && data.reason) {
      (validationData as any).reason = data.reason;
    }

    try {
      switch (actionType) {
        case 'approve':
          await annoncesValidationService.approveAnnonce(selectedAnnonce.id, validationData);
          break;
        case 'reject':
          await annoncesValidationService.rejectAnnonce(selectedAnnonce.id, validationData as ValidationRequest & { reason: string });
          break;
        case 'suspend':
          await annoncesValidationService.suspendAnnonce(selectedAnnonce.id, validationData as ValidationRequest & { reason: string });
          break;
      }

      // Recharger les annonces de l'onglet actif et les statistiques
      await loadAnnonces();
      await loadStats();
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      throw error;
    }
  };

  const tabs = [
    { key: 'pending' as TabType, label: 'En attente', count: stats?.pending || 0, icon: ClockIcon },
    { key: 'approved' as TabType, label: 'Approuvées', count: stats?.approved || 0, icon: CheckIcon },
    { key: 'rejected' as TabType, label: 'Rejetées', count: stats?.rejected || 0, icon: XMarkIcon },
    { key: 'suspended' as TabType, label: 'Suspendues', count: stats?.suspended || 0, icon: ExclamationTriangleIcon },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Validation des annonces</h1>
          <button
            onClick={() => {
              loadAnnonces();
              loadStats();
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser
          </button>
        </div>

        <div className="border-b border-gray-200 mt-4">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-900 rounded-full py-0.5 px-2.5 text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des annonces...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">{error}</div>
          <button
            onClick={loadAnnonces}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {annonces.length === 0 ? (
            <div className="text-center py-12">
              <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune annonce</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucune annonce trouvée dans cette catégorie.
              </p>
            </div>
          ) : (
            annonces.map((annonce) => (
              <AnnonceCard
                key={annonce.id}
                annonce={annonce}
                onApprove={(annonce) => handleAction(annonce, 'approve')}
                onReject={(annonce) => handleAction(annonce, 'reject')}
                onSuspend={(annonce) => handleAction(annonce, 'suspend')}
                onViewDetails={(annonce) => {
                  setSelectedAnnonce(annonce);
                  setIsDetailsModalOpen(true);
                }}
                showActions={activeTab === 'pending'}
              />
            ))
          )}
        </div>
      )}

      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        annonce={selectedAnnonce}
        actionType={actionType}
        onSubmit={handleValidation}
      />

      <AnnonceDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        annonce={selectedAnnonce}
      />
    </div>
  );
};

export default AnnoncesValidation;