import React from 'react';
import styled from 'styled-components';
import { ProductCard } from './ProductCard';
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing['3xl']};
  color: ${theme.colors.secondary.gray};

  h3 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.secondary.darkGray};
  }

  p {
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
  }
`;

const LoadingContainer = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing['2xl']};
`;

const LoadingCard = styled.div`
  background: ${theme.colors.secondary.lightGray};
  border-radius: ${theme.borderRadius.lg};
  height: 400px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  favoriteIds?: string[];
  onFavoriteToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  favoriteIds = [],
  onFavoriteToggle,
  onAddToCart,
  onProductClick,
  emptyStateTitle = "Aucun produit trouvé",
  emptyStateDescription = "Essayez de modifier vos critères de recherche ou explorez d'autres catégories."
}) => {
  if (loading) {
    return (
      <GridContainer>
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </GridContainer>
    );
  }

  if (products.length === 0) {
    return (
      <GridContainer>
        <EmptyState>
          <h3>{emptyStateTitle}</h3>
          <p>{emptyStateDescription}</p>
        </EmptyState>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorited={favoriteIds.includes(product.id)}
          onFavoriteToggle={onFavoriteToggle}
          onAddToCart={onAddToCart}
          onClick={onProductClick}
        />
      ))}
    </GridContainer>
  );
};