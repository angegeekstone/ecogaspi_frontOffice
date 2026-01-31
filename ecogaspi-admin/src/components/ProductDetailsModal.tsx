import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Fermer</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-4 border-b border-gray-200"
                >
                  Détails du produit
                </Dialog.Title>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Colonne gauche - Informations principales */}
                  <div>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Image principale</h4>
                      <div className="mt-2 flex justify-center">
                        {product.primaryImageUrl ? (
                          <img
                            src={product.primaryImageUrl}
                            alt={product.name}
                            className="max-h-64 object-contain rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center text-gray-400">
                            <EyeIcon className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Nom du produit</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Catégorie</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.category}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.description || 'Non fournie'}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Localisation</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Colonne droite - Détails techniques */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Quantité</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.quantity} {product.unit}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Unité</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.unit}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Prix unitaire</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.unitPrice?.toFixed(2)} FCFA</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Prix en gros</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.bulkPrice?.toFixed(2)} FCFA</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date d'expiration</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(product.expirationDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Condition</h4>
                      <p className="mt-1 text-sm text-gray-900">{product.condition}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Mis en avant</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.isFeatured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.isFeatured ? 'Oui' : 'Non'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Vues</h4>
                      <p className="mt-1 text-sm text-gray-900">{product.views}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Créé le</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(product.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Mis à jour le</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(product.updatedAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Images supplémentaires */}
                {product.imageUrls && product.imageUrls.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-500">Images supplémentaires</h4>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {product.imageUrls?.map((imageUrl: string, index: number) => (
                        <div key={index} className="flex justify-center">
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            className="max-h-32 object-contain rounded-lg border border-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Informations sur le commerçant */}
                {product.business && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Informations sur le commerçant</h4>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Nom du commerce</h5>
                        <p className="text-sm text-gray-900">{product.business.businessName}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Adresse</h5>
                        <p className="text-sm text-gray-900">{product.business.address}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Ville</h5>
                        <p className="text-sm text-gray-900">{product.business.city}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Numéro de portefeuille</h5>
                        <p className="text-sm text-gray-900">{product.business.walletNumber}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Vérifié</h5>
                        <p className="text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.business.isVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.business.isVerified ? 'Oui' : 'Non'}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                    onClick={onClose}
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductDetailsModal;