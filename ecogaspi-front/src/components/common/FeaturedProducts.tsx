import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, Filter, Clock } from 'lucide-react';
import { ProductGrid } from './ProductGrid';
import { theme } from '../../styles/theme';

interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  category: string;
  images: string[];
  expiryDate: string;
  quantity: number;
  unit: string;
  merchant: {
    id: string;
    name: string;
    type: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    address: string;
    phone: string;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    postalCode: string;
    distance?: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pommes Bio Gala',
    description: 'Pommes bio de qualité, légèrement tachées mais parfaites pour consommer',
    originalPrice: 2100,
    discountPrice: 1050,
    discountPercentage: 50,
    category: 'fruits_vegetables',
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&auto=format'],
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
    originalPrice: 1680,
    discountPrice: 840,
    discountPercentage: 50,
    category: 'bakery',
    images: ['https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&auto=format'],
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
    originalPrice: 2520,
    discountPrice: 1260,
    discountPercentage: 50,
    category: 'dairy',
    images: ['https://images.unsplash.com/photo-1571212515416-fccf62b4c8cf?w=400&h=300&fit=crop&auto=format'],
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
  }
];

const categories = [
  { value: 'all', label: 'Tous les produits' },
  { value: 'fruits_vegetables', label: 'Fruits & Légumes' },
  { value: 'bakery', label: 'Boulangerie' },
  { value: 'dairy', label: 'Produits Laitiers' },
  { value: 'meat_fish', label: 'Viande & Poisson' },
];

const SectionContainer = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.secondary.lightGray};
`;

const SectionContent = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    color: ${theme.colors.secondary.black};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.secondary.gray};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['2xl']};
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${props => props.active ? theme.colors.primary.green : theme.colors.secondary.lightGray};
  background: ${props => props.active ? theme.colors.primary.green : theme.colors.secondary.white};
  color: ${props => props.active ? 'white' : theme.colors.secondary.darkGray};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary.green};
    ${props => !props.active && `
      background: ${theme.colors.primary.green};
      color: white;
    `}
  }
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing['2xl']} auto 0;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary.orange};
  color: white;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.3s ease;

  &:hover {
    background: #e55a0b;
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
`;

const StatItem = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }

  .icon {
    background: ${theme.colors.primary.green};
    color: white;
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-content {
    text-align: left;

    @media (max-width: ${theme.breakpoints.tablet}) {
      text-align: center;
    }
  }

  .stat-number {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.green};
    display: block;
  }

  .stat-label {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.secondary.gray};
  }
`;

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  maxProducts?: number;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = "Produits Anti-Gaspi du Moment",
  subtitle = "Découvrez les meilleures offres près de chez vous et participez à la lutte contre le gaspillage alimentaire.",
  maxProducts = 8
}) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const filteredProducts = activeFilter === 'all'
        ? mockProducts
        : mockProducts.filter(product => product.category === activeFilter);
      setProducts(filteredProducts.slice(0, maxProducts));
      setLoading(false);
    }, 500);
  }, [activeFilter, maxProducts]);

  const handleFavoriteToggle = (productId: string) => {
    setFavoriteIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // TODO: Implement add to cart functionality
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const todaysDeals = 24;
  const hourlyUpdates = 156;

  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </SectionHeader>

        <StatsContainer>
          <StatItem>
            <div className="icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{todaysDeals}</span>
              <span className="stat-label">Nouvelles offres aujourd'hui</span>
            </div>
          </StatItem>
          <StatItem>
            <div className="icon">
              <Filter size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{hourlyUpdates}</span>
              <span className="stat-label">Mises à jour cette heure</span>
            </div>
          </StatItem>
        </StatsContainer>

        <FilterTabs>
          {categories.map((option) => (
            <FilterTab
              key={option.value}
              active={activeFilter === option.value}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </FilterTab>
          ))}
        </FilterTabs>

        <ProductGrid
          products={products}
          loading={loading}
          favoriteIds={favoriteIds}
          onFavoriteToggle={handleFavoriteToggle}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
        />

        <ViewAllButton>
          Voir tous les produits
          <ArrowRight size={20} />
        </ViewAllButton>
      </SectionContent>
    </SectionContainer>
  );
};