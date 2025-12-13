import React from 'react';
import styled from 'styled-components';
import { Clock, TrendingDown, Recycle, Heart } from 'lucide-react';
import { theme } from '../../styles/theme';

const SectionContainer = styled.section`
  padding: 80px 0;
  background: white;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    color: ${theme.colors.secondary.black};
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: 16px;
    line-height: 1.2;

    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }

  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.secondary.gray};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const MainContent = styled.div`
  text-align: center;
`;

const PriceComparison = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  background: #fafafa;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: 64px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const PriceItem = styled.div`
  text-align: center;
`;

const PriceValue = styled.div<{ isOriginal?: boolean }>`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 8px;
  color: ${props => props.isOriginal ? theme.colors.secondary.gray : theme.colors.primary.green};
  text-decoration: ${props => props.isOriginal ? 'line-through' : 'none'};
`;

const PriceLabel = styled.div`
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const Arrow = styled.div`
  color: ${theme.colors.primary.green};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};

  @media (max-width: ${theme.breakpoints.mobile}) {
    transform: rotate(90deg);
  }
`;

const Savings = styled.div`
  background: ${theme.colors.primary.orange};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  display: inline-block;
  margin-bottom: 64px;
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`;

const ReasonCard = styled.div`
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  background: ${theme.colors.primary.green};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const TextContent = styled.div`
  h3 {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.secondary.black};
    margin-bottom: 12px;
  }

  p {
    color: ${theme.colors.secondary.gray};
    line-height: 1.6;
    margin: 0;
    font-size: ${theme.typography.fontSize.base};
  }
`;


export const WhySection: React.FC = () => {
  const reasons = [
    {
      icon: <Clock size={20} />,
      title: "Dates limites proches",
      description: "Produits approchant de leur date de consommation mais restent parfaitement bons"
    },
    {
      icon: <TrendingDown size={20} />,
      title: "Réduction du gaspillage",
      description: "Plutôt que de jeter, nous proposons ces produits à prix réduits"
    },
    {
      icon: <Recycle size={20} />,
      title: "Circuit court",
      description: "Direct du producteur au consommateur, sans intermédiaires"
    },
    {
      icon: <Heart size={20} />,
      title: "Impact positif",
      description: "Vous économisez tout en contribuant à réduire le gaspillage"
    }
  ];

  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <h2>Pourquoi nos produits anti-gaspi sont-ils moins chers ?</h2>
          <p>
            Des économies intelligentes pour une consommation responsable
          </p>
        </SectionHeader>

        <MainContent>
          <PriceComparison>
            <PriceItem>
              <PriceValue isOriginal>2,500 CFA</PriceValue>
              <PriceLabel>Prix habituel</PriceLabel>
            </PriceItem>
            <Arrow>→</Arrow>
            <PriceItem>
              <PriceValue>1,200 CFA</PriceValue>
              <PriceLabel>Prix EcoGaspi</PriceLabel>
            </PriceItem>
          </PriceComparison>

          <Savings>Économisez jusqu'à 52%</Savings>

          <ReasonsGrid>
            {reasons.map((reason, index) => (
              <ReasonCard key={index}>
                <IconContainer>
                  {reason.icon}
                </IconContainer>
                <TextContent>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </TextContent>
              </ReasonCard>
            ))}
          </ReasonsGrid>
        </MainContent>
      </SectionContent>
    </SectionContainer>
  );
};