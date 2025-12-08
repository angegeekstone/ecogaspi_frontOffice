import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Clock, TrendingDown, Recycle, Heart, ArrowDown, Zap, Target } from 'lucide-react';
import { theme } from '../styles/theme';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
  overflow-x: hidden;
`;

const Hero = styled.section`
  position: relative;
  padding: 120px 20px 80px;
  text-align: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  animation: ${slideUp} 0.8s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #22c55e 50%, #fb923c 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const PriceShowcase = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 32px;
  animation: ${bounce} 2s infinite;
`;

const PriceComparison = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PriceItem = styled.div`
  text-align: center;
`;

const OriginalPrice = styled.div`
  font-size: 2rem;
  color: rgba(239, 68, 68, 0.8);
  text-decoration: line-through;
  font-weight: 600;
  margin-bottom: 8px;
`;

const NewPrice = styled.div`
  font-size: 3rem;
  color: #22c55e;
  font-weight: 900;
  margin-bottom: 8px;
`;

const PriceLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ArrowIcon = styled(ArrowDown)`
  color: #fb923c;
  animation: ${bounce} 2s infinite;
  margin: 0 16px;
`;

const SavingsBadge = styled.div`
  background: linear-gradient(135deg, #fb923c, #f59e0b);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.125rem;
  margin-top: 24px;
  display: inline-block;
`;

const Content = styled.div`
  padding: 80px 20px;
  background: #1e293b;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 100px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 64px;
  background: linear-gradient(135deg, #ffffff 0%, #22c55e 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${slideUp} 0.6s ease-out;
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
`;

const ReasonCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 40px 32px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.8s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(34, 197, 94, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const ReasonIcon = styled.div`
  position: relative;
  z-index: 1;
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #22c55e 0%, #fb923c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const ReasonTitle = styled.h3`
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
`;

const ReasonDescription = styled.p`
  position: relative;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsSection = styled.section`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  padding: 64px 32px;
  margin: 80px auto;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 48px;
  text-align: center;
`;

const StatItem = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(135deg, #22c55e 0%, #fb923c 100%);
    border-radius: 2px;
  }
`;

const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #22c55e 0%, #fb923c 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  font-weight: 500;
`;

const CallToAction = styled.section`
  background: linear-gradient(135deg, #22c55e 0%, #fb923c 100%);
  padding: 80px 32px;
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 24px;
  color: white;
  line-height: 1.1;
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  &.primary {
    background: white;
    color: #1e293b;
    border-color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
    }
  }
`;

export const WhyCheaper: React.FC = () => {
  const reasons = [
    {
      icon: <Clock size={32} />,
      title: "Dates limites proches",
      description: "Nos produits approchent de leur date de péremption mais restent parfaitement consommables et nutritifs."
    },
    {
      icon: <TrendingDown size={32} />,
      title: "Réduction du gaspillage",
      description: "Au lieu de jeter ces produits, nous les proposons à prix réduit pour éviter le gaspillage alimentaire."
    },
    {
      icon: <Recycle size={32} />,
      title: "Économie circulaire",
      description: "Nous créons une seconde vie pour ces produits en les redistribuant dans le circuit économique."
    },
    {
      icon: <Heart size={32} />,
      title: "Impact social",
      description: "Vous contribuez à réduire le gaspillage tout en réalisant des économies substantielles sur vos courses."
    }
  ];

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>
            Pourquoi nos produits sont-ils moins chers ?
          </HeroTitle>
          <HeroSubtitle>
            Découvrez le secret derrière nos prix imbattables et rejoignez la révolution anti-gaspi
          </HeroSubtitle>
          <PriceShowcase>
            <PriceComparison>
              <PriceItem>
                <OriginalPrice>2,500 CFA</OriginalPrice>
                <PriceLabel>Prix normal</PriceLabel>
              </PriceItem>
              <ArrowIcon size={32} />
              <PriceItem>
                <NewPrice>1,200 CFA</NewPrice>
                <PriceLabel>Prix EcoGaspi</PriceLabel>
              </PriceItem>
            </PriceComparison>
            <SavingsBadge>Économisez jusqu'à 60%</SavingsBadge>
          </PriceShowcase>
        </HeroContent>
      </Hero>

      <Content>
        <Section>
          <SectionTitle>Comment c'est possible ?</SectionTitle>
          <ReasonsGrid>
            {reasons.map((reason, index) => (
              <ReasonCard key={index}>
                <ReasonIcon>{reason.icon}</ReasonIcon>
                <ReasonTitle>{reason.title}</ReasonTitle>
                <ReasonDescription>{reason.description}</ReasonDescription>
              </ReasonCard>
            ))}
          </ReasonsGrid>
        </Section>

        <Section>
          <SectionTitle>Notre impact en chiffres</SectionTitle>
          <StatsSection>
            <StatsGrid>
              <StatItem>
                <StatNumber>60%</StatNumber>
                <StatLabel>d'économies moyennes</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>5,200</StatNumber>
                <StatLabel>kg de nourriture sauvée</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>2,500+</StatNumber>
                <StatLabel>familles satisfaites</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>95%</StatNumber>
                <StatLabel>de satisfaction client</StatLabel>
              </StatItem>
            </StatsGrid>
          </StatsSection>
        </Section>

        <CallToAction>
          <CTAContent>
            <CTATitle>Prêt à économiser ?</CTATitle>
            <CTADescription>
              Rejoignez des milliers de familles qui font déjà des économies tout en sauvant la planète.
              L'inscription est gratuite et vous commencez à économiser dès aujourd'hui.
            </CTADescription>
            <CTAButtons>
              <CTAButton className="primary">Voir nos produits</CTAButton>
              <CTAButton>Créer un compte</CTAButton>
            </CTAButtons>
          </CTAContent>
        </CallToAction>
      </Content>
    </Container>
  );
};