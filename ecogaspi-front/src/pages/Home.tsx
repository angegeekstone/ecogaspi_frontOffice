import React from 'react';
import { Hero } from '../components/common/Hero';
import { FeaturedProducts } from '../components/common/FeaturedProducts';
import { WhySection } from '../components/common/WhySection';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhySection />
    </>
  );
};