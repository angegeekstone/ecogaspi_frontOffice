import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { businessCategoriesService } from '../services/businessCategoriesService';
import { BusinessCategory, CreateBusinessCategoryRequest, UpdateBusinessCategoryRequest } from '../types';

interface CategoryFormData {
  name: string;
  description: string;
}

const CategoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  category?: BusinessCategory | null;
  title: string;
}> = ({ isOpen, onClose, onSubmit, category, title }) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [category, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom de la catégorie</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

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
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const BusinessCategories: React.FC = () => {
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BusinessCategory | null>(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await businessCategoriesService.getAll();
      setCategories(data || []);
    } catch (error: any) {
      console.error('Erreur lors du chargement des catégories:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        request: error.request,
        status: error.response?.status,
        data: error.response?.data
      });

      // Gestion spécifique des erreurs d'authentification
      if (error.response?.status === 401) {
        setError('Authentification requise. Veuillez vous connecter.');
      } else if (error.response?.status === 403) {
        setError('Accès non autorisé. Droits SUPER_ADMIN requis.');
      } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        setError('Erreur de réseau. Vérifiez que le serveur API est démarré.');
      } else {
        setError(error.response?.data?.message || error.message || 'Une erreur inattendue s\'est produite');
      }
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (data: CategoryFormData) => {
    const request: CreateBusinessCategoryRequest = {
      name: data.name,
      description: data.description
    };
    await businessCategoriesService.create(request);
    await loadCategories();
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!editingCategory) return;

    const request: UpdateBusinessCategoryRequest = {
      name: data.name,
      description: data.description
    };
    await businessCategoriesService.update(editingCategory.id, request);
    await loadCategories();
  };

  const handleDelete = async (category: BusinessCategory) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?`)) {
      try {
        await businessCategoriesService.delete(category.id);
        await loadCategories();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la catégorie');
      }
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: BusinessCategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement des catégories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-700">{error}</div>
        <button
          onClick={loadCategories}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Catégories d'entreprises</h1>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle catégorie
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="divide-y divide-gray-200">
          {categories.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Aucune catégorie d'entreprise trouvée.
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      Créée le {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-400 bg-white hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-red-400 bg-white hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingCategory ? handleUpdate : handleCreate}
        category={editingCategory}
        title={editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      />
    </div>
  );
};

export default BusinessCategories;