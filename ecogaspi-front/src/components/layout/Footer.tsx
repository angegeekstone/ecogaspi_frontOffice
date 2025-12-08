import React from 'react';
import styled from 'styled-components';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { theme } from '../../styles/theme';

const FooterContainer = styled.footer`
  background: ${theme.colors.secondary.darkGray};
  color: ${theme.colors.secondary.white};
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.lg} 0;
`;

const FooterContent = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  h4 {
    color: ${theme.colors.primary.lightGreen};
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  a {
    color: ${theme.colors.secondary.lightGray};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primary.lightGreen};
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.secondary.lightGray};

  svg {
    color: ${theme.colors.primary.orange};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${theme.colors.primary.green};
    border-radius: ${theme.borderRadius.full};
    color: white;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.orange};
      transform: translateY(-2px);
    }
  }
`;

const AboutText = styled.p`
  color: ${theme.colors.secondary.lightGray};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.secondary.gray};
  padding-top: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.sm};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.lightGreen};
  margin-bottom: ${theme.spacing.lg};
  gap: ${theme.spacing.sm};
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(79%) sepia(36%) saturate(1299%) hue-rotate(86deg) brightness(88%) contrast(85%);
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo>
              <LogoImage src="/logoA.png" alt="EcoGaspi" />
              EcoGaspi
            </Logo>
            <AboutText>
              La marketplace qui connecte commerçants et consommateurs pour lutter contre le gaspillage alimentaire.
              Découvrez des produits de qualité à prix réduits et participez à un mouvement éco-responsable.
            </AboutText>
            <SocialLinks>
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h4>Navigation</h4>
            <FooterLinks>
              <a href="/">Accueil</a>
              <a href="/produits">Nos Produits</a>
              <a href="/commercants">Commerçants Partenaires</a>
              <a href="/comment-ca-marche">Comment ça marche</a>
              <a href="/blog">Blog Anti-Gaspi</a>
              <a href="/contact">Contact</a>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h4>Informations</h4>
            <FooterLinks>
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/politique-confidentialite">Politique de confidentialité</a>
              <a href="/conditions-utilisation">Conditions d'utilisation</a>
              <a href="/faq">FAQ</a>
              <a href="/aide">Centre d'aide</a>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h4>Contact</h4>
            <ContactInfo>
              <ContactItem>
                <Mail size={18} />
                <span>contact@ecogaspi.com</span>
              </ContactItem>
              <ContactItem>
                <Phone size={18} />
                <span>+225 27 20 30 40 50</span>
              </ContactItem>
              <ContactItem>
                <MapPin size={18} />
                <span>Rue Jacynthe Rivera, Palmeraie<br />Abidjan, Côte d'Ivoire</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 EcoGaspi. Tous droits réservés. | MarketPlace Ecogaspi power by Edigital with ❤️</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};