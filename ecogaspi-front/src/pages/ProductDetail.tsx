import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, MapPin, Clock, Shield, Truck, Plus, Minus } from 'lucide-react';
import { theme } from '../styles/theme';

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

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const Header = styled.div`
  background: white;
  padding: ${theme.spacing.lg} 0;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: none;
  border: none;
  color: ${theme.colors.secondary.darkGray};
  font-size: ${theme.typography.fontSize.base};
  cursor: pointer;
  padding: ${theme.spacing.sm} 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.green};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.secondary.darkGray};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.green};
  }

  &.favorited {
    color: ${theme.colors.status.error};
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
    gap: ${theme.spacing.xl};
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const MainImage = styled.div`
  position: relative;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  background: ${theme.colors.primary.orange};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.sm};
`;

const ExpiryBadge = styled.div<{ urgent?: boolean }>`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: ${props => props.urgent ? theme.colors.status.error : theme.colors.status.warning};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const ProductTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.secondary.black};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: 1.2;
  margin: 0;
`;

const ProductDescription = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.secondary.gray};
  line-height: 1.6;
  margin: 0;
`;

const PriceSection = styled.div`
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid #e0e0e0;
`;

const CurrentPrice = styled.div`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.green};
  margin-bottom: ${theme.spacing.sm};

  &::after {
    content: ' CFA';
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.secondary.gray};
    font-weight: ${theme.typography.fontWeight.normal};
  }
`;

const OriginalPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const OldPrice = styled.span`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.secondary.gray};
  text-decoration: line-through;
`;

const Savings = styled.span`
  background: ${theme.colors.primary.lightGreen};
  color: ${theme.colors.primary.darkGreen};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid #e0e0e0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  .icon {
    color: ${theme.colors.primary.green};
    flex-shrink: 0;
  }

  .content {
    flex: 1;
  }

  .label {
    color: ${theme.colors.secondary.gray};
    font-size: ${theme.typography.fontSize.sm};
    margin-bottom: 2px;
  }

  .value {
    color: ${theme.colors.secondary.black};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const MerchantSection = styled.div`
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid #e0e0e0;
`;

const MerchantHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const MerchantInfo = styled.div`
  flex: 1;
`;

const MerchantAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: ${theme.colors.primary.green};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.lg};
  flex-shrink: 0;
`;

const MerchantDetails = styled.div``;

const MerchantName = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.secondary.black};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const MerchantRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary.orange};
  font-size: ${theme.typography.fontSize.sm};
`;

const VerifiedBadge = styled.span`
  background: ${theme.colors.status.success};
  color: white;
  padding: 2px ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.sm};

  .icon {
    color: ${theme.colors.primary.green};
  }
`;

const QuantitySection = styled.div`
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid #e0e0e0;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid #e0e0e0;
  background: white;
  color: ${theme.colors.secondary.darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary.green};
    color: ${theme.colors.primary.green};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.secondary.black};
  min-width: 80px;
  text-align: center;
`;

const StockInfo = styled.div`
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.sm};
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: ${theme.colors.primary.green};
  color: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.primary.darkGreen};
  }

  &:disabled {
    background: ${theme.colors.secondary.gray};
    cursor: not-allowed;
  }
`;

// Mock data (remplacé plus tard par les vraies données)
const mockProduct: Product = {
  id: '1',
  name: 'Pommes Bio Gala',
  description: 'Pommes bio de qualité, légèrement tachées mais parfaites pour consommer. Idéales pour les compotes, tartes ou à croquer directement. Provenant d\'une agriculture biologique locale, ces pommes conservent toutes leurs qualités nutritionnelles.',
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
    phone: '+225 27 20 30 40 50'
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    address: '123 Rue de la République',
    city: 'Abidjan',
    postalCode: '00225',
    distance: 0.5
  },
  status: 'available',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

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

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // En réalité, on récupérerait le produit via l'API avec l'ID
  // TODO: utiliser l'ID pour récupérer le produit: `/api/products/${id}`
  console.log('Product ID:', id); // Utilisation temporaire pour éviter l'erreur TypeScript
  const product = mockProduct;
  const timeLeft = formatTimeLeft(product.expiryDate);
  const savings = product.originalPrice - product.discountPrice;

  useEffect(() => {
    // Simulation du chargement
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez ce produit anti-gaspi : ${product.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = selectedQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log('Ajouté au panier:', product.id, 'quantité:', selectedQuantity);
    // TODO: Implémenter l'ajout au panier
  };

  if (isLoading) {
    return (
      <Container>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Chargement...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={20} />
            Retour
          </BackButton>
          <ActionButtons>
            <ActionButton
              className={isFavorited ? 'favorited' : ''}
              onClick={handleFavorite}
            >
              <Heart size={20} />
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <Share2 size={20} />
            </ActionButton>
          </ActionButtons>
        </HeaderContent>
      </Header>

      <Content>
        <ImageSection>
          <MainImage>
            <img src={product.images[0]} alt={product.name} />
            <Badge>-{product.discountPercentage}%</Badge>
            <ExpiryBadge urgent={timeLeft.urgent}>
              <Clock size={16} />
              {timeLeft.text}
            </ExpiryBadge>
          </MainImage>
        </ImageSection>

        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>

          <PriceSection>
            <CurrentPrice>{product.discountPrice.toLocaleString()}</CurrentPrice>
            <OriginalPrice>
              <OldPrice>{product.originalPrice.toLocaleString()} CFA</OldPrice>
              <Savings>Économie: {savings.toLocaleString()} CFA</Savings>
            </OriginalPrice>
          </PriceSection>

          <InfoGrid>
            <InfoItem>
              <Shield className="icon" size={20} />
              <div className="content">
                <div className="label">Qualité</div>
                <div className="value">Bio certifié</div>
              </div>
            </InfoItem>
            <InfoItem>
              <Truck className="icon" size={20} />
              <div className="content">
                <div className="label">Livraison</div>
                <div className="value">Retrait sur place</div>
              </div>
            </InfoItem>
          </InfoGrid>

          <MerchantSection>
            <MerchantHeader>
              <MerchantAvatar>
                {product.merchant.name.charAt(0).toUpperCase()}
              </MerchantAvatar>
              <MerchantInfo>
                <MerchantDetails>
                  <MerchantName>
                    {product.merchant.name}
                    {product.merchant.verified && (
                      <VerifiedBadge>✓ Vérifié</VerifiedBadge>
                    )}
                  </MerchantName>
                  <MerchantRating>
                    <Star size={14} fill="currentColor" />
                    {product.merchant.rating} ({product.merchant.reviewCount} avis)
                  </MerchantRating>
                </MerchantDetails>
              </MerchantInfo>
            </MerchantHeader>
            <LocationInfo>
              <MapPin className="icon" size={16} />
              {product.location.address}, {product.location.city}
              {product.location.distance && ` • ${product.location.distance.toFixed(1)} km`}
            </LocationInfo>
          </MerchantSection>

          <QuantitySection>
            <QuantitySelector>
              <QuantityControls>
                <QuantityButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={selectedQuantity <= 1}
                >
                  <Minus size={16} />
                </QuantityButton>
                <QuantityDisplay>
                  {selectedQuantity} {product.unit}
                </QuantityDisplay>
                <QuantityButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={selectedQuantity >= product.quantity}
                >
                  <Plus size={16} />
                </QuantityButton>
              </QuantityControls>
              <StockInfo>
                {product.quantity} {product.unit} disponible{product.quantity > 1 ? 's' : ''}
              </StockInfo>
            </QuantitySelector>

            <AddToCartButton
              onClick={handleAddToCart}
              disabled={product.status !== 'available'}
            >
              Ajouter au panier • {(product.discountPrice * selectedQuantity).toLocaleString()} CFA
            </AddToCartButton>
          </QuantitySection>
        </ProductInfo>
      </Content>
    </Container>
  );
};