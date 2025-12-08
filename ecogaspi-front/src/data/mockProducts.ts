import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pommes Bio Gala',
    description: 'Pommes bio de qualité, légèrement tachées mais parfaites pour consommer',
    originalPrice: 3.50,
    discountPrice: 1.75,
    discountPercentage: 50,
    category: 'fruits_vegetables',
    images: ['https://via.placeholder.com/300x200/48CC6C/FFFFFF?text=Pommes+Bio'],
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 2,
    unit: 'kg',
    merchant: {
      id: 'm1',
      name: 'Primeur du Marché',
      type: 'boutique',
      rating: 4.5,
      reviewCount: 128,
      verified: true,
      address: '123 Rue de la République',
      phone: '+33123456789'
    },
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      address: '123 Rue de la République',
      city: 'Paris',
      postalCode: '75001',
      distance: 0.5
    },
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Pain de Campagne',
    description: 'Pain artisanal de la veille, parfait pour griller',
    originalPrice: 2.80,
    discountPrice: 1.40,
    discountPercentage: 50,
    category: 'bakery',
    images: ['https://via.placeholder.com/300x200/F77424/FFFFFF?text=Pain+Campagne'],
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 1,
    unit: 'pièce',
    merchant: {
      id: 'm2',
      name: 'Boulangerie Martin',
      type: 'boutique',
      rating: 4.8,
      reviewCount: 95,
      verified: true,
      address: '456 Avenue des Champs',
      phone: '+33123456790'
    },
    location: {
      latitude: 48.8606,
      longitude: 2.3376,
      address: '456 Avenue des Champs',
      city: 'Paris',
      postalCode: '75008',
      distance: 1.2
    },
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Yaourts Nature Bio',
    description: 'Lot de 8 yaourts nature bio, DLC courte',
    originalPrice: 4.20,
    discountPrice: 2.10,
    discountPercentage: 50,
    category: 'dairy',
    images: ['https://via.placeholder.com/300x200/04874E/FFFFFF?text=Yaourts+Bio'],
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 1,
    unit: 'lot',
    merchant: {
      id: 'm3',
      name: 'Super U Proximité',
      type: 'supermarket',
      rating: 4.2,
      reviewCount: 203,
      verified: true,
      address: '789 Boulevard de la Paix',
      phone: '+33123456791'
    },
    location: {
      latitude: 48.8664,
      longitude: 2.3442,
      address: '789 Boulevard de la Paix',
      city: 'Paris',
      postalCode: '75002',
      distance: 0.8
    },
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Bananes Équitables',
    description: 'Bananes équitables légèrement mûres, parfaites pour smoothies',
    originalPrice: 2.50,
    discountPrice: 1.00,
    discountPercentage: 60,
    category: 'fruits_vegetables',
    images: ['https://via.placeholder.com/300x200/F77424/FFFFFF?text=Bananes'],
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 1.5,
    unit: 'kg',
    merchant: {
      id: 'm4',
      name: 'Épicerie Solidaire',
      type: 'boutique',
      rating: 4.6,
      reviewCount: 87,
      verified: true,
      address: '321 Rue de la Solidarité',
      phone: '+33123456792'
    },
    location: {
      latitude: 48.8584,
      longitude: 2.3488,
      address: '321 Rue de la Solidarité',
      city: 'Paris',
      postalCode: '75003',
      distance: 1.1
    },
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Saumon Fumé',
    description: 'Saumon fumé de Norvège, tranche fine',
    originalPrice: 8.90,
    discountPrice: 4.45,
    discountPercentage: 50,
    category: 'meat_fish',
    images: ['https://via.placeholder.com/300x200/48CC6C/FFFFFF?text=Saumon+Fumé'],
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 1,
    unit: 'barquette',
    merchant: {
      id: 'm5',
      name: 'Poissonnerie Moderne',
      type: 'boutique',
      rating: 4.7,
      reviewCount: 156,
      verified: true,
      address: '654 Quai des Poissons',
      phone: '+33123456793'
    },
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      address: '654 Quai des Poissons',
      city: 'Paris',
      postalCode: '75004',
      distance: 1.8
    },
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Légumes de Saison',
    description: 'Panier de légumes de saison bio, légèrement abîmés',
    originalPrice: 12.00,
    discountPrice: 6.00,
    discountPercentage: 50,
    category: 'fruits_vegetables',
    images: ['https://via.placeholder.com/300x200/04874E/FFFFFF?text=Légumes+Bio'],
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 1,
    unit: 'panier',
    merchant: {
      id: 'm6',
      name: 'Ferme du Bonheur',
      type: 'producer',
      rating: 4.9,
      reviewCount: 234,
      verified: true,
      address: '123 Chemin des Champs',
      phone: '+33123456794'
    },
    location: {
      latitude: 48.8434,
      longitude: 2.3200,
      address: '123 Chemin des Champs',
      city: 'Paris',
      postalCode: '75007',
      distance: 2.3
    },
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const categories = [
  { value: 'all', label: 'Tous les produits' },
  { value: 'fruits_vegetables', label: 'Fruits & Légumes' },
  { value: 'bakery', label: 'Boulangerie' },
  { value: 'dairy', label: 'Produits Laitiers' },
  { value: 'meat_fish', label: 'Viande & Poisson' },
  { value: 'pantry', label: 'Épicerie' },
  { value: 'frozen', label: 'Surgelés' },
];