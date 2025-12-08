import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

interface LayoutProps {
  children: React.ReactNode;
  cartItemCount?: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartItemCount = 0 }) => {
  return (
    <LayoutContainer>
      <Header cartItemCount={cartItemCount} />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};