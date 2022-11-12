import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../styles/global';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

// styles
const Main = styled.main`
  padding-left: var(--spacing-m);
  padding-right: var(--spacing-m);
  max-width: var(--max-width);
  margin: 0 auto;
  margin-bottom: var(--spacing-l);
`;
