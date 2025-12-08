import React from 'react';
import styled from 'styled-components';
import { Clock, MapPin, Star, ShoppingCart, Heart } from 'lucide-react';
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

const CardContainer = styled.div`
  background: ${theme.colors.secondary.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: ${theme.colors.primary.orange};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.bold};
  box-shadow: ${theme.shadows.lg};
  z-index: 2;
`;

const ExpiryBadge = styled.div<{ urgent?: boolean }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${props => props.urgent ? theme.colors.status.error : theme.colors.status.warning};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FavoriteButton = styled.button`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  svg {
    color: ${theme.colors.secondary.gray};
    transition: color 0.2s ease;
  }

  &.favorited svg {
    color: ${theme.colors.status.error};
    fill: ${theme.colors.status.error};
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.secondary.black};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.3;
`;

const MerchantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.secondary.gray};

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${theme.colors.primary.orange};
  }

  .verified {
    color: ${theme.colors.status.success};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.secondary.gray};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const CurrentPrice = styled.span`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.green};
`;

const OriginalPrice = styled.span`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.secondary.gray};
  text-decoration: line-through;
`;

const Savings = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary.orange};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const QuantityInfo = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.secondary.gray};
`;

const AddToCartButton = styled.button`
  background: ${theme.colors.primary.green};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.primary.darkGreen};
  }

  &:disabled {
    background: ${theme.colors.secondary.gray};
    cursor: not-allowed;
  }
`;

interface ProductCardProps {
  product: Product;
  isFavorited?: boolean;
  onFavoriteToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onClick?: (productId: string) => void;
}

const formatTimeLeft = (expiryDate: string): { text: string; urgent: boolean } => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffInHours = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 0) {
    return { text: 'Expiré', urgent: true };
  } else if (diffInHours < 24) {
    return { text: `${diffInHours}h restantes`, urgent: true };
  } else if (diffInHours < 48) {
    return { text: '1 jour restant', urgent: true };
  } else {
    const days = Math.ceil(diffInHours / 24);
    return { text: `${days} jours restants`, urgent: false };
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorited = false,
  onFavoriteToggle,
  onAddToCart,
  onClick
}) => {
  const timeLeft = formatTimeLeft(product.expiryDate);
  const savings = product.originalPrice - product.discountPrice;

  const handleCardClick = () => {
    onClick?.(product.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ImageContainer>
        <img
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
        />
        <DiscountBadge>-{product.discountPercentage}%</DiscountBadge>
        <ExpiryBadge urgent={timeLeft.urgent}>
          <Clock size={12} />
          {timeLeft.text}
        </ExpiryBadge>
        <FavoriteButton
          className={isFavorited ? 'favorited' : ''}
          onClick={handleFavoriteClick}
        >
          <Heart size={18} />
        </FavoriteButton>
      </ImageContainer>

      <CardContent>
        <ProductName>{product.name}</ProductName>

        <MerchantInfo>
          <span>{product.merchant.name}</span>
          {product.merchant.verified && <span className="verified">✓ Vérifié</span>}
          <div className="rating">
            <Star size={14} fill="currentColor" />
            {product.merchant.rating}
          </div>
        </MerchantInfo>

        <LocationInfo>
          <MapPin size={14} />
          {product.location.distance ? `${product.location.distance.toFixed(1)} km` : product.location.city}
        </LocationInfo>

        <PriceContainer>
          <CurrentPrice>{product.discountPrice.toLocaleString()} CFA</CurrentPrice>
          <OriginalPrice>{product.originalPrice.toLocaleString()} CFA</OriginalPrice>
          <Savings>Économie: {savings.toLocaleString()} CFA</Savings>
        </PriceContainer>

        <CardFooter>
          <QuantityInfo>
            {product.quantity} {product.unit} disponible{product.quantity > 1 ? 's' : ''}
          </QuantityInfo>
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={product.status !== 'available'}
          >
            <ShoppingCart size={16} />
            Ajouter
          </AddToCartButton>
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
};