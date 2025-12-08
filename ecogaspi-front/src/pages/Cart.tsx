import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { theme } from '../styles/theme';

interface CartItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  quantity: number;
  maxQuantity: number;
  unit: string;
  merchant: {
    name: string;
    type: string;
  };
  expiryDate: string;
}

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.secondary.lightGray};
  padding: ${theme.spacing.lg} 0;
`;

const Content = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary.green};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.lg};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.darkGreen};
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.secondary.black};
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const Subtitle = styled.p`
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.lg};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CartSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};

  .icon {
    background: ${theme.colors.secondary.lightGray};
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing.lg};
    color: ${theme.colors.secondary.gray};
  }

  h3 {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.secondary.darkGray};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.secondary.gray};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const ShopButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary.green};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary.darkGreen};
    transform: translateY(-2px);
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.secondary.lightGray};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 80px 1fr;
    gap: ${theme.spacing.md};
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 80px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const ItemInfo = styled.div`
  h3 {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.secondary.black};
    margin-bottom: ${theme.spacing.xs};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  .merchant {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.secondary.gray};
    margin-bottom: ${theme.spacing.xs};
  }

  .expiry {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.status.warning};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  .prices {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.sm};
  }

  .current-price {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.green};
  }

  .original-price {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.secondary.gray};
    text-decoration: line-through;
  }

  .discount {
    background: ${theme.colors.primary.orange};
    color: white;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.secondary.lightGray};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xs};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 1 / -1;
    justify-self: start;
    margin-top: ${theme.spacing.sm};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: white;
    border: none;
    border-radius: ${theme.borderRadius.sm};
    color: ${theme.colors.secondary.darkGray};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.green};
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    min-width: 40px;
    text-align: center;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.secondary.black};
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.status.error}15;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.status.error};
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 1 / -1;
    justify-self: end;
    margin-top: ${theme.spacing.sm};
  }

  &:hover {
    background: ${theme.colors.status.error};
    color: white;
  }
`;

const SummarySection = styled.div`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: ${theme.spacing.xl};
`;

const SummaryTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.secondary.black};
  margin-bottom: ${theme.spacing.lg};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.secondary.darkGray};

  &.total {
    padding-top: ${theme.spacing.md};
    border-top: 2px solid ${theme.colors.secondary.lightGray};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.secondary.black};
  }

  &.savings {
    color: ${theme.colors.primary.green};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${theme.colors.primary.green}, ${theme.colors.primary.lightGreen});
  color: white;
  padding: ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(4, 135, 78, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Pommes Bio Gala',
      description: 'Pommes bio de qualité, légèrement tachées',
      originalPrice: 2100,
      discountPrice: 1050,
      discountPercentage: 50,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&auto=format',
      quantity: 1,
      maxQuantity: 2,
      unit: 'kg',
      merchant: {
        name: 'Primeur du Marché',
        type: 'boutique'
      },
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} CFA`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const deliveryFee = subtotal > 5000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // TODO: Implement checkout process
    console.log('Proceeding to checkout...');
  };

  return (
    <Container>
      <Content>
        <Header>
          <BackButton to="/">
            <ArrowLeft size={20} />
            Retour aux produits
          </BackButton>
          <Title>Mon Panier</Title>
          <Subtitle>
            {cartItems.length > 0
              ? `${cartItems.length} produit${cartItems.length > 1 ? 's' : ''} anti-gaspi sélectionné${cartItems.length > 1 ? 's' : ''}`
              : 'Votre panier est vide'
            }
          </Subtitle>
        </Header>

        <MainContent>
          <CartSection>
            {cartItems.length === 0 ? (
              <EmptyCart>
                <div className="icon">
                  <ShoppingBag size={40} />
                </div>
                <h3>Votre panier est vide</h3>
                <p>Découvrez nos produits anti-gaspi et commencez à faire des économies !</p>
                <ShopButton to="/">
                  Découvrir les produits
                  <ArrowRight size={20} />
                </ShopButton>
              </EmptyCart>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemInfo>
                    <h3>{item.name}</h3>
                    <div className="merchant">Vendu par {item.merchant.name}</div>
                    <div className="expiry">À consommer avant le {item.expiryDate}</div>
                    <div className="prices">
                      <span className="current-price">{formatPrice(item.discountPrice)}</span>
                      <span className="original-price">{formatPrice(item.originalPrice)}</span>
                      <span className="discount">-{item.discountPercentage}%</span>
                    </div>
                  </ItemInfo>
                  <QuantityControls>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.maxQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </QuantityControls>
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    <Trash2 size={20} />
                  </RemoveButton>
                </CartItem>
              ))
            )}
          </CartSection>

          {cartItems.length > 0 && (
            <SummarySection>
              <SummaryTitle>Récapitulatif</SummaryTitle>
              <SummaryRow>
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </SummaryRow>
              <SummaryRow className="savings">
                <span>Économies réalisées</span>
                <span>-{formatPrice(savings)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Frais de livraison</span>
                <span>{deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee)}</span>
              </SummaryRow>
              {deliveryFee > 0 && (
                <SummaryRow style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.secondary.gray }}>
                  <span>Livraison gratuite dès 5 000 CFA</span>
                  <span></span>
                </SummaryRow>
              )}
              <SummaryRow className="total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </SummaryRow>
              <CheckoutButton onClick={handleCheckout}>
                Finaliser la commande
                <ArrowRight size={20} />
              </CheckoutButton>
            </SummarySection>
          )}
        </MainContent>
      </Content>
    </Container>
  );
};