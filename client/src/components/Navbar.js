import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AddButton from '../assets/addButton.svg';
import * as ROUTES from '../constants/routes';

const Navbar = () => {
  let { pathname } = useLocation();

  return (
    <Header>
      <Container>
        <Link to={ROUTES.HOME}>Eleven-Labs</Link>
        {pathname !== ROUTES.ADD && (
          <Link to={ROUTES.ADD}>
            <img src={AddButton} alt='Add a new astronaut' />
          </Link>
        )}
      </Container>
    </Header>
  );
};

export default Navbar;

const Header = styled.header`
  background: var(--color-primary);
  color: var(--white);
  padding: var(--spacing-s) var(--spacing-m);
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
`;
