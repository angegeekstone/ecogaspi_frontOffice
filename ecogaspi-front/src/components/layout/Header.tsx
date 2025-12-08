import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: ${theme.colors.secondary.white};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-left: ${theme.spacing.md};
    padding-right: ${theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.green};
  text-decoration: none;
  cursor: pointer;
  gap: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.primary.darkGreen};
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 ${theme.spacing.xl};
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 3rem;
  border: 2px solid ${theme.colors.secondary.lightGray};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.base};

  &:focus {
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 3px rgba(4, 135, 78, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.secondary.gray};
  size: 20px;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.md};
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: none;
  border: none;
  color: ${theme.colors.secondary.darkGray};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.secondary.lightGray};
    color: ${theme.colors.primary.green};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    span {
      display: none;
    }
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${theme.colors.primary.orange};
  color: white;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartContainer = styled.div`
  position: relative;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.secondary.darkGray};
  padding: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${theme.colors.secondary.white};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.lg};
  display: ${props => props.isOpen ? 'block' : 'none'};

  @media (min-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileSearchContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
  position: relative;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserMenuDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.sm};
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const UserMenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: none;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.secondary.darkGray};
  font-size: ${theme.typography.fontSize.sm};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.secondary.lightGray};
  }
`;

const UserInfo = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.secondary.lightGray};
  margin-bottom: ${theme.spacing.sm};

  .name {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.secondary.black};
    font-size: ${theme.typography.fontSize.sm};
  }

  .email {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.secondary.gray};
    margin-top: ${theme.spacing.xs};
  }
`;

interface HeaderProps {
  cartItemCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoImage src="/logoA.png" alt="EcoGaspi" />
          EcoGaspi
        </Logo>

        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Rechercher des produits anti-gaspi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <NavActions>
          {isAuthenticated ? (
            <UserMenu>
              <IconButton onClick={toggleUserMenu}>
                <User size={20} />
                <span>{user?.name}</span>
              </IconButton>
              <UserMenuDropdown isOpen={isUserMenuOpen}>
                <UserInfo>
                  <div className="name">{user?.name}</div>
                  <div className="email">{user?.email}</div>
                </UserInfo>
                <UserMenuItem onClick={handleLogout}>
                  <LogOut size={16} />
                  Se déconnecter
                </UserMenuItem>
              </UserMenuDropdown>
            </UserMenu>
          ) : (
            <IconButton as={Link} to="/login">
              <User size={20} />
              <span>Connexion</span>
            </IconButton>
          )}

          <CartContainer>
            <IconButton as={Link} to="/cart">
              <ShoppingCart size={20} />
              <span>Panier</span>
            </IconButton>
            {cartItemCount > 0 && (
              <CartBadge>{cartItemCount}</CartBadge>
            )}
          </CartContainer>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavActions>
      </HeaderContent>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileSearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </MobileSearchContainer>

        <MobileNavLinks>
          {isAuthenticated ? (
            <>
              <IconButton>
                <User size={20} />
                <span>{user?.name}</span>
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogOut size={20} />
                <span>Se déconnecter</span>
              </IconButton>
            </>
          ) : (
            <IconButton as={Link} to="/login">
              <User size={20} />
              <span>Connexion</span>
            </IconButton>
          )}
          <IconButton as={Link} to="/cart">
            <ShoppingCart size={20} />
            <span>Mon panier ({cartItemCount})</span>
          </IconButton>
        </MobileNavLinks>
      </MobileMenu>
    </HeaderContainer>
  );
};