import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AddButton from '../assets/addButton.svg';
import * as ROUTES from '../constants/routes';

const Navbar = () => {
  let { pathname } = useLocation();

  return (
    <Header>
      <Link to={ROUTES.HOME}>Eleven-Labs</Link>
      {pathname !== ROUTES.ADD && (
        <Link to={ROUTES.ADD}>
          <img src={AddButton} alt='Add a new astronaut' />
        </Link>
      )}
    </Header>
  );
};

export default Navbar;

const Header = styled.header`
  background: var(--color-primary);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-s) var(--spacing-m);
`;
