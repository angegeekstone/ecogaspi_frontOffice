import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, ArrowRight, Leaf, Users, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { theme } from '../../styles/theme';

const HeroContainer = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary.green} 0%, ${theme.colors.primary.lightGreen} 100%);
  padding: ${theme.spacing['3xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30s-13.431 30-30 30S0 46.569 0 30 13.431 0 30 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.1;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.xl};
    text-align: center;
  }
`;

const HeroText = styled.div`
  color: ${theme.colors.secondary.white};

  h1 {
    font-size: ${theme.typography.fontSize['5xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.1;

    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize['4xl']};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.fontSize['3xl']};
    }
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing['2xl']};
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const PrimaryButton = styled.button`
  background: ${theme.colors.primary.orange};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.lg};

  &:hover {
    background: #e55a0b;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: 2px solid white;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: ${theme.colors.primary.green};
  }
`;

const Stats = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;

  .stat-number {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.orange};
    display: block;
  }

  .stat-label {
    font-size: ${theme.typography.fontSize.sm};
    opacity: 0.8;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  text-align: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    order: -1;
  }
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: ${theme.borderRadius.lg};
  position: relative;
  overflow: hidden;
  box-shadow: ${theme.shadows.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.8s ease-in-out;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  opacity: 0;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  ${HeroImage}:hover & {
    opacity: 1;
  }

  &.prev {
    left: ${theme.spacing.md};
  }

  &.next {
    right: ${theme.spacing.md};
  }
`;

const SliderIndicators = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 3;
`;

const Indicator = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: ${theme.borderRadius.full};
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
  }
`;

const FloatingCards = styled.div`
  position: absolute;
  top: 20px;
  right: -20px;
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.secondary.darkGray};
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: static;
    margin-top: ${theme.spacing.lg};
    display: inline-flex;
  }
`;

const SearchSection = styled.div`
  background: ${theme.colors.secondary.white};
  padding: ${theme.spacing['2xl']} 0;
`;

const SearchContainer = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.lg};
  text-align: center;

  h2 {
    color: ${theme.colors.secondary.darkGray};
    margin-bottom: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  padding-left: 60px;
  border: 2px solid ${theme.colors.secondary.lightGray};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.lg};
  box-shadow: ${theme.shadows.md};

  &:focus {
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 4px rgba(4, 135, 78, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: ${theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.secondary.gray};
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.primary.green};
  color: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.primary.darkGreen};
  }
`;

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&auto=format',
      alt: 'Fruits et légumes anti-gaspi',
      badge: '-50% Fruits & Légumes'
    },
    {
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&auto=format',
      alt: 'Produits anti-gaspi variés',
      badge: '-60% Pain & Viennoiseries'
    }
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <HeroContainer>
        <HeroContent>
          <HeroText>
            <h1>
              Luttez contre le <span style={{color: theme.colors.primary.orange}}>gaspillage</span> alimentaire
            </h1>
            <p>
              Découvrez des produits de qualité à prix réduits chez vos commerçants locaux.
              Participez à un mouvement éco-responsable et économisez jusqu'à 70% sur vos courses.
            </p>
            <CTAButtons>
              <PrimaryButton>
                <ShoppingCart size={20} />
                Découvrir les offres
                <ArrowRight size={20} />
              </PrimaryButton>
              <SecondaryButton>
                Devenir partenaire
              </SecondaryButton>
            </CTAButtons>
            <Stats>
              <StatItem>
                <span className="stat-number">500+</span>
                <span className="stat-label">Commerçants</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">50k+</span>
                <span className="stat-label">Produits sauvés</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">25+</span>
                <span className="stat-label">Villes</span>
              </StatItem>
            </Stats>
          </HeroText>

          <HeroVisual>
            <HeroImage>
              <SliderContainer>
                {slides.map((slide, index) => (
                  <SlideImage
                    key={index}
                    src={slide.image}
                    alt={slide.alt}
                    active={index === currentSlide}
                  />
                ))}

                <SliderButton className="prev" onClick={prevSlide}>
                  <ChevronLeft size={20} color={theme.colors.secondary.darkGray} />
                </SliderButton>

                <SliderButton className="next" onClick={nextSlide}>
                  <ChevronRight size={20} color={theme.colors.secondary.darkGray} />
                </SliderButton>

                <SliderIndicators>
                  {slides.map((_, index) => (
                    <Indicator
                      key={index}
                      active={index === currentSlide}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </SliderIndicators>
              </SliderContainer>
            </HeroImage>
            <FloatingCards>
              <Leaf size={20} color={theme.colors.primary.green} />
              <span>{slides[currentSlide].badge}</span>
            </FloatingCards>
          </HeroVisual>
        </HeroContent>
      </HeroContainer>

      <SearchSection>
        <SearchContainer>
          <h2>Que cherchez-vous aujourd'hui ?</h2>
          <SearchBar>
            <SearchIcon size={24} />
            <SearchInput
              type="text"
              placeholder="Rechercher par produit, catégorie ou commerce..."
            />
            <SearchButton>
              <Search size={20} />
            </SearchButton>
          </SearchBar>
        </SearchContainer>
      </SearchSection>
    </>
  );
};