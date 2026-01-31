import React, { useState, useEffect } from 'react';
import { Annonce } from '../services/annonceService';
import annonceAdminService from '../services/annonceService';
import { Tab } from '@headlessui/react';
import { ExclamationCircleIcon, CheckCircleIcon, XCircleIcon, PauseCircleIcon, StarIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminAnnoncesPage: React.FC = () => {
  const [pendingAnnonces, setPendingAnnonces] = useState<Annonce[]>([]);
  const [approvedAnnonces, setApprovedAnnonces] = useState<Annonce[]>([]);
  const [rejectedAnnonces, setRejectedAnnonces] = useState<Annonce[]>([]);
  const [suspendedAnnonces, setSuspendedAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [reasonInput, setReasonInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Charger les annonces de tous les statuts
  useEffect(() => {
    const fetchAllAnnonces = async () => {
      try {
        setLoading(true);
        
        // Récupérer toutes les annonces par statut
        const [pendingRes, approvedRes, rejectedRes, suspendedRes] = await Promise.all([
          annonceAdminService.getPendingAnnonces(),
          annonceAdminService.getApprovedAnnonces(),
          annonceAdminService.getRejectedAnnonces(),
          annonceAdminService.getSuspendedAnnonces()
        ]);

        if (pendingRes.success) setPendingAnnonces(pendingRes.data || []);
        if (approvedRes.success) setApprovedAnnonces(approvedRes.data || []);
        if (rejectedRes.success) setRejectedAnnonces(rejectedRes.data || []);
        if (suspendedRes.success) setSuspendedAnnonces(suspendedRes.data || []);

        if (!pendingRes.success || !approvedRes.success || !rejectedRes.success || !suspendedRes.success) {
          setError('Erreur lors du chargement des annonces');
        }
      } catch (err) {
        setError('Erreur lors du chargement des annonces');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnnonces();
  }, []);

  // Fonction pour rafraîchir les annonces d'un statut spécifique
  const refreshAnnoncesByStatus = async (status: string) => {
    try {
      switch (status) {
        case 'pending':
          const pendingRes = await annonceAdminService.getPendingAnnonces();
          if (pendingRes.success) setPendingAnnonces(pendingRes.data || []);
          break;
        case 'approved':
          const approvedRes = await annonceAdminService.getApprovedAnnonces();
          if (approvedRes.success) setApprovedAnnonces(approvedRes.data || []);
          break;
        case 'rejected':
          const rejectedRes = await annonceAdminService.getRejectedAnnonces();
          if (rejectedRes.success) setRejectedAnnonces(rejectedRes.data || []);
          break;
        case 'suspended':
          const suspendedRes = await annonceAdminService.getSuspendedAnnonces();
          if (suspendedRes.success) setSuspendedAnnonces(suspendedRes.data || []);
          break;
      }
    } catch (err) {
      setError('Erreur lors du rafraîchissement des annonces');
      console.error(err);
    }
  };

  // Fonction pour approuver une annonce
  const handleApprove = async (annonceId: number) => {
    try {
      setActionLoading(true);
      const result = await annonceAdminService.approveAnnonce(annonceId);

      if (result.data) {
        // Retirer l'annonce de la liste des en attente et l'ajouter aux approuvées
        setPendingAnnonces(prev => prev.filter(a => a.id !== annonceId));
        // Rafraîchir les listes
        await refreshAnnoncesByStatus('pending');
        await refreshAnnoncesByStatus('approved');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors de l\'approbation de l\'annonce');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Fonction pour rejeter une annonce
  const handleReject = async (annonceId: number) => {
    if (!reasonInput.trim()) {
      setError('Veuillez fournir une raison pour le rejet');
      return;
    }

    try {
      setActionLoading(true);
      const result = await annonceAdminService.rejectAnnonce(annonceId, reasonInput);

      if (result.data) {
        // Retirer l'annonce de la liste des en attente et l'ajouter aux rejetées
        setPendingAnnonces(prev => prev.filter(a => a.id !== annonceId));
        // Rafraîchir les listes
        await refreshAnnoncesByStatus('pending');
        await refreshAnnoncesByStatus('rejected');
        setShowRejectModal(false);
        setReasonInput('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors du rejet de l\'annonce');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Fonction pour suspendre une annonce
  const handleSuspend = async (annonceId: number) => {
    if (!reasonInput.trim()) {
      setError('Veuillez fournir une raison pour la suspension');
      return;
    }

    try {
      setActionLoading(true);
      const result = await annonceAdminService.suspendAnnonce(annonceId, reasonInput);

      if (result.data) {
        // Retirer l'annonce de la liste des approuvées et l'ajouter aux suspendues
        setApprovedAnnonces(prev => prev.filter(a => a.id !== annonceId));
        // Rafraîchir les listes
        await refreshAnnoncesByStatus('approved');
        await refreshAnnoncesByStatus('suspended');
        setShowSuspendModal(false);
        setReasonInput('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors de la suspension de l\'annonce');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Fonction pour activer une annonce
  const handleActivate = async (annonceId: number) => {
    try {
      setActionLoading(true);
      const result = await annonceAdminService.activateAnnonce(annonceId);

      if (result.data) {
        // Rafraîchir les listes
        await refreshAnnoncesByStatus('suspended');
        await refreshAnnoncesByStatus('approved');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors de l\'activation de l\'annonce');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Fonction pour désactiver une annonce
  const handleDeactivate = async (annonceId: number) => {
    try {
      setActionLoading(true);
      const result = await annonceAdminService.deactivateAnnonce(annonceId);

      if (result.data) {
        // Rafraîchir les listes
        await refreshAnnoncesByStatus('approved');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors de la désactivation de l\'annonce');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Fonction pour mettre en vedette une annonce
  const handleFeature = async (annonceId: number) => {
    try {
      setActionLoading(true);
      const result = await annonceAdminService.featureAnnonce(annonceId);

      if (result.data) {
        // Mettre à jour la liste locale
        setApprovedAnnonces(prev =>
          prev.map(annonce =>
            annonce.id === annonceId ? { ...annonce, is_featured: true } : annonce
          )
        );
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors de la mise en vedette de l\'annonce');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Fonction pour retirer une annonce des vedettes
  const handleUnfeature = async (annonceId: number) => {
    try {
      setActionLoading(true);
      const result = await annonceAdminService.unfeatureAnnonce(annonceId);

      if (result.data) {
        // Mettre à jour la liste locale
        setApprovedAnnonces(prev =>
          prev.map(annonce =>
            annonce.id === annonceId ? { ...annonce, is_featured: false } : annonce
          )
        );
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erreur lors du retrait de l\'annonce des vedettes');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Afficher les détails d'une annonce
  const showAnnonceDetails = (annonce: Annonce) => {
    setSelectedAnnonce(annonce);
  };

  // Fermer la modal de détails
  const closeDetailsModal = () => {
    setSelectedAnnonce(null);
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour obtenir l'icone correspondant au statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'APPROVED':
      case 'ACTIVE':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'REJECTED':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'SUSPENDED':
      case 'INACTIVE':
        return <PauseCircleIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <ExclamationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Fonction pour obtenir la classe de couleur pour le statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'SUSPENDED':
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Annonces</h1>
        <p className="mt-2 text-sm text-gray-600">
          Gérez les annonces soumises par les utilisateurs
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
          <Tab
            className={({ selected }: { selected: boolean }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              }`
            }
          >
            En Attente ({pendingAnnonces.length})
          </Tab>
          <Tab
            className={({ selected }: { selected: boolean }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              }`
            }
          >
            Approuvées ({approvedAnnonces.length})
          </Tab>
          <Tab
            className={({ selected }: { selected: boolean }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              }`
            }
          >
            Rejetées ({rejectedAnnonces.length})
          </Tab>
          <Tab
            className={({ selected }: { selected: boolean }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              }`
            }
          >
            Suspendues ({suspendedAnnonces.length})
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* Panel des annonces en attente */}
          <Tab.Panel>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {pendingAnnonces.map((annonce) => (
                  <li key={annonce.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                          {getStatusIcon(annonce.validation_status)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {annonce.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {annonce.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(annonce.validation_status)}`}>
                          {annonce.validation_status}
                        </span>
                        <button
                          onClick={() => showAnnonceDetails(annonce)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Voir
                        </button>
                        <button
                          onClick={() => handleApprove(annonce.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAnnonce(annonce);
                            setShowRejectModal(true);
                          }}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {pendingAnnonces.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune annonce en attente</p>
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Panel des annonces approuvées */}
          <Tab.Panel>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {approvedAnnonces.map((annonce) => (
                  <li key={annonce.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                          {getStatusIcon(annonce.validation_status)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {annonce.title}
                            </div>
                            {annonce.is_featured && (
                              <StarIcon className="h-4 w-4 ml-2 text-yellow-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {annonce.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(annonce.validation_status)}`}>
                          {annonce.validation_status}
                        </span>
                        <button
                          onClick={() => showAnnonceDetails(annonce)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Voir
                        </button>
                        {annonce.is_featured ? (
                          <button
                            onClick={() => handleUnfeature(annonce.id)}
                            disabled={actionLoading}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                          >
                            Retirer vedette
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFeature(annonce.id)}
                            disabled={actionLoading}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                          >
                            Mettre en vedette
                          </button>
                        )}
                        <button
                          onClick={() => handleDeactivate(annonce.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          Désactiver
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAnnonce(annonce);
                            setShowSuspendModal(true);
                          }}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                        >
                          Suspendre
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {approvedAnnonces.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune annonce approuvée</p>
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Panel des annonces rejetées */}
          <Tab.Panel>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {rejectedAnnonces.map((annonce) => (
                  <li key={annonce.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                          {getStatusIcon(annonce.validation_status)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {annonce.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {annonce.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(annonce.validation_status)}`}>
                          {annonce.validation_status}
                        </span>
                        <button
                          onClick={() => showAnnonceDetails(annonce)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Voir
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {rejectedAnnonces.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune annonce rejetée</p>
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Panel des annonces suspendues */}
          <Tab.Panel>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {suspendedAnnonces.map((annonce) => (
                  <li key={annonce.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                          {getStatusIcon(annonce.validation_status)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {annonce.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {annonce.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(annonce.validation_status)}`}>
                          {annonce.validation_status}
                        </span>
                        <button
                          onClick={() => showAnnonceDetails(annonce)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Voir
                        </button>
                        <button
                          onClick={() => handleActivate(annonce.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                          Activer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {suspendedAnnonces.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune annonce suspendue</p>
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Modal pour afficher les détails d'une annonce */}
      {selectedAnnonce && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeDetailsModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Détails de l'annonce
                    </h3>
                    <div className="mt-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Titre</label>
                          <div className="mt-1 text-sm text-gray-900">{selectedAnnonce.title}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <div className="mt-1 text-sm text-gray-900">{selectedAnnonce.description}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Statut</label>
                            <div className="mt-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAnnonce.validation_status)}`}>
                                {selectedAnnonce.validation_status}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">En vedette</label>
                            <div className="mt-1 text-sm text-gray-900">
                              {selectedAnnonce.is_featured ? 'Oui' : 'Non'}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Créée le</label>
                            <div className="mt-1 text-sm text-gray-900">{formatDate(selectedAnnonce.created_at)}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Mise à jour le</label>
                            <div className="mt-1 text-sm text-gray-900">{formatDate(selectedAnnonce.updated_at)}</div>
                          </div>
                        </div>
                        {selectedAnnonce.validation_comment && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Commentaire de validation</label>
                            <div className="mt-1 text-sm text-gray-900">{selectedAnnonce.validation_comment}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDetailsModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour le rejet d'une annonce */}
      {showRejectModal && selectedAnnonce && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Rejeter l'annonce
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <label htmlFor="reject-reason" className="block text-sm font-medium text-gray-700">
                          Raison du rejet
                        </label>
                        <textarea
                          id="reject-reason"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={reasonInput}
                          onChange={(e) => setReasonInput(e.target.value)}
                          placeholder="Entrez la raison du rejet..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={() => handleReject(selectedAnnonce.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Traitement...' : 'Rejeter'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowRejectModal(false);
                    setReasonInput('');
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour la suspension d'une annonce */}
      {showSuspendModal && selectedAnnonce && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Suspendre l'annonce
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <label htmlFor="suspend-reason" className="block text-sm font-medium text-gray-700">
                          Raison de la suspension
                        </label>
                        <textarea
                          id="suspend-reason"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={reasonInput}
                          onChange={(e) => setReasonInput(e.target.value)}
                          placeholder="Entrez la raison de la suspension..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={() => handleSuspend(selectedAnnonce.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Traitement...' : 'Suspendre'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowSuspendModal(false);
                    setReasonInput('');
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnoncesPage;